package com.prepForge.prepForge_backend.dto;

import enums.Difficulty;
import enums.Platform;
import enums.Status;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class UpdateQuestionRequest {

    @NotBlank
    private String title;

    @NotNull
    private Difficulty difficulty;

    @NotNull
    private Platform platform;

    @NotBlank
    private String topic;

    @NotBlank
    private String link;

    @NotNull
    private Status status;
}
