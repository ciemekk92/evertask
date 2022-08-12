package com.predu.evertask.service;

import com.predu.evertask.domain.dto.statistics.AverageAgeChartPointDto;
import com.predu.evertask.domain.dto.statistics.BurndownChartPointDto;
import com.predu.evertask.domain.dto.statistics.CreatedVsResolvedChartPointDto;
import com.predu.evertask.domain.dto.statistics.VelocityChartPointDto;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.history.BaseHistory;
import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.service.audit.IssueHistoryService;
import com.predu.evertask.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.*;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final IssueHistoryService issueHistoryService;
    private final SprintRepository sprintRepository;
    private final IssueRepository issueRepository;

    public List<BurndownChartPointDto> getBurndownData(UUID sprintId) throws NoChartsDataException {

        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException(Sprint.class, sprintId));

        List<IssueHistory> issueRevisions = issueHistoryService.findRevisionsBySprintId(sprintId);
        List<BurndownChartPointDto> chartPoints = new ArrayList<>();

        LocalDate startDate = sprint.getStartDate().toLocalDate();
        LocalDate finishDate = sprint.getFinishDate().toLocalDate();

        long sprintLengthInDaysWithWeekends = Duration.between(startDate.atStartOfDay(), finishDate.atStartOfDay()).toDays();
        long sprintLengthInDays = DateUtil.numberOfDaysWithoutWeekends(startDate, finishDate);
        int storyPointsTotal = getTotalStoryPoints(sprint);
        double trendPerDay = (double) storyPointsTotal / sprintLengthInDays;

        long weekendDaysCount = 0;

        for (long i = 0; i <= sprintLengthInDaysWithWeekends; i++) {
            double remainingStoryPoints = storyPointsTotal - getStoryPointsForAcceptedIssues(issueRevisions, startDate, finishDate);
            long trendMultiplier = getTrendMultiplierForDate(startDate, i, weekendDaysCount);
            double trendValue = BigDecimal.valueOf(storyPointsTotal - trendPerDay * trendMultiplier).setScale(2, RoundingMode.FLOOR).doubleValue();
            DayOfWeek currentDayOfWeek = startDate.plusDays(i).getDayOfWeek();

            if (currentDayOfWeek == DayOfWeek.SATURDAY || currentDayOfWeek == DayOfWeek.SUNDAY) {
                weekendDaysCount++;
            }

            BurndownChartPointDto dto = BurndownChartPointDto.builder()
                    .name(startDate.plusDays(i).toString())
                    .trend(trendValue)
                    .remaining(remainingStoryPoints)
                    .build();

            chartPoints.add(dto);
        }

        return chartPoints;
    }

    public List<VelocityChartPointDto> getVelocityData(UUID projectId) throws NoChartsDataException {

        List<Sprint> sprints = sprintRepository.findTop8ByProjectIdOrderByOrdinalAsc(projectId);
        List<VelocityChartPointDto> chartPoints = new ArrayList<>();

        for (Sprint sprint : sprints) {
            LocalDate startDate = sprint.getStartDate().toLocalDate();
            LocalDate finishDate = sprint.getFinishDate().toLocalDate();

            List<IssueHistory> sprintIssuesRevisions = issueHistoryService.findRevisionsBySprintId(sprint.getId());
            List<IssueHistory> revisionsAtStart = issueHistoryService.filterIssuesRevisions(sprintIssuesRevisions, startDate, false);
            List<IssueHistory> revisionsAtEnd = issueHistoryService.filterIssuesRevisions(sprintIssuesRevisions, finishDate, true);

            double commitment = issueHistoryService.sumRevisionStoryPoints(revisionsAtStart);
            double completed = issueHistoryService.sumRevisionStoryPoints(revisionsAtEnd);

            VelocityChartPointDto dto = VelocityChartPointDto.builder()
                    .name("Sprint " + sprint.getOrdinal())
                    .commitment(commitment)
                    .completed(completed)
                    .build();

            chartPoints.add(dto);
        }

        return chartPoints;
    }

    public List<CreatedVsResolvedChartPointDto> getCreatedVsResolvedData(UUID projectId, LocalDate startDate, LocalDate finishDate) {

        List<IssueHistory> revisions = issueHistoryService.findRevisionsByProjectId(projectId);
        List<Issue> createdIssues = issueRepository.findAllByProjectIdAndCreatedAtBetween(
                projectId,
                startDate.atStartOfDay(ZoneId.systemDefault()).toOffsetDateTime(),
                finishDate.atStartOfDay(ZoneId.systemDefault()).withHour(23).withMinute(59).withSecond(59).toOffsetDateTime());

        List<CreatedVsResolvedChartPointDto> chartPoints = new ArrayList<>();
        long daysBetween = Period.between(startDate, finishDate).getDays();

        for (long i = 0; i <= daysBetween; i++) {
            int created = getCreatedIssuesCount(startDate, createdIssues, i);
            int resolved = getResolvedIssuesCount(startDate, revisions, i);

            CreatedVsResolvedChartPointDto dto = CreatedVsResolvedChartPointDto
                    .builder()
                    .name(startDate.plusDays(i).toString())
                    .created(created)
                    .resolved(resolved)
                    .build();

            chartPoints.add(dto);
        }

        return chartPoints;
    }

    public List<AverageAgeChartPointDto> getAverageAgeData(UUID projectId, LocalDate startDate, LocalDate finishDate) throws NoChartsDataException {

        List<IssueHistory> revisions = issueHistoryService.findRevisionsByProjectId(projectId);
        List<AverageAgeChartPointDto> chartPoints = new ArrayList<>();

        for (long i = 0; i <= Period.between(startDate, finishDate).getDays(); i++) {
            AtomicInteger totalIssueAge = new AtomicInteger();
            AtomicInteger issueCount = new AtomicInteger();

            try {
                long finalI = i;
                Collection<List<IssueHistory>> groupedRevisions = issueHistoryService.groupRevisionsInDateRangeById(revisions, startDate, finalI);

                groupedRevisions
                        .forEach(list -> {
                            issueCount.getAndIncrement();

                            var earliestRevision = list.stream().min(Comparator.comparing(BaseHistory::getRevisionDate)).orElseThrow();
                            var firstAcceptedRevision = list.stream()
                                    .filter(rev -> rev.getIssue().getStatus() == IssueStatus.ACCEPTED)
                                    .min(Comparator.comparing(BaseHistory::getRevisionDate))
                                    .orElse(null);

                            totalIssueAge.getAndAdd((int) Duration.between(
                                    earliestRevision.getRevisionDate(),
                                    firstAcceptedRevision != null
                                            ? firstAcceptedRevision.getRevisionDate()
                                            : DateUtil.addDaysToDateAndConvertToODTEndOfDay(startDate, finalI)
                            ).toDays());
                        });

                if (issueCount.get() > 0) {
                    AverageAgeChartPointDto dto = AverageAgeChartPointDto
                            .builder()
                            .name(startDate.plusDays(i).toString())
                            .averageAge(totalIssueAge.get() / issueCount.get())
                            .build();

                    chartPoints.add(dto);
                }

            } catch (NoSuchElementException e) {
                throw new NoChartsDataException("noData");
            }
        }

        return chartPoints;
    }

    private int getResolvedIssuesCount(LocalDate startDate, List<IssueHistory> revisions, long finalI) {
        return revisions
                .stream()
                .filter(rev -> {
                    LocalDate revisionDate = rev.getRevisionDate().toLocalDate();

                    return revisionDate.isEqual(startDate.plusDays(finalI)) && rev.getIssue().getStatus() == IssueStatus.ACCEPTED;
                })
                .toList()
                .size();
    }

    private int getCreatedIssuesCount(LocalDate startDate, List<Issue> createdIssues, long finalI) {
        return createdIssues
                .stream()
                .filter(issue -> {
                    LocalDate issueCreatedAt = issue.getCreatedAt().toLocalDate();

                    return startDate.plusDays(finalI).isEqual(issueCreatedAt);
                })
                .toList()
                .size();
    }

    private int getTotalStoryPoints(Sprint sprint) throws NoChartsDataException {

        if (sprint.getIssues().isEmpty()) {
            throw new NoChartsDataException("noData");
        }

        return sprint.getIssues()
                .stream()
                .mapToInt(issue -> issue.getEstimateStoryPoints() == null ? 0 : issue.getEstimateStoryPoints())
                .sum();
    }

    private double getStoryPointsForAcceptedIssues(List<IssueHistory> revisions, LocalDate startDate, LocalDate finishDate) {

        List<IssueHistory> filteredRevisions = revisions
                .stream()
                .filter(rev -> {
                    var revisionDate = rev.getRevisionDate().toLocalDate();
                    var isRevisionDateInRange = (revisionDate.isAfter(startDate) || revisionDate.equals(startDate))
                            && (revisionDate.isBefore(finishDate) || revisionDate.equals(finishDate));

                    return isRevisionDateInRange
                            && (rev.getIssue().getStatus() == IssueStatus.ACCEPTED);
                })
                .toList();

        return issueHistoryService.sumRevisionStoryPoints(filteredRevisions);
    }

    private long getTrendMultiplierForDate(LocalDate date, long dayOrdinal, long weekendDaysCount) {

        return switch (date.plusDays(dayOrdinal).getDayOfWeek()) {
            case SATURDAY, SUNDAY -> dayOrdinal >= 1 ? dayOrdinal - 1 - weekendDaysCount : 0;
            default -> dayOrdinal - weekendDaysCount;
        };
    }
}
