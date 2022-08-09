package com.predu.evertask.domain.dto.statistics;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class BurndownChartPointDto extends ChartPointBaseDto {

    private Integer remaining;
    private Double trend;
}
