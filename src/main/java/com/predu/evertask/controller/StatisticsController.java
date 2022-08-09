package com.predu.evertask.controller;

import com.predu.evertask.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@RequiredArgsConstructor
@Controller
@RequestMapping("api/statistics")
public class StatisticsController {

    private final StatisticsService statisticsService;
}
