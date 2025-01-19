package io.github.myhome.service;

import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepo galleryRepository;
    private final S3Service s3Service;

    // 모든 갤러리 가져오기
    public List<Gallery> getAllGallery() {
        return galleryRepository.findAll();
    }

    // 갤러리 업로드 처리
    public Gallery uploadGallery(MultipartFile file, String title, String description) {
        try {
            // 파일 이름 생성
            String originalFileName = file.getOriginalFilename();
            String sanitizedFileName = originalFileName.replaceAll("[^a-zA-Z0-9._-]", "_");
            String fileName = UUID.randomUUID() + "_" + sanitizedFileName;

            // S3에 파일 업로드 및 URL 반환
            String fileUrl = s3Service.uploadFile(fileName, file);

            // Gallery 엔티티 생성 및 저장
            Gallery gallery = new Gallery();
            gallery.setTitle(title);
            gallery.setDescription(description);
            gallery.setFileName(fileName);
            gallery.setFileUrl(fileUrl);
            return galleryRepository.save(gallery);

        } catch (IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
        }
    }

    // 갤러리 삭제
    public void deleteGallery(Long id) {
        // 갤러리 엔티티 가져오기
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 갤러리 ID: " + id));

        // S3에서 파일 삭제
        s3Service.deleteFile(gallery.getFileName());

        // DB에서 갤러리 삭제
        galleryRepository.deleteById(id);
    }
}

