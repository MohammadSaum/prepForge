package com.prepForge.prepForge_backend.repository;

import com.prepForge.prepForge_backend.entity.Note;
import com.prepForge.prepForge_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface NoteRepository extends JpaRepository<Note, Long> {

    Optional<Note> findByQuestion(Question question);
}
