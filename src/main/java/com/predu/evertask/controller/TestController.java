package com.predu.evertask.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
@RequestMapping(value = "/test")
public class TestController {

    @GetMapping
    public ResponseEntity<?> sayHello() {
        return ResponseEntity.ok("HELLO!");
    }
}
