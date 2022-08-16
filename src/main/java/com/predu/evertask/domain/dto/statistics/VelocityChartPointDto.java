package com.predu.evertask.domain.dto.statistics;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
public class VelocityChartPointDto extends ChartPointBaseDto {

    private Double commitment;
    private Double completed;
}
