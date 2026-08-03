package com.prepForge.prepForge_backend.controller;

import com.prepForge.prepForge_backend.dto.AddQuestionRequest;
import com.prepForge.prepForge_backend.dto.UpdateQuestionRequest;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.service.QuestionService;
import enums.Difficulty;
import enums.Status;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<Question>> getMyQuestions(
            @RequestParam(required = false) Difficulty difficulty,
            @RequestParam(required = false) Status status,
            @RequestParam(required = false) String topic
            ) {

        return ResponseEntity.ok(questionService.getMyQuestions(
                difficulty,
                status,
                topic
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Question> getQuestion(@PathVariable Long id) {
        return ResponseEntity.ok(questionService.getQuestion(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @Valid @RequestBody UpdateQuestionRequest request) {

        return ResponseEntity.ok(
                questionService.updateQuestion(id, request)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteQuestion(@PathVariable Long id) {

        questionService.deleteQuestion(id);

        return ResponseEntity.ok("Question Deleted Successfully");
    }

    @GetMapping("/page")
    public ResponseEntity<Page<Question>> getQuestions(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size)

    {

        Pageable pageable = PageRequest.of(page, size);

        return ResponseEntity.ok(questionService.getQuestions(pageable));

    }
}
