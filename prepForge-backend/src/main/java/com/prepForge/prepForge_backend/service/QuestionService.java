package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.AddQuestionRequest;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import com.prepForge.prepForge_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;

    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public Question addQuestion(AddQuestionRequest request) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        Question question = Question.builder()
                .title((request.getTitle()))
                .difficulty(request.getDifficulty())
                .platform(request.getPlatform())
                .topic(request.getTopic())
                .link(request.getLink())
                .status(request.getStatus())
                .user(user)
                .build();

        return questionRepository.save(question);
    }
}