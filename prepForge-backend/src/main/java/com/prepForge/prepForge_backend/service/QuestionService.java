package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.AddQuestionRequest;
import com.prepForge.prepForge_backend.dto.UpdateQuestionRequest;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import com.prepForge.prepForge_backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

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

        if (questionRepository.findByLinkAndUser(request.getLink(), user).isPresent()) {
            throw new RuntimeException("Question already exists.");
        }

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

    public List<Question> getMyQuestions() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return questionRepository.findByUser(user);
    }

    public Question getQuestion(Long id) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email).orElseThrow();

        return questionRepository.findByIdAndUser(id, user).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question updateQuestion(Long id, UpdateQuestionRequest request) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Question question = questionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        question.setTitle(request.getTitle());
        question.setDifficulty(request.getDifficulty());
        question.setPlatform(request.getPlatform());
        question.setTopic(request.getTopic());
        question.setLink(request.getLink());
        question.setStatus(request.getStatus());

        return questionRepository.save(question);
    }

    public void deleteQuestion(Long id) {
        Authentication authentication =
                SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Question question = questionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        questionRepository.delete(question);
    }
}