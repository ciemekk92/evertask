package com.predu.evertask.adapter;

import com.predu.evertask.domain.model.VerificationToken;
import com.predu.evertask.repository.VerificationTokenRepository;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VerificationTokenRepositoryJpa extends VerificationTokenRepository,
        JpaRepository<VerificationToken, UUID> {
}
