package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.UpdateConfidenceRequest;
import com.prepForge.prepForge_backend.entity.Progress;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.ProgressRepository;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class ProgressService {
    private final ProgressRepository progressRepository;
    private final QuestionRepository questionRepository;
    private final AuthenticationService authenticationService;


    public ProgressService(ProgressRepository progressRepository, QuestionRepository questionRepository, AuthenticationService authenticationService) {
        this.progressRepository = progressRepository;
        this.questionRepository = questionRepository;
        this.authenticationService = authenticationService;
    }

    public Progress toggleFavorite(Long questionId) {
        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Progress progress = progressRepository
                .findByQuestion(question)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        progress.setFavorite(!progress.isFavorite());

        return progressRepository.save(progress);
    }

    public Progress updateConfidence(Long questionId, UpdateConfidenceRequest request) {
        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        Progress progress = progressRepository
                .findByQuestion(question)
                .orElseThrow(() -> new RuntimeException("Progress not found"));

        progress.setConfidence(request.getConfidence());

        return progressRepository.save(progress);
    }

    public Progress reviseQuestion(Long questionId) {

        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        Progress progress = progressRepository
                .findByQuestion(question)
                .orElseThrow(() ->
                        new RuntimeException("Progress not found"));

        progress.setRevisionCount(progress.getRevisionCount() + 1);

        progress.setLastSolved(LocalDate.now());

        progress.setNextRevision(LocalDate.now().plusDays(7));

        return progressRepository.save(progress);
    }

    public Progress getProgress(Long questionId) {
        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() -> new RuntimeException("Question not found"));

        return progressRepository.findByQuestion(question)
                .orElseThrow(()-> new RuntimeException("Progress not found"));
    }
}
