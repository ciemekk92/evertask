package com.predu.evertask.config;

import com.predu.evertask.util.SecurityAuditorAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import java.util.UUID;

@Configuration
@EnableJpaAuditing
public class PersistenceConfiguration {

    @Bean
    public AuditorAware<UUID> auditorProvider() {
        return new SecurityAuditorAware();
    }
}
