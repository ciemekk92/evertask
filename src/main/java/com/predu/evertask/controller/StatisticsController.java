package com.predu.evertask.controller;

import com.predu.evertask.domain.dto.statistics.BurndownChartPointDto;
import com.predu.evertask.domain.dto.statistics.VelocityChartPointDto;
import com.predu.evertask.exception.NoChartsDataException;
import com.predu.evertask.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;

    @GetMapping("/burndown/{sprintId}")
    public ResponseEntity<List<BurndownChartPointDto>> getBurndownChartData(@PathVariable UUID sprintId) throws NoChartsDataException {

        return ResponseEntity.ok(statisticsService.getBurndownData(sprintId));
    }

    @GetMapping("/velocity/{projectId}")
    public ResponseEntity<List<VelocityChartPointDto>> getVelocityChartData(@PathVariable UUID projectId) throws NoChartsDataException {

        return ResponseEntity.ok(statisticsService.getVelocityData(projectId));
    }
}
