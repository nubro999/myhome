/*
package io.github.myhome;

import io.github.myhome.domain.entity.Post;
import io.github.myhome.repository.PostRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PostRepo postRepo;

    @Override
    public void run(String... args) {
        // 초기 데이터 생성
        Post post = new Post();
        post.setTitle("첫 번째 게시글");
        post.setContent("이것은 첫 번째 게시글의 내용입니다.");
        post.setAuthor("신형섭");

        // 데이터 저장 (id는 자동 생성됨)
        postRepo.save(post);

        System.out.println("초기 데이터가 저장되었습니다: " + post);
    }
}
*/