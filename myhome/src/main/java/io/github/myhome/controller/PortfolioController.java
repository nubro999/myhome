package io.github.myhome.controller;
import io.github.myhome.domain.entity.PortfolioItem;
import io.github.myhome.service.PortfolioService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/portfolio")
public class PortfolioController {

    private PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    // 모든 포트폴리오 항목 조회
    @GetMapping
    public List<PortfolioItem> getAllPortfolioItems() {
        return portfolioService.getAllPortfolioItems();
    }

    // 특정 포트폴리오 항목 조회
    @GetMapping("/{id}")
    public PortfolioItem getPortfolioItemById(@PathVariable Long id) {
        return portfolioService.getPortfolioItemById(id);
    }

    // 포트폴리오 항목 생성
    @PostMapping
    public PortfolioItem createPortfolioItem(@RequestBody PortfolioItem item) {
        return portfolioService.createPortfolioItem(item);
    }

    // 포트폴리오 항목 삭제
    @DeleteMapping("/{id}")
    public void deletePortfolioItem(@PathVariable Long id) {
        portfolioService.deletePortfolioItem(id);
    }
}

