package com.prepForge.prepForge_backend.controller;

import com.prepForge.prepForge_backend.dto.UpdateConfidenceRequest;
import com.prepForge.prepForge_backend.entity.Progress;
import com.prepForge.prepForge_backend.service.ProgressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/progress")
public class ProgressController {

    private final ProgressService progressService;

    public ProgressController(ProgressService progressService) {
        this.progressService = progressService;
    }

    @PatchMapping("/{questionId}/favorite")
    public ResponseEntity<Progress> toggleFavorite(@PathVariable Long questionId) {
        return ResponseEntity.ok(progressService.toggleFavorite(questionId));
    }

    @PatchMapping("/{questionId}/confidence")
    public ResponseEntity<Progress> updateConfidence(@PathVariable Long questionId, @Valid @RequestBody UpdateConfidenceRequest request) {
        return ResponseEntity.ok(progressService.updateConfidence(questionId, request));
    }

    @PatchMapping("/{questionId}/revise")
    public ResponseEntity<Progress> reviseQuestion(
            @PathVariable Long questionId) {

        return ResponseEntity.ok(
                progressService.reviseQuestion(questionId)
        );
    }

    @GetMapping("{questionId}")
    public ResponseEntity<Progress> getProgress(@PathVariable Long questionId) {
        return ResponseEntity.ok(progressService.getProgress(questionId));
    }
}
