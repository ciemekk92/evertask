package com.predu.evertask.service;

import com.predu.evertask.domain.dto.statistics.BurndownChartPointDto;
import com.predu.evertask.domain.dto.statistics.VelocityChartPointDto;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.history.BaseHistory;
import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.service.audit.IssueHistoryService;
import com.predu.evertask.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final IssueHistoryService issueHistoryService;
    private final SprintRepository sprintRepository;


    /*
        Velocity chart
        Average age chart
        Created vs Resolved
        User workload
     */

    public List<BurndownChartPointDto> getBurndownData(UUID sprintId) throws NoChartsDataException {

        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException(Sprint.class, sprintId));

        List<IssueHistory> issueRevisions = issueHistoryService.findRevisionsBySprintId(sprintId);
        List<BurndownChartPointDto> chartPoints = new ArrayList<>();

        LocalDate startDate = DateUtil.dateToLocalDate(sprint.getStartDate());
        LocalDate finishDate = DateUtil.dateToLocalDate(sprint.getFinishDate());
        getVelocityData(sprint.getProject().getId());

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
            LocalDate startDate = DateUtil.dateToLocalDate(sprint.getStartDate());
            LocalDate finishDate = DateUtil.dateToLocalDate(sprint.getFinishDate());

            List<IssueHistory> sprintIssuesRevisions = issueHistoryService.findRevisionsBySprintId(sprint.getId());
            List<IssueHistory> revisionsAtStart = filterIssuesRevisions(sprintIssuesRevisions, startDate, false);
            List<IssueHistory> revisionsAtEnd = filterIssuesRevisions(sprintIssuesRevisions, finishDate, true);


            double commitment = sumRevisionStoryPoints(revisionsAtStart);
            double completed = sumRevisionStoryPoints(revisionsAtEnd);

            VelocityChartPointDto dto = VelocityChartPointDto.builder()
                    .name("Sprint " + sprint.getOrdinal())
                    .commitment(commitment)
                    .completed(completed)
                    .build();

            chartPoints.add(dto);
        }

        return chartPoints;
    }

    private double sumRevisionStoryPoints(List<IssueHistory> revisions) {

        return revisions.stream()
                .mapToInt(history -> history.getIssue().getEstimateStoryPoints() == null ? 0 : history.getIssue().getEstimateStoryPoints())
                .sum();
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
                    var revisionDate = DateUtil.dateToLocalDate(rev.getRevisionDate()).atStartOfDay();
                    var isRevisionDateInRange = (revisionDate.isAfter(startDate.atStartOfDay()) || revisionDate.equals(startDate.atStartOfDay()))
                            && (revisionDate.isBefore(finishDate.atStartOfDay()) || revisionDate.equals(finishDate.atStartOfDay()));

                    return isRevisionDateInRange
                            && (rev.getIssue().getStatus() == IssueStatus.ACCEPTED);
                })
                .toList();

        return sumRevisionStoryPoints(filteredRevisions);
    }

    private long getTrendMultiplierForDate(LocalDate date, long dayOrdinal, long weekendDaysCount) {

        return switch (date.plusDays(dayOrdinal).getDayOfWeek()) {
            case SATURDAY, SUNDAY -> dayOrdinal >= 1 ? dayOrdinal - 1 - weekendDaysCount : 0;
            default -> dayOrdinal - weekendDaysCount;
        };
    }

    private List<IssueHistory> filterIssuesRevisions(List<IssueHistory> revisions,
                                                     LocalDate borderDate,
                                                     boolean shouldFilterOnlyAccepted) throws NoChartsDataException {

        try {
            return revisions
                    .stream()
                    .filter(rev -> borderDate.isAfter(DateUtil.dateToLocalDate(rev.getRevisionDate()))
                            && (shouldFilterOnlyAccepted == rev.getIssue().getStatus().equals(IssueStatus.ACCEPTED)))
                    .collect(Collectors.groupingBy(rev -> rev.getIssue().getId()))
                    .values().stream()
                    .map(list -> list
                            .stream()
                            .max(Comparator.comparing(BaseHistory::getRevisionDate)).orElseThrow())
                    .toList();
        } catch (NoSuchElementException e) {
            throw new NoChartsDataException("noData");
        }
    }
}
