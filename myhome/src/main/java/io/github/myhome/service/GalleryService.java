package io.github.myhome.service;

import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepo galleryRepo;

    // application.properties 또는 application.yml에서 설정된 업로드 경로
    @Value("${file.upload-dir}")
    private String uploadDir;

    /**
     * 모든 갤러리 조회
     */
    public List<Gallery> getAllGallery() {
        return galleryRepo.findAll();
    }

    /**
     * 카테고리별 갤러리 조회
     */
    public List<Gallery> getGalleryByCategory(String category) {
        return galleryRepo.findByCategory(category);
    }

    /**
     * 갤러리 업로드
     */
    public Gallery uploadGallery(MultipartFile file, String title, String description, String category) {
        try {
            // 원본 파일 이름 가져오기
            String originalFilename = file.getOriginalFilename();

            // 파일 이름에 UUID 추가로 고유한 이름 생성
            String uniqueFileName = UUID.randomUUID() + "_" + originalFilename;

            // 저장할 파일 경로
            String filePath = uploadDir + File.separator + uniqueFileName;

            // 파일을 지정된 경로에 저장
            File dest = new File(filePath);
            file.transferTo(dest);

            // Gallery 엔티티 생성
            Gallery gallery = Gallery.builder()
                    .title(title)
                    .description(description)
                    .category(category)
                    .fileName(originalFilename) // 원본 파일 이름 저장
                    .imagePath(filePath)        // 파일 경로 저장
                    .build();

            // 엔티티를 데이터베이스에 저장
            return galleryRepo.save(gallery);

        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 갤러리 삭제
     */
    public void deleteGallery(Long id) {
        // 갤러리 엔티티 조회
        Gallery gallery = galleryRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 ID의 갤러리를 찾을 수 없습니다: " + id));

        // 파일 삭제 (물리적 파일 삭제)
        File file = new File(gallery.getImagePath());
        if (file.exists()) {
            file.delete();
        }

        // 데이터베이스에서 엔티티 삭제
        galleryRepo.deleteById(id);
    }
}
