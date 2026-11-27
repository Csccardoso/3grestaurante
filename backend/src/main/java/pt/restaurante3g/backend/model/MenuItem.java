package pt.restaurante3g.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "menu_items")
public class MenuItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_pt", nullable = false, length = 150)
    private String namePt;

    @Column(name = "name_en", length = 150)
    private String nameEn;

    @Column(name = "name_fr", length = 150)
    private String nameFr;

    @Column(name = "name_nl", length = 150)
    private String nameNl;

    @Column(name = "description_pt", length = 500)
    private String descriptionPt;

    @Column(name = "description_en", length = 500)
    private String descriptionEn;

    @Column(name = "description_fr", length = 500)
    private String descriptionFr;

    @Column(name = "description_nl", length = 500)
    private String descriptionNl;

    @Column(nullable = false, length = 40)
    private String section;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(name = "price_primary", precision = 10, scale = 2)
    private BigDecimal pricePrimary;

    @Column(name = "label_primary", length = 30)
    private String labelPrimary;

    @Column(name = "price_secondary", precision = 10, scale = 2)
    private BigDecimal priceSecondary;

    @Column(name = "label_secondary", length = 30)
    private String labelSecondary;

    @Column(name = "price_tertiary", precision = 10, scale = 2)
    private BigDecimal priceTertiary;

    @Column(name = "label_tertiary", length = 30)
    private String labelTertiary;

    @Column(name = "is_market_price", nullable = false)
    private boolean marketPrice = false;

    @Column(length = 255)
    private String allergens;

    @Column(nullable = false)
    private boolean available = true;

    @Column(name = "image_url", columnDefinition = "TEXT")
    private String imageUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    public MenuItem() {
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNamePt() { return namePt; }
    public void setNamePt(String namePt) { this.namePt = namePt; }

    public String getNameEn() { return nameEn; }
    public void setNameEn(String nameEn) { this.nameEn = nameEn; }

    public String getNameFr() { return nameFr; }
    public void setNameFr(String nameFr) { this.nameFr = nameFr; }

    public String getNameNl() { return nameNl; }
    public void setNameNl(String nameNl) { this.nameNl = nameNl; }

    public String getDescriptionPt() { return descriptionPt; }
    public void setDescriptionPt(String descriptionPt) { this.descriptionPt = descriptionPt; }

    public String getDescriptionEn() { return descriptionEn; }
    public void setDescriptionEn(String descriptionEn) { this.descriptionEn = descriptionEn; }

    public String getDescriptionFr() { return descriptionFr; }
    public void setDescriptionFr(String descriptionFr) { this.descriptionFr = descriptionFr; }

    public String getDescriptionNl() { return descriptionNl; }
    public void setDescriptionNl(String descriptionNl) { this.descriptionNl = descriptionNl; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public BigDecimal getPricePrimary() { return pricePrimary; }
    public void setPricePrimary(BigDecimal pricePrimary) { this.pricePrimary = pricePrimary; }

    public String getLabelPrimary() { return labelPrimary; }
    public void setLabelPrimary(String labelPrimary) { this.labelPrimary = labelPrimary; }

    public BigDecimal getPriceSecondary() { return priceSecondary; }
    public void setPriceSecondary(BigDecimal priceSecondary) { this.priceSecondary = priceSecondary; }

    public String getLabelSecondary() { return labelSecondary; }
    public void setLabelSecondary(String labelSecondary) { this.labelSecondary = labelSecondary; }

    public BigDecimal getPriceTertiary() { return priceTertiary; }
    public void setPriceTertiary(BigDecimal priceTertiary) { this.priceTertiary = priceTertiary; }

    public String getLabelTertiary() { return labelTertiary; }
    public void setLabelTertiary(String labelTertiary) { this.labelTertiary = labelTertiary; }

    public boolean isMarketPrice() { return marketPrice; }
    public void setMarketPrice(boolean marketPrice) { this.marketPrice = marketPrice; }

    public String getAllergens() { return allergens; }
    public void setAllergens(String allergens) { this.allergens = allergens; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}