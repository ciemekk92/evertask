package com.predu.evertask.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.*;
import java.util.stream.Collectors;

@ControllerAdvice
public class CustomRestExceptionHandler {

    private final MessageSource messageSource;

    @Autowired
    public CustomRestExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestMessage> handleArgumentNotValidException(MethodArgumentNotValidException ex, Locale locale) {
        BindingResult result = ex.getBindingResult();

        List<String> errorMessages = result.getFieldErrors()
                .stream()
                .map(objectError -> objectError.getField() + ": "
                        + messageSource.getMessage(objectError, locale))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new RestMessage(errorMessages), HttpStatus.BAD_REQUEST);
    }
}
