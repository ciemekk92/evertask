package com.predu.evertask.annotation;

import com.predu.evertask.validator.RequiredWhenStatusValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ ElementType.TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RequiredWhenStatusValidator.class)
public @interface RequiredWhenStatus {

    String message() default "{com.predu.evertask.LengthWhenStatus.message}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};

    String selected();
    String[] required();
    String[] values();
}
