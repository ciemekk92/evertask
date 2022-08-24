package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.issue.IssueReportTimeDto;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.IssueWorkLog;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueRepository;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.UUID;

@Mapper(uses = {UUIDMapper.class}, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueWorkLogMapper {

    @Autowired
    private IssueRepository issueRepository;

    @Mapping(target = "issue.id", ignore = true)
    public abstract IssueWorkLog issueReportTimeDtoToIssueWorkLog(IssueReportTimeDto dto);

    @AfterMapping
    public void afterIssueReportTimeDtoToIssueWorkLog(IssueReportTimeDto source, @MappingTarget IssueWorkLog target) {

        if (source.getIssueId() != null) {
            target.setIssue(issueRepository.findById(UUID.fromString(source.getIssueId()))
                    .orElseThrow(() -> new NotFoundException(Issue.class, source.getIssueId())));
        }
    }
}
