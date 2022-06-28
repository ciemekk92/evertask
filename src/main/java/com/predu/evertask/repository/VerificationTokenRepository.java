package com.predu.evertask.repository;

import com.predu.evertask.domain.model.User;
import com.predu.evertask.domain.model.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, UUID> {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);

    VerificationToken save(VerificationToken token);

    void delete(VerificationToken entity);

    void deleteById(UUID id);
}
