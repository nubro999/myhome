package io.github.myhome.service;

import io.github.myhome.domain.entity.User;
import io.github.myhome.repository.UserRepo;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class UserService {
    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    // 회원가입
    @Transactional
    public User registerUser(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new IllegalStateException("이미 존재하는 사용자입니다.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password));
        user.setRole("ROLE_USER");
        return userRepo.save(user);
    }

    // 사용자 조회
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    // 사용자 인증
    public User authenticateUser(String username, String password) {
        // 데이터베이스에서 사용자 조회
        Optional<User> userOptional = userRepo.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // 비밀번호 검증
            if (passwordEncoder.matches(password, user.getPassword())) {
                return user; // 인증 성공 시 User 객체 반환
            }
        }

        // 인증 실패 시 null 반환
        return null;
    }
}
