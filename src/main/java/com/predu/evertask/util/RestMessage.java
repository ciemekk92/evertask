package com.predu.evertask.util;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class RestMessage {

    private String message;
    private List<String> messages;

    public RestMessage(List<String> messages) {
        this.messages = messages;
    }

    public RestMessage(String message) {
        this.message = message;
    }
}

