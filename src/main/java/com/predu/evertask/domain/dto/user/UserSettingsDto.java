package com.predu.evertask.domain.dto.user;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserSettingsDto {

    private boolean darkMode;
    private String interfaceLanguage;
    private String interfaceColor;
}
