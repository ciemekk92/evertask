package com.predu.evertask.annotation;

import com.predu.evertask.validator.EnumValidatorConstraint;

import javax.validation.Constraint;
import javax.validation.Payload;
import javax.validation.constraints.NotNull;
import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = EnumValidatorConstraint.class)
@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.FIELD)
@NotNull
public @interface EnumValidator {

    Class<? extends Enum<?>> enumerated();
    String message() default "must be any of enum {enumerated}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
