package io.github.myhome.service;

import io.github.myhome.domain.entity.User;
import io.github.myhome.repository.UserRepo;
import io.github.myhome.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo userRepo;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;

    // 로그인 처리
    public String login(String username, String password) {
        Optional<User> userOpt = userRepo.findByUsername(username);
        System.out.println(username);
        System.out.println(password);
        if (userOpt.isEmpty() || !passwordEncoder.matches(password, userOpt.get().getPassword())) {
            throw new RuntimeException("아이디 또는 비밀번호가 잘못되었습니다.");
        }

        return jwtUtil.generateToken(username); // JWT 토큰 반환
    }

    // 회원가입 처리
    public void register(String username, String password) {
        if (userRepo.findByUsername(username).isPresent()) {
            throw new RuntimeException("이미 존재하는 사용자입니다.");
        }

        User user = new User();
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(password)); // 비밀번호 암호화
        user.setRole("ROLE_USER");

        userRepo.save(user);
    }
}

