package io.github.myhome.repository;
import io.github.myhome.domain.entity.PortfolioItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PortfolioRepo extends JpaRepository<PortfolioItem, Long> {

}



