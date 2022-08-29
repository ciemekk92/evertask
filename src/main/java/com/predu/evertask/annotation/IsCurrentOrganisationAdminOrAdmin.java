package com.predu.evertask.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("(hasRole('ROLE_ORGANISATION_ADMIN') && @authenticatedUserService.isOrganisationAdmin(#id)) || hasRole('ROLE_ADMIN')")
public @interface IsCurrentOrganisationAdminOrAdmin
{
}
