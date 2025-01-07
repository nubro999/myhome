package io.github.myhome.domain.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class PortfolioItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    @ElementCollection
    @CollectionTable(name = "portfolio_tags", joinColumns = @JoinColumn(name = "portfolio_id"))
    @Column(name = "tag")
    private List<String> tags;

    private String github;

    private String demo;
}