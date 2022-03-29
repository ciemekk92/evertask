package com.predu.evertask.repository;

import com.predu.evertask.domain.model.User;
import com.predu.evertask.domain.model.VerificationToken;

import java.util.UUID;

public interface VerificationTokenRepository {

    VerificationToken findByToken(String token);

    VerificationToken findByUser(User user);

    VerificationToken save(VerificationToken token);

    void delete(VerificationToken entity);

    void deleteById(UUID id);
}
