package io.github.myhome.repository;
import io.github.myhome.domain.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepo extends JpaRepository<Post, Long> {
    }