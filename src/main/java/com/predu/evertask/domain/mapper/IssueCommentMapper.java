package com.predu.evertask.domain.mapper;

import com.predu.evertask.domain.dto.issuecomment.IssueCommentDto;
import com.predu.evertask.domain.dto.issuecomment.IssueCommentSaveDto;
import com.predu.evertask.domain.model.IssueComment;
import com.predu.evertask.domain.model.User;
import com.predu.evertask.exception.NotFoundException;
import com.predu.evertask.repository.IssueCommentRepository;
import com.predu.evertask.repository.IssueRepository;
import com.predu.evertask.repository.UserRepository;
import com.predu.evertask.util.HtmlSanitizer;
import org.mapstruct.*;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Comparator;
import java.util.UUID;

@Mapper(uses = {UUIDMapper.class}, componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public abstract class IssueCommentMapper {

    @Autowired
    private UserViewMapper userViewMapper;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IssueRepository issueRepository;

    @Autowired
    private IssueCommentRepository issueCommentRepository;

    @Mapping(target = "createdBy", ignore = true)
    @Mapping(target = "hasMoreReplies", ignore = true)
    @Mapping(target = "firstReply", ignore = true)
    @Mapping(target = "parentId", source = "parent.id")
    public abstract IssueCommentDto issueCommentToIssueCommentDto(IssueComment issueComment);

    @Mapping(target = "parent", ignore = true)
    public abstract IssueComment issueCommentSaveDtoToIssueComment(IssueCommentSaveDto toSave);

    @AfterMapping
    public void afterIssueCommentToIssueCommentDto(IssueComment source, @MappingTarget IssueCommentDto target) {

        if (source.getCreatedBy() != null) {
            User user = userRepository.findById(source.getCreatedBy())
                    .orElseThrow(() -> new NotFoundException(User.class, source.getCreatedBy()));
            target.setCreatedBy(userViewMapper.toUserIssueDto(user));
        }

        if (!source.getReplies().isEmpty()) {
            int repliesCount = source.getReplies().size();
            target.setHasMoreReplies(repliesCount > 1);

            IssueComment firstReply = source.getReplies()
                    .stream()
                    .min(Comparator.comparing(IssueComment::getCreatedAt))
                    .orElseThrow(() -> new NotFoundException(IssueComment.class, source.getIssue().getId()));

            target.setFirstReply(issueCommentToIssueCommentDto(firstReply));
        }
    }

    @AfterMapping
    public void afterIssueCommentSaveDtoToIssueComment(IssueCommentSaveDto source, @MappingTarget IssueComment target) {

        if (source.getContent() != null) {

            target.setContent(HtmlSanitizer.sanitize(source.getContent()));
        }

        if (source.getParentId() != null) {

            IssueComment parent = issueCommentRepository.findById(UUID.fromString(source.getParentId()))
                    .orElseThrow(() -> new NotFoundException(IssueComment.class, source.getParentId()));

            target.setParent(parent);
        }
    }
}
