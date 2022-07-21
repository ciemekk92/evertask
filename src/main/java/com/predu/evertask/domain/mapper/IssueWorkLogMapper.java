package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.issue.IssueReportTimeDto;
import com.predu.evertask.domain.model.IssueWorkLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(uses = {UUIDMapper.class}, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueWorkLogMapper {

    @Mapping(source = "issueId", target = "issue.id")
    public abstract IssueWorkLog issueReportTimeDtoToIssueWorkLog(IssueReportTimeDto dto);
}
