package pt.restaurante3g.backend.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pt.restaurante3g.backend.model.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    // Lista todas as reservas ordenadas da data mais recente para a mais antiga
    List<Reservation> findAllByOrderByReservationDateDescReservationTimeAsc();

    // Lista as reservas de um dia específico (útil para a agenda diária do restaurante)
    List<Reservation> findByReservationDateOrderByReservationTimeAsc(LocalDate reservationDate);

    // Filtra por estado ('PENDENTE', 'CONFIRMADA', 'CANCELADA')
    List<Reservation> findByStatusOrderByReservationDateAscReservationTimeAsc(String status);
}