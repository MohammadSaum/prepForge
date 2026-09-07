package com.prepForge.prepForge_backend.repository;

import com.prepForge.prepForge_backend.entity.Question;
import com.prepForge.prepForge_backend.entity.User;
import enums.Difficulty;
import enums.Status;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {

    List<Question> findByUser(User user);
    Page<Question> findByUser(User user, Pageable pageable);

    Optional<Question> findByIdAndUser(Long id, User user);

    Optional<Question> findByLinkAndUser(String link, User user);

    long countByUser(User user);

    long countByUserAndDifficulty(User user , Difficulty difficulty);

    List<Question> findByUserAndDifficulty(User user, Difficulty difficulty);

    List<Question> findByUserAndTopic(User user, String topic);

    List<Question> findByUserAndDifficultyAndStatus(User user, Difficulty difficulty, Status status);

    List<Question> findByUserAndDifficultyAndStatusAndTopic(User user, Difficulty difficulty, Status status, String topic);

    Page<Question> findByUserAndDifficulty(
            User user,
            Difficulty difficulty,
            Pageable pageable);

    Page<Question> findByUserAndStatus(
            User user,
            Status status,
            Pageable pageable);

    Page<Question> findByUserAndTopic(
            User user,
            String topic,
            Pageable pageable);

    Page<Question> findByUserAndDifficultyAndStatus(
            User user,
            Difficulty difficulty,
            Status status,
            Pageable pageable);

    Page<Question> findByUserAndDifficultyAndTopic(
            User user,
            Difficulty difficulty,
            String topic,
            Pageable pageable);

    Page<Question> findByUserAndStatusAndTopic(
            User user,
            Status status,
            String topic,
            Pageable pageable);

    Page<Question> findByUserAndDifficultyAndStatusAndTopic(
            User user,
            Difficulty difficulty,
            Status status,
            String topic,
            Pageable pageable);
}
