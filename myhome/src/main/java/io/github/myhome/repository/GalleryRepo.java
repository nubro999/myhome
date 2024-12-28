package io.github.myhome.repository;
import io.github.myhome.domain.entity.Gallery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GalleryRepo extends JpaRepository<Gallery, Long> {
    List<Gallery> findByCategory(String category); // 카테고리별 이미지 조회
}
