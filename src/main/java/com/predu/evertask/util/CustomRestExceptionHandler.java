package com.predu.evertask.util;

import com.predu.evertask.exception.InvalidTokenException;
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
                .map(fieldError -> fieldError.getField() + ": "
                        + messageSource.getMessage(fieldError, locale))
                .collect(Collectors.toList());

        return new ResponseEntity<>(new RestMessage(errorMessages), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<RestMessage> handleInvalidTokenException(InvalidTokenException ex, Locale locale) {
        String message = messageSource.getMessage("message.signup." + ex.getMessage(), null, locale);

        return new ResponseEntity<>(new RestMessage(message), HttpStatus.BAD_REQUEST);
    }
}
