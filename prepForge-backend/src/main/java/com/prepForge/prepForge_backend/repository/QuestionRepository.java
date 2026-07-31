package com.prepForge.prepForge_backend.repository;

import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByUser(User user);
    Optional<Question> findByIdAndUser(Long id, User user);
    Optional<Question> findByLinkAndUser(String link, User user);
}
