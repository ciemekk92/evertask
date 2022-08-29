package com.predu.evertask.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("(hasAnyRole('ROLE_ORGANISATION_ADMIN', 'ROLE_PROJECT_ADMIN', 'ROLE_USER') " +
        "&& @authenticatedUserService.isAllowedToLogWorkOnIssue(#dto)) " +
        "|| hasRole('ROLE_ADMIN')")
public @interface IsUserAllowedToLogWorkOnIssue {
}
