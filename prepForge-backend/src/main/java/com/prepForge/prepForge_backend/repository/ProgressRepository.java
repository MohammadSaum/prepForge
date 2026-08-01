package com.prepForge.prepForge_backend.repository;

import com.prepForge.prepForge_backend.entity.Progress;
import com.prepForge.prepForge_backend.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProgressRepository extends JpaRepository<Progress, Long> {

    Optional<Progress> findByQuestion(Question question);
}
