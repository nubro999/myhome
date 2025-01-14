# 1. Gradle 빌드 환경을 포함한 JDK 이미지 사용 (빌드 단계)
FROM gradle:8.3-jdk17 AS build

# 2. 컨테이너 내 작업 디렉토리 설정
WORKDIR /app

# 3. Gradle 설정 파일 복사
COPY build.gradle settings.gradle ./

# 4. Gradle 종속성 캐싱
RUN gradle build -x test --no-daemon

# 5. 소스 코드 복사
COPY . .

# 6. 애플리케이션 빌드
RUN gradle bootJar --no-daemon

# 7. 실행 단계: Slim JDK 이미지를 사용해 경량화
FROM openjdk:17-jdk-slim

# 8. 작업 디렉토리 설정
WORKDIR /app

# 9. 빌드된 JAR 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 10. 컨테이너가 실행될 때 JAR 파일 실행
ENTRYPOINT ["java", "-jar", "app.jar"]