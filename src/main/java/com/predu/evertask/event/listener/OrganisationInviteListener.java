package com.predu.evertask.event.listener;

import com.predu.evertask.domain.model.User;
import com.predu.evertask.event.OnOrganisationInviteCompleteEvent;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationListener;
import org.springframework.context.MessageSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class OrganisationInviteListener implements ApplicationListener<OnOrganisationInviteCompleteEvent> {

    private final MessageSource messageSource;
    private final JavaMailSender mailSender;

    @Override
    public void onApplicationEvent(@NonNull OnOrganisationInviteCompleteEvent event) {
        this.sendInviteNotification(event);
    }

    private void sendInviteNotification(OnOrganisationInviteCompleteEvent event) {
        User user = event.getUser();

        String address = user.getEmail();
        String subject = messageSource.getMessage("organisation.invitation.title", null, event.getLocale());
        String message = messageSource.getMessage("organisation.invitation.content", null, event.getLocale());

        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(address);
        email.setSubject(subject);
        email.setText(message);

        mailSender.send(email);
    }
}
