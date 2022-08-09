package com.predu.evertask.service;

import com.predu.evertask.domain.dto.statistics.BurndownChartPointDto;
import com.predu.evertask.domain.enums.IssueStatus;
import com.predu.evertask.domain.history.IssueHistory;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.Sprint;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.SprintRepository;
import com.predu.evertask.service.audit.IssueHistoryService;
import com.predu.evertask.util.DateUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class StatisticsService {

    private final IssueHistoryService issueHistoryService;
    private final SprintRepository sprintRepository;


    /*
        Sprint Burn-down chart
        Velocity chart
        Average age chart
        Created vs Resolved
        User workload
     */

    public List<BurndownChartPointDto> getBurndownData(UUID sprintId) {

        Sprint sprint = sprintRepository.findById(sprintId)
                .orElseThrow(() -> new NotFoundException(Sprint.class, sprintId));

        LocalDate startDate = DateUtil.dateToLocalDate(sprint.getStartDate());
        LocalDate finishDate = DateUtil.dateToLocalDate(sprint.getFinishDate());

        long sprintLengthInDaysWithWeekends = Duration.between(startDate.atStartOfDay(), finishDate.atStartOfDay()).toDays();
        long sprintLengthInDays = DateUtil.numberOfDaysWithoutWeekends(startDate, finishDate);
        int storyPointsTotal = getTotalStoryPoints(sprint);

        BigDecimal trendPerDay = new BigDecimal(storyPointsTotal / sprintLengthInDays).setScale(3, RoundingMode.FLOOR);
        List<IssueHistory> issueRevisions = issueHistoryService.findRevisionsBySprintId(sprintId);
        List<BurndownChartPointDto> chartPoints = new ArrayList<>();

        for (long i = 0; i <= sprintLengthInDaysWithWeekends; i++) {
            int remainingStoryPoints = storyPointsTotal - getStoryPointsForAcceptedIssues(issueRevisions, startDate, finishDate);
            long trendMultiplier = getTrendMultiplierForDate(startDate, i);

            BurndownChartPointDto dto = BurndownChartPointDto.builder()
                    .name(startDate.plusDays(i).toString())
                    .trend(storyPointsTotal - trendPerDay.doubleValue() * trendMultiplier)
                    .remaining(remainingStoryPoints)
                    .build();

            chartPoints.add(dto);
        }

        return chartPoints;
    }

    private int getTotalStoryPoints(Sprint sprint) {
        return sprint.getIssues()
                .stream()
                .mapToInt(Issue::getEstimateStoryPoints)
                .sum();
    }

    private int getStoryPointsForAcceptedIssues(List<IssueHistory> revisions, LocalDate startDate, LocalDate finishDate) {

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

        return filteredRevisions
                .stream()
                .mapToInt(rev -> rev.getIssue().getEstimateStoryPoints())
                .sum();
    }

    private long getTrendMultiplierForDate(LocalDate date, long dayOrdinal) {
        return switch (date.plusDays(dayOrdinal).getDayOfWeek()) {
            case SATURDAY -> dayOrdinal >= 1 ? dayOrdinal - 1 : 0;
            case SUNDAY -> dayOrdinal >= 2 ? dayOrdinal - 2 : 0;
            default -> dayOrdinal;
        };
    }
}
