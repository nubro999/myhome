package io.github.myhome.domain.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username; // 사용자 이름 (로그인 ID)

    @Column(nullable = false)
    private String password; // 비밀번호 (암호화 필요)

    @Column(nullable = false)
    private String role; // 사용자 권한 (예: ROLE_USER, ROLE_ADMIN)
}

