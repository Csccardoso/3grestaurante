package pt.restaurante3g.backend.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.restaurante3g.backend.model.MenuItem;
import pt.restaurante3g.backend.repository.MenuItemRepository;

@RestController
@RequestMapping("/api/menu")
@CrossOrigin(origins = "http://localhost:3000")
public class MenuItemController {

    private final MenuItemRepository menuItemRepository;

    public MenuItemController(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    // GET http://localhost:8080/api/menu
    // GET http://localhost:8080/api/menu?section=Ementa
    // GET http://localhost:8080/api/menu?section=Vinhos
    @GetMapping
    public List<MenuItem> getMenu(@RequestParam(required = false) String section) {
        if (section != null && !section.isBlank()) {
            return menuItemRepository.findBySectionAndAvailableTrueOrderByIdAsc(section);
        }
        return menuItemRepository.findByAvailableTrueOrderByIdAsc();
    }
}