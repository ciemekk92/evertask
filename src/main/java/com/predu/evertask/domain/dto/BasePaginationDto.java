package com.predu.evertask.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class BasePaginationDto {

    private Integer currentPage;
    private Long totalItems;
    private Integer totalPages;
}
