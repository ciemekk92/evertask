package com.predu.evertask.util;

import com.predu.evertask.exception.InvalidOperationException;
import com.predu.evertask.exception.InvalidTokenException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ValidationException;
import java.util.List;
import java.util.Locale;

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
                .toList();

        return new ResponseEntity<>(new RestMessage(errorMessages), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidTokenException.class)
    public ResponseEntity<RestMessage> handleInvalidTokenException(InvalidTokenException ex, Locale locale) {
        String message = messageSource.getMessage("message.token." + ex.getMessage(), null, locale);

        return new ResponseEntity<>(new RestMessage(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidOperationException.class)
    public ResponseEntity<RestMessage> handleInvalidOperationException(InvalidOperationException ex, Locale locale) {
        String message = messageSource.getMessage("message.operation." + ex.getMessage(), null, locale);

        return new ResponseEntity<>(new RestMessage(message), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<RestMessage> handleBadCredentialException(BadCredentialsException ex, Locale locale) {
        String message = messageSource.getMessage("message.auth.badCredentials", null, locale);

        return new ResponseEntity<>(new RestMessage(message), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<RestMessage> handleValidationException(ValidationException ex, Locale locale) {
        String message = messageSource.getMessage("message.validation." + ex.getMessage(), null, locale);

        return new ResponseEntity<>(new RestMessage(message), HttpStatus.BAD_REQUEST);
    }
}
