package com.prepForge.prepForge_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {
    private long totalQuestions;

    private long easyQuestions;

    private long mediumQuestions;

    private long hardQuestions;

    private long favoriteQuestions;

    private long revisionDue;
}
