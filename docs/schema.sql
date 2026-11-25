-- ============================================================================
-- Esquema Relacional - Restaurante 3ª Geração (PostgreSQL 18)
-- ============================================================================

-- 1. Tabela da Ementa e Carta de Vinhos (Multilingue: PT, EN, FR, NL)
CREATE TABLE IF NOT EXISTS menu_items (
    id BIGSERIAL PRIMARY KEY,
    name_pt VARCHAR(150) NOT NULL,
    name_en VARCHAR(150),
    name_fr VARCHAR(150),
    name_nl VARCHAR(150),
    description_pt VARCHAR(500),
    description_en VARCHAR(500),
    description_fr VARCHAR(500),
    description_nl VARCHAR(500),
    section VARCHAR(40) NOT NULL CHECK (section IN ('Ementa', 'Bebidas', 'Vinhos')),
    category VARCHAR(80) NOT NULL,
    price_primary NUMERIC(10, 2) CHECK (price_primary >= 0),
    label_primary VARCHAR(30),
    price_secondary NUMERIC(10, 2) CHECK (price_secondary >= 0),
    label_secondary VARCHAR(30),
    price_tertiary NUMERIC(10, 2) CHECK (price_tertiary >= 0),
    label_tertiary VARCHAR(30),
    is_market_price BOOLEAN NOT NULL DEFAULT FALSE,
    allergens VARCHAR(255),
    available BOOLEAN NOT NULL DEFAULT TRUE,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tabela de Reservas (com regras de lotação e horário de cozinha)
CREATE TABLE IF NOT EXISTS reservations (
    id BIGSERIAL PRIMARY KEY,
    customer_name VARCHAR(120) NOT NULL,
    customer_phone VARCHAR(30) NOT NULL,
    customer_email VARCHAR(150),
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    party_size INTEGER NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDENTE',
    notes VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_reservation_party_size
        CHECK (party_size >= 1 AND party_size <= 16),

    CONSTRAINT chk_reservation_time_window
        CHECK (
            (reservation_time >= '12:00:00' AND reservation_time <= '14:15:00') OR
            (reservation_time >= '19:00:00' AND reservation_time <= '21:15:00')
        ),

    CONSTRAINT chk_reservation_status
        CHECK (status IN ('PENDENTE', 'CONFIRMADA', 'CANCELADA'))
);