package io.github.myhome.service;

import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepo galleryRepository;

    // S3 관련 설정 값
    @Value("${cloud.aws.s3.bucket-name}")
    private String bucketName;

    @Value("${cloud.aws.region}")
    private String region;

    @Value("${cloud.aws.credentials.access-key}")
    private String accessKey;

    @Value("${cloud.aws.credentials.secret-key}")
    private String secretKey;

    // 모든 갤러리 가져오기
    public List<Gallery> getAllGallery() {
        return galleryRepository.findAll();
    }

    // 갤러리 업로드 처리
    public Gallery uploadGallery(MultipartFile file, String title, String description) {
        try {
            // S3 클라이언트 생성
            S3Client s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)
                    ))
                    .build();

            // 파일 이름 생성
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

            // S3에 파일 업로드
            s3Client.putObject(
                    PutObjectRequest.builder()
                            .bucket(bucketName)
                            .key(fileName)
                            .contentType(file.getContentType())
                            .build(),
                    software.amazon.awssdk.core.sync.RequestBody.fromBytes(file.getBytes())
            );

            // Gallery 엔티티 생성 및 저장
            Gallery gallery = new Gallery();
            gallery.setTitle(title);
            gallery.setDescription(description);
            gallery.setFileName(fileName); // 저장된 파일 이름
            gallery.setFileUrl("https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName); // S3 URL
            return galleryRepository.save(gallery);

        } catch (S3Exception | IOException e) {
            throw new RuntimeException("파일 업로드 실패: " + e.getMessage(), e);
        }
    }

    // 갤러리 삭제
    public void deleteGallery(Long id) {
        // 갤러리 엔티티 가져오기
        Gallery gallery = galleryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("존재하지 않는 갤러리 ID: " + id));

        try {
            // S3 클라이언트 생성
            S3Client s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(
                            AwsBasicCredentials.create(accessKey, secretKey)
                    ))
                    .build();

            // S3에서 파일 삭제
            s3Client.deleteObject(builder -> builder.bucket(bucketName).key(gallery.getFileName()).build());

            // DB에서 갤러리 삭제
            galleryRepository.deleteById(id);

        } catch (S3Exception e) {
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage(), e);
        }
    }

    public String getFileUrl(String fileName) {
        // S3 파일 URL 생성
        return "https://" + bucketName + ".s3." + region + ".amazonaws.com/" + fileName;
    }
}
