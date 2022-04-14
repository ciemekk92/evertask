package com.predu.evertask.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("(hasRole('ROLE_ORGANISATION_ADMIN') && @authenticatedUserService.isOrganisationAdmin(id)) || hasRole('ROLE_ADMIN')")
public @interface IsOrganisationAdminOrAdmin
{
}
