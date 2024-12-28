/*
package io.github.myhome;

import io.github.myhome.domain.entity.Gallery;
import io.github.myhome.repository.GalleryRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final GalleryRepo galleryRepo;

    @Override
    public void run(String... args) {
        // 초기 데이터 생성
        Gallery gallery = new Gallery();
        gallery.setTitle("데이터 연결 테스트");
        gallery.setCategory("project");
        gallery.setUrl("https://i.pravatar.cc/300");
        gallery.setDescription("이것은 백엔드에서 데이터 넣기, 사람");
        gallery.setDate(LocalDate.now());

        Gallery gallery2 = new Gallery();
        gallery2.setTitle("데이터 연결 테스트");
        gallery2.setCategory("daily");
        gallery2.setUrl("https://picsum.photos/300/300");
        gallery2.setDescription("이것은 백엔드에서 데이터 넣기 2");
        gallery2.setDate(LocalDate.now());

        Gallery gallery3 = new Gallery();
        gallery3.setTitle("데이터 연결 테스트");
        gallery3.setCategory("event");
        gallery3.setUrl("https://picsum.photos/300");
        gallery3.setDescription("이것은 백엔드에서 데이터 넣기 3");
        gallery3.setDate(LocalDate.now());

        // 데이터 저장 (id는 자동 생성됨)
        galleryRepo.save(gallery);
        galleryRepo.save(gallery2);
        galleryRepo.save(gallery3);

        System.out.println("초기 데이터가 저장되었습니다: " + gallery);
        System.out.println("초기 데이터가 저장되었습니다: " + gallery2);
        System.out.println("초기 데이터가 저장되었습니다: " + gallery3);
    }
}*/


