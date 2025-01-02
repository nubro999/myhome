package io.github.myhome.controller;

import io.github.myhome.service.UserService;
import io.github.myhome.security.JwtTokenProvider;
import io.github.myhome.domain.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final AuthController authController;

    @Autowired
    public UserController(AuthController authController) {
        this.authController = authController;
    }

    // 로그인 API: AuthController의 /login 호출
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserLoginRequest request) {
        return authController.login(request);
    }
}