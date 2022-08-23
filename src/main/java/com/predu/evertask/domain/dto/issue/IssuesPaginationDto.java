package com.predu.evertask.domain.dto.issue;

import com.predu.evertask.domain.dto.BasePaginationDto;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
public class IssuesPaginationDto extends BasePaginationDto {

    List<IssueDto> issues;
}
