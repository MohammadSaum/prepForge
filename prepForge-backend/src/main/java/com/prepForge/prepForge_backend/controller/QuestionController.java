package com.prepForge.prepForge_backend.controller;

import com.prepForge.prepForge_backend.dto.AddQuestionRequest;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.service.QuestionService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/questions")
public class QuestionController {

    private final QuestionService questionService;


    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping
    public ResponseEntity<Question> addQuestion(@Valid @RequestBody AddQuestionRequest request) {

        Question question = questionService.addQuestion(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(question);
    }
}
