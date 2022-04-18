package com.predu.evertask.event.listener;

import com.predu.evertask.domain.model.User;
import com.predu.evertask.event.OnSignupCompleteEvent;
import com.predu.evertask.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

import java.util.UUID;

@RequiredArgsConstructor
@Component
public class SignupListener implements ApplicationListener<OnSignupCompleteEvent> {

    private final UserService userService;
    private final MessageSource messageSource;
    private final JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(OnSignupCompleteEvent event) {
        this.confirmSignup(event);
    }

    private void confirmSignup(OnSignupCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();

        userService.createVerificationToken(user, token);

        String address = user.getEmail();
        String subject = messageSource.getMessage("message.signup.title", null, event.getLocale());
        String confirmationUrl = event.getAppUrl() + "signup_confirmation?token=" + token;
        String message = messageSource.getMessage("message.signup.success", null, event.getLocale());

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(address);
        email.setSubject(subject);
        email.setText(message + "\r\n" + "http://localhost:3000/" + confirmationUrl);
        mailSender.send(email);
    }
}
