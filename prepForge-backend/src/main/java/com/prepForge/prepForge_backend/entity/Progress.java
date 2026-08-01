package com.prepForge.prepForge_backend.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "progress")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Progress {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean favorite;

    private Integer confidence;

    private Integer revisionCount;

    private LocalDate lastSolved;

    private LocalDate nextRevision;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
