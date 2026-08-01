package com.prepForge.prepForge_backend.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Data;

@Data
public class UpdateConfidenceRequest {
    @Min(1)
    @Max(5)
    private Integer confidence;
}
