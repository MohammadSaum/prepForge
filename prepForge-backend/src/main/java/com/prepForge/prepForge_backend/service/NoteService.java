package com.prepForge.prepForge_backend.service;

import com.prepForge.prepForge_backend.dto.NoteRequest;
import com.prepForge.prepForge_backend.entity.Note;
import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import com.prepForge.prepForge_backend.repository.NoteRepository;
import com.prepForge.prepForge_backend.repository.QuestionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;
    private final QuestionRepository questionRepository;
    private final AuthenticationService authenticationService;


    public NoteService(NoteRepository noteRepository, QuestionRepository questionRepository, AuthenticationService authenticationService) {
        this.noteRepository = noteRepository;
        this.questionRepository = questionRepository;
        this.authenticationService = authenticationService;
    }

    public Note saveNote(Long questionId, NoteRequest request) {
        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId,user)
                .orElseThrow(()->
                        new RuntimeException("Question not found"));

        Note note = noteRepository
                .findByQuestion(question)
                .orElse(new Note());

        note.setContent(request.getContent());

        note.setQuestion(question);

        return noteRepository.save(note);
    }

    public Note getNote(Long questionId) {

        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        return noteRepository.findByQuestion(question)
                .orElseThrow(() ->
                        new RuntimeException("Note not found"));
    }

    @Transactional
    public void deleteNote(Long questionId) {

        User user = authenticationService.getCurrentUser();

        Question question = questionRepository
                .findByIdAndUser(questionId, user)
                .orElseThrow(() ->
                        new RuntimeException("Question not found"));

        Note note = noteRepository.findByQuestion(question)
                .orElseThrow(() ->
                        new RuntimeException("Note not found"));

        // Break the relationship
        question.setNote(null);
        noteRepository.delete(note);

        noteRepository.flush();
    }
}
