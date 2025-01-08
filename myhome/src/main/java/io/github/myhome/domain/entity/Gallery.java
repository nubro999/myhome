package io.github.myhome.domain.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Gallery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private String category;

    private String fileName;

    // 기본값을 빈 문자열로 설정
    @Column(nullable = false)
    private String imagePath = "";

    // Getters and Setters
}