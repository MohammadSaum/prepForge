package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.DashboardResponse;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.ProgressRepository;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import enums.Difficulty;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {
    private final QuestionRepository questionRepository;
    private final ProgressRepository progressRepository;
    private final AuthenticationService authenticationService;

    public DashboardService(QuestionRepository questionRepository, ProgressRepository progressRepository, AuthenticationService authenticationService) {
        this.questionRepository = questionRepository;
        this.progressRepository = progressRepository;
        this.authenticationService = authenticationService;
    }

    public DashboardResponse getDashboard() {
        User user = authenticationService.getCurrentUser();

        long total = questionRepository.countByUser(user);

        long easy = questionRepository.countByUserAndDifficulty(user, Difficulty.EASY);

        long medium = questionRepository.countByUserAndDifficulty(user, Difficulty.MEDIUM);

        long hard = questionRepository.countByUserAndDifficulty(user, Difficulty.HARD);

        long favorite = progressRepository.countByFavoriteTrueAndQuestion_User(user);

        long revisionDue = progressRepository.countByNextRevisionLessThanEqualAndQuestion_User(LocalDate.now(), user);

        return new DashboardResponse(
                total,
                easy,
                medium,
                hard,
                favorite,
                revisionDue
        );
    }
}
