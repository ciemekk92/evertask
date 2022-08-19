package com.predu.evertask.controller;

import com.predu.evertask.annotation.IsProjectMember;
import com.predu.evertask.annotation.IsUserAllowedToSprint;
import com.predu.evertask.domain.dto.statistics.AverageAgeChartPointDto;
import com.predu.evertask.domain.dto.statistics.BurndownChartPointDto;
import com.predu.evertask.domain.dto.statistics.CreatedVsResolvedChartPointDto;
import com.predu.evertask.domain.dto.statistics.VelocityChartPointDto;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @IsUserAllowedToSprint
    @GetMapping("/burndown/{id}")
    public ResponseEntity<List<BurndownChartPointDto>> getBurndownChartData(@PathVariable UUID id)
            throws NoChartsDataException {

        return ResponseEntity.ok(statisticsService.getBurndownData(id));
    }

    @IsProjectMember
    @GetMapping("/velocity/{id}")
    public ResponseEntity<List<VelocityChartPointDto>> getVelocityChartData(@PathVariable UUID id)
            throws NoChartsDataException {

        return ResponseEntity.ok(statisticsService.getVelocityData(id));
    }

    @IsProjectMember
    @GetMapping("/created_resolved/{id}")
    public ResponseEntity<List<CreatedVsResolvedChartPointDto>> getCreatedVsResolvedChartData(@PathVariable UUID id,
                                                                                              @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                                              @RequestParam("finishDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finishDate) {

        return ResponseEntity.ok(statisticsService.getCreatedVsResolvedData(id, startDate, finishDate));
    }

    @IsProjectMember
    @GetMapping("/average_age/{id}")
    public ResponseEntity<List<AverageAgeChartPointDto>> getAverageAgeChartData(@PathVariable UUID id,
                                                                                @RequestParam("startDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                                                                @RequestParam("finishDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate finishDate)
            throws NoChartsDataException {

        return ResponseEntity.ok(statisticsService.getAverageAgeData(id, startDate, finishDate));
    }
}
