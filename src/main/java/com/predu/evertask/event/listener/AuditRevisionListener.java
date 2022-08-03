package com.predu.evertask.event.listener;

import com.predu.evertask.domain.model.AuditRevisionEntity;
import com.predu.evertask.domain.model.User;
import org.hibernate.envers.RevisionListener;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class AuditRevisionListener implements RevisionListener {

    @Override
    public void newRevision(Object revisionEntity) {

        String username;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication instanceof AnonymousAuthenticationToken) {
            username = "UnknownUser";
        } else {
            User user = (User) authentication.getPrincipal();
            username = user.getUsername();
        }

        AuditRevisionEntity auditRevisionEntity = (AuditRevisionEntity) revisionEntity;
        auditRevisionEntity.setUsername(username);
    }
}
