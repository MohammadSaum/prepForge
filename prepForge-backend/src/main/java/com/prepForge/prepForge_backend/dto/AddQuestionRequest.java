package com.prepForge.prepForge_backend.dto;

import enums.Difficulty;
import enums.Platform;
import enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AddQuestionRequest {

    @NotBlank(message = "Title is required")
    private String title;

    @NotNull(message = "Difficulty is required")
    private Difficulty difficulty;

    @NotNull(message = "Platform is required")
    private Platform platform;

    @NotBlank(message = "Topic is required")
    private String topic;

    @NotBlank(message = "Link is required")
    private String link;

    @NotNull(message = "Status is required")
    private Status status;
}
