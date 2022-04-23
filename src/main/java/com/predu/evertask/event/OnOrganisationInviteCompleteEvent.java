package com.predu.evertask.event;

import com.predu.evertask.domain.model.User;
import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

@Getter
@Setter
public class OnOrganisationInviteCompleteEvent extends ApplicationEvent {

    private Locale locale;
    private User user;

    public OnOrganisationInviteCompleteEvent(User user, Locale locale) {
        super(user);

        this.locale = locale;
        this.user = user;
    }
}
