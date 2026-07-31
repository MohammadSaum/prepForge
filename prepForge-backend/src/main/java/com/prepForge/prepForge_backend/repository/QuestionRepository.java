package com.prepForge.prepForge_backend.repository;

import com.prepForge.prepForge_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
