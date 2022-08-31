package com.predu.evertask.util;

import com.predu.evertask.annotation.WithMockCustomUser;
import com.predu.evertask.domain.model.Role;
import com.predu.evertask.domain.model.User;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.Set;
import java.util.UUID;

/**
 * Factory class, allowing to set custom security context in tests
 */
public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomUser> {

    private static final UUID USER_ID = UUID.fromString("57191890-ff22-4386-a2ea-869c9f6a3ea8");

    @Override
    public SecurityContext createSecurityContext(WithMockCustomUser customUser) {

        SecurityContext context = SecurityContextHolder.createEmptyContext();

        User principal = new User(USER_ID, customUser.username(), customUser.firstName(), Set.of(new Role(customUser.authority())));

        Authentication auth = new UsernamePasswordAuthenticationToken(principal, "password", principal.getAuthorities());
        context.setAuthentication(auth);

        return context;
    }
}
