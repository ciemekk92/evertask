package com.predu.evertask.service;

import com.predu.evertask.domain.dto.issuecomment.IssueCommentDto;
import com.predu.evertask.domain.dto.issuecomment.IssueCommentSaveDto;
import com.predu.evertask.domain.dto.issuecomment.IssueCommentsPaginationDto;
import com.predu.evertask.domain.mapper.IssueCommentMapper;
import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.domain.model.IssueComment;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueCommentRepository;
import com.predu.evertask.repository.IssueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class IssueCommentService {

    private final IssueCommentMapper issueCommentMapper;
    private final IssueCommentRepository issueCommentRepository;
    private final IssueRepository issueRepository;

    public IssueCommentsPaginationDto findAll(UUID issueId, Pageable paging) {

        Page<IssueComment> pagedComments = issueCommentRepository.findAllByIssueIdAndParentIsNullOrderByCreatedAtDesc(issueId, paging);
        List<IssueCommentDto> comments = pagedComments
                .stream()
                .map(issueCommentMapper::issueCommentToIssueCommentDto)
                .toList();

        return IssueCommentsPaginationDto.builder()
                .currentPage(pagedComments.getNumber())
                .totalItems(pagedComments.getTotalElements())
                .totalPages(pagedComments.getTotalPages())
                .comments(comments)
                .build();
    }

    public IssueCommentSaveDto create(IssueCommentSaveDto toSave, UUID issueId) {

        Issue issue = issueRepository.findById(issueId)
                .orElseThrow(() -> new NotFoundException(Issue.class, issueId));
        IssueComment comment = issueCommentMapper.issueCommentSaveDtoToIssueComment(toSave);
        comment.setIssue(issue);

        issueCommentRepository.save(comment);

        return toSave;
    }
}
