package com.predu.evertask.domain.dto.issue;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class IssueFullDto extends IssueLastDto {

    private List<IssueFullDto> subtasks = new ArrayList<>();
}
