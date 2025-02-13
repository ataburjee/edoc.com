package com.atabur.edoc.model;

import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Document {

    @Id
    private String id;

    @NotNull
    private String title;

    private String content;
    //User id
    @NotNull(message = "Owner is mandatory")
    private String owner;
    private long ct;
    private long lu;

    private String lub;
    //Map<userId, List<accessType>>
    @Convert(converter = MapConverter.class)
    // Shared users and their corresponding access types
    private Map<String, List<String>> collaborators;

    public Document setId(String id) {
        this.id = id;
        return this;
    }

    public Document setCt(long ct) {
        this.ct = ct;
        return this;
    }

    public Document setLu(long lu) {
        this.lu = lu;
        return this;
    }

    public Document setCollaborators(Map<String, List<String>> collaborators) {
        this.collaborators = collaborators;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public String getOwner() {
        return owner;
    }

    public Map<String, List<String>> getCollaborators() {
        return collaborators;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setLub(String lub) {
        this.lub = lub;
    }
}
