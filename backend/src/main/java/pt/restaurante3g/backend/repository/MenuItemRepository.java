package pt.restaurante3g.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.restaurante3g.backend.model.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {

    // Traduzido pelo Spring para:
    // SELECT * FROM menu_items WHERE available = true ORDER BY id ASC
    List<MenuItem> findByAvailableTrueOrderByIdAsc();

    // Traduzido pelo Spring para:
    // SELECT * FROM menu_items WHERE section = ? AND available = true ORDER BY id ASC
    List<MenuItem> findBySectionAndAvailableTrueOrderByIdAsc(String section);
}