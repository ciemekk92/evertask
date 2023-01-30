package com.predu.evertask.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

import java.util.Locale;

@Getter
@Setter
public class OnResetPasswordCompleteEvent extends ApplicationEvent {

    private String tempPassword;
    private Locale locale;
    private String email;

    public OnResetPasswordCompleteEvent(String email, Locale locale, String tempPassword) {
        super(email);

        this.email = email;
        this.locale = locale;
        this.tempPassword = tempPassword;
    }
}
