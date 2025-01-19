package io.github.myhome.controller;

import io.github.myhome.service.GalleryService;
import io.github.myhome.service.S3Service;
import io.github.myhome.domain.entity.Gallery;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;
    private final S3Service s3Service; // S3 관련 로직을 처리하기 위해 S3Service 주입

    // 모든 이미지 가져오기
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        List<Gallery> galleries = galleryService.getAllGallery();

        // 각 갤러리 객체에 S3 URL 설정
        galleries.forEach(gallery -> {
            String fileUrl = s3Service.getFileUrl(gallery.getFileName()); // S3 URL 생성
            gallery.setFileUrl(fileUrl); // Gallery 객체에 S3 URL 설정
        });

        return ResponseEntity.ok(galleries);
    }

    // 이미지 업로드 (파일 & 추가 데이터)
    @PostMapping
    public ResponseEntity<Gallery> uploadGallery(
            @RequestParam("file") MultipartFile file,           // 파일 이름 'file'
            @RequestParam("title") String title,                // 제목
            @RequestParam("description") String description     // 설명
    ) {
        // Service 호출
        Gallery gallery = galleryService.uploadGallery(file, title, description);
        return ResponseEntity.ok(gallery);
    }

    // 특정 이미지 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }

    // S3에서 업로드된 파일 제공 (URL 리다이렉션)
    @GetMapping("/files/{fileName}")
    public ResponseEntity<String> getFile(@PathVariable String fileName) {
        // S3 URL 생성
        String fileUrl = s3Service.getFileUrl(fileName);
        return ResponseEntity.ok(fileUrl); // S3 URL을 직접 반환
    }
}

