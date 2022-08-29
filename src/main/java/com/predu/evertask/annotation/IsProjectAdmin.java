package com.predu.evertask.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.*;

@Target({ElementType.TYPE, ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
@PreAuthorize("(hasAnyRole('ROLE_PROJECT_ADMIN', 'ROLE_ADMIN'))")
public @interface IsProjectAdmin
{
}

