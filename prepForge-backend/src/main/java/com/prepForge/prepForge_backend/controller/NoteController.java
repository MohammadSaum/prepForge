package com.prepForge.prepForge_backend.controller;

import com.prepForge.prepForge_backend.dto.NoteRequest;
import com.prepForge.prepForge_backend.entity.Note;
import com.prepForge.prepForge_backend.service.NoteService;
import jakarta.validation.Valid;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @PostMapping("/{questionId}")
    public ResponseEntity<Note> saveNote(@PathVariable Long questionId, @Valid @RequestBody NoteRequest request) {

        return ResponseEntity.ok(noteService.saveNote(questionId, request));
    }

    @GetMapping("/{questionId}")
    public ResponseEntity<Note> getNote(@PathVariable Long questionId) {

        return ResponseEntity.ok(noteService.getNote(questionId));
    }

    @DeleteMapping("/{questionId}")
    public ResponseEntity<String> deleteNote(
            @PathVariable Long questionId) {

        noteService.deleteNote(questionId);

        return ResponseEntity.ok("Note deleted successfully");
    }
}
