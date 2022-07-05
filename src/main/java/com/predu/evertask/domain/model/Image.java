package com.predu.evertask.domain.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.Table;

@Entity
@Getter
@Setter
@Table(name = "images")
@EntityListeners(AuditingEntityListener.class)
public class Image extends BaseEntity {

    private String name;
    private String type;

    @Column(name = "pic_byte", length = 1000)
    private byte[] picByte;
}
