package com.predu.evertask.validator;

import com.predu.evertask.annotation.RequiredWhenStatus;
import org.apache.commons.beanutils.BeanUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import java.lang.reflect.InvocationTargetException;
import java.util.Arrays;

import static org.springframework.util.ObjectUtils.isEmpty;

public class RequiredWhenStatusValidator implements ConstraintValidator<RequiredWhenStatus, Object> {

    private final Logger logger = LoggerFactory.getLogger(RequiredWhenStatusValidator.class);
    private String selected;
    private String[] required;
    private String message;
    private String[] values;

    @Override
    public void initialize(RequiredWhenStatus constraint) {
        selected = constraint.selected();
        required = constraint.required();
        message = constraint.message();
        values = constraint.values();
    }

    @Override
    public boolean isValid(Object objectToValidate, ConstraintValidatorContext context) {
        boolean valid = true;

        try {
            Object actualValue = BeanUtils.getProperty(objectToValidate, selected);

            if (Arrays.asList(values).contains(actualValue)) {
                for (String propName : required) {
                    Object requiredValue = BeanUtils.getProperty(objectToValidate,propName);
                    valid = requiredValue != null && !isEmpty(requiredValue);
                    System.out.println("value: " + "" + requiredValue);

                    if (!valid) {
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(message).addPropertyNode(propName).addConstraintViolation();
                    }
                }
            }
        } catch (InvocationTargetException e) {
            logger.error("An exception occurred while accessing class: {}, exception: {}",
                    objectToValidate.getClass().getName(), e);
            e.printStackTrace();
            return false;
        } catch (IllegalAccessException e) {
            logger.error("Accessor method is not available for class : {}, exception : {}",
                    objectToValidate.getClass().getName(), e);
            e.printStackTrace();
            return false;
        } catch (NoSuchMethodException e) {
            logger.error("Field or method is not present on class : {}, exception : {}",
                    objectToValidate.getClass().getName(), e);
            e.printStackTrace();
            return false;
        }

        return valid;
    }
}
