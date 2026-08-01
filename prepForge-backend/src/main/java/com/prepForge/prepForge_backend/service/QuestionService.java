package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.AddQuestionRequest;
import com.prepForge.prepForge_backend.dto.UpdateQuestionRequest;
import com.prepForge.prepForge_backend.entity.Progress;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.ProgressRepository;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import com.prepForge.prepForge_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    private final AuthenticationService authenticationService;
    private final ProgressRepository progressRepository;

    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository, AuthenticationService authenticationService, ProgressRepository progressRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
        this.authenticationService = authenticationService;
        this.progressRepository = progressRepository;
    }

    public Question addQuestion(AddQuestionRequest request) {

        User user = authenticationService.getCurrentUser();

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

        Question savedQuestion = questionRepository.save(question);

        Progress progress = Progress.builder()
                .favorite(false)
                .confidence(0)
                .revisionCount(0)
                .question(savedQuestion)
                .build();

        progressRepository.save(progress);

        savedQuestion.setProgress(progress);

        return savedQuestion;
    }

    public List<Question> getMyQuestions() {
        User user = authenticationService.getCurrentUser();

        return questionRepository.findByUser(user);
    }

    public Question getQuestion(Long id) {

        User user = authenticationService.getCurrentUser();

        return questionRepository.findByIdAndUser(id, user).orElseThrow(() -> new RuntimeException("Question not found"));
    }

    public Question updateQuestion(Long id, UpdateQuestionRequest request) {
        User user = authenticationService.getCurrentUser();

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
        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(id, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        questionRepository.delete(question);
    }
}