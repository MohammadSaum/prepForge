package com.prepForge.prepForge_backend.dto;

import enums.Difficulty;
import enums.Platform;
import enums.Status;
import lombok.Data;

@Data
public class AddQuestionRequest {

    private String title;
    private Difficulty difficulty;
    private Platform platform;
    private String topic;
    private String link;
    private Status status;
}
