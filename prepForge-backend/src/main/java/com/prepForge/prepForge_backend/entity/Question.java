package com.prepForge.prepForge_backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import enums.Difficulty;
import enums.Platform;
import enums.Status;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "questions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String title;

    @Enumerated(EnumType.STRING)
    private Difficulty difficulty;

    @Enumerated(EnumType.STRING)
    private Platform platform;

    private String topic;

    private String link;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @JsonIgnore
    @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
    private Progress progress;
}
