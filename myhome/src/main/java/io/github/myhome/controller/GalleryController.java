package io.github.myhome.controller;
import io.github.myhome.service.GalleryService;
import io.github.myhome.domain.entity.Gallery;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    // 모든 이미지 가져오기
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery(@RequestParam(required = false, defaultValue = "all") String category) {
        List<Gallery> galleries = galleryService.getGalleryByCategory(category);
        return ResponseEntity.ok(galleries);
    }

    // 이미지 업로드
    @PostMapping
    public ResponseEntity<Gallery> uploadGallery(@RequestBody Gallery gallery) {
        Gallery savedgallery = galleryService.saveGallery(gallery);
        return ResponseEntity.ok(savedgallery);
    }

    // 이미지 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }
}

