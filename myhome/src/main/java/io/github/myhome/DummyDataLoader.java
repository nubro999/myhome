package io.github.myhome;

import io.github.myhome.service.AuthService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DummyDataLoader implements CommandLineRunner {

    private final AuthService authService;

    public DummyDataLoader(AuthService authService) {
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws Exception {
        // 더미 데이터 생성
        try {
            authService.register("testuser1", "password1");
            authService.register("testuser2", "password2");
            authService.register("adminuser", "adminpassword");
            System.out.println("더미 데이터가 성공적으로 생성되었습니다.");
        } catch (Exception e) {
            System.err.println("더미 데이터 생성 중 에러 발생: " + e.getMessage());
        }
    }
}
