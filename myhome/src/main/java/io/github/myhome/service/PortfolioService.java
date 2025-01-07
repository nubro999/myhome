package io.github.myhome.service;

import io.github.myhome.domain.entity.PortfolioItem;
import io.github.myhome.repository.PortfolioRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PortfolioService {

    private final PortfolioRepo portfolioRepository; // final로 선언해서 @RequiredArgsConstructor가 생성자를 자동 생성하도록 함

    public List<PortfolioItem> getAllPortfolioItems() {
        return portfolioRepository.findAll();
    }

    public PortfolioItem getPortfolioItemById(Long id) {
        return portfolioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Portfolio item not found"));
    }

    public PortfolioItem createPortfolioItem(PortfolioItem item) {
        return portfolioRepository.save(item);
    }

    public void deletePortfolioItem(Long id) {
        portfolioRepository.deleteById(id);
    }
}