package io.github.myhome.service;
import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepo galleryRepo;

    // 모든 이미지 가져오기
    public List<Gallery> getAllGallery() {
        return galleryRepo.findAll();
    }

    // 카테고리별 이미지 가져오기
    public List<Gallery> getGalleryByCategory(String category) {
        if (category.equals("all")) {
            return galleryRepo.findAll();
        }
        return galleryRepo.findByCategory(category);
    }

    // 이미지 저장
    public Gallery saveGallery(Gallery gallery) {
        return galleryRepo.save(gallery);
    }

    // 특정 이미지 삭제
    public void deleteGallery(Long id) {
        galleryRepo.deleteById(id);
    }
}
