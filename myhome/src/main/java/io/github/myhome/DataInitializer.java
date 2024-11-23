package io.github.myhome;
import io.github.myhome.domain.entity.Student;
import io.github.myhome.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final StudentRepository studentRepository;

    @Override
    public void run(String... args) {
        // 초기 데이터 생성
        Student student1 = Student.builder()
                .name("신형섭")
                .age(26)
                .major("컴퓨터공학")
                .build();

        Student student2 = Student.builder()
                .name("박영서")
                .age(20)
                .major("영어영문학과")
                .build();

        Student student3 = Student.builder()
                .name("김민겸")
                .age(24)
                .major("컴퓨터공학과")
                .build();

        // 데이터베이스에 저장
        studentRepository.save(student1);
        studentRepository.save(student2);
        studentRepository.save(student3);
    }
}
