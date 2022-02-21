package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.Issue;
import com.predu.evertask.repository.IssueRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface IssueRepositoryJpa extends IssueRepository, JpaRepository<Issue, UUID> {
}
