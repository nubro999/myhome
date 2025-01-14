package io.github.myhome.controller;

import io.github.myhome.service.GalleryService;
import io.github.myhome.domain.entity.Gallery;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
public class GalleryController {

    private final GalleryService galleryService;

    // 모든 이미지 가져오기
    @GetMapping
    public ResponseEntity<List<Gallery>> getAllGallery() {
        System.out.println("컨트롤러 이미지 가져오기");
        return ResponseEntity.ok(galleryService.getAllGallery());
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
        System.out.println("이미지 업로드 가져오기");
        return ResponseEntity.ok(gallery);
    }

    // 특정 이미지 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGallery(@PathVariable Long id) {
        galleryService.deleteGallery(id);
        return ResponseEntity.noContent().build();
    }

    // 업로드된 파일 제공
    @GetMapping("/files/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        try {
            // 파일 경로 설정
            Path filePath = Paths.get("C:/uploads/").resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());

            if (resource.exists()) {
                return ResponseEntity.ok()
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}


