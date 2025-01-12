package io.github.myhome.service;

import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepo galleryRepository;

    // 파일 저장 경로
    private final String uploadDir = "C:/uploads";

    // 모든 갤러리 가져오기
    public List<Gallery> getAllGallery() {
        return galleryRepository.findAll();
    }

    // 갤러리 업로드 처리
    public Gallery uploadGallery(MultipartFile file, String title, String description) {
        try {
            // 업로드 디렉토리 생성 (존재하지 않으면)
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 파일 저장
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            file.transferTo(filePath.toFile());

            // Gallery 엔티티 생성 및 저장
            Gallery gallery = new Gallery();
            gallery.setTitle(title);
            gallery.setDescription(description);
            gallery.setFileName(fileName); // 저장된 파일 이름
            gallery.setFileUrl("/api/gallery/files/" + fileName); // HTTP URL
            return galleryRepository.save(gallery);
        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
        }
    }

    // 갤러리 삭제
    public void deleteGallery(Long id) {
        galleryRepository.deleteById(id);
    }
}
