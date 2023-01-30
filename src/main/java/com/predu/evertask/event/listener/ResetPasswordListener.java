package com.predu.evertask.event.listener;

import com.predu.evertask.event.OnResetPasswordCompleteEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class ResetPasswordListener implements ApplicationListener<OnResetPasswordCompleteEvent> {

    private final MessageSource messageSource;
    private final JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(OnResetPasswordCompleteEvent event) {
        this.resetPassword(event);
    }

    private void resetPassword(OnResetPasswordCompleteEvent event) {

        String address = event.getEmail();
        String subject = messageSource.getMessage("message.resetPassword.title", null, event.getLocale());
        String newPassword = event.getTempPassword();
        String message = messageSource.getMessage("message.resetPassword.success", null, event.getLocale());

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(address);
        email.setSubject(subject);
        email.setText(message + "\r\n" + newPassword);
        mailSender.send(email);
    }
}
