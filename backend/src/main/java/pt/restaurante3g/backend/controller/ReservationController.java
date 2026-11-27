package pt.restaurante3g.backend.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pt.restaurante3g.backend.model.Reservation;
import pt.restaurante3g.backend.repository.ReservationRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:3000")
public class ReservationController {

    private final ReservationRepository reservationRepository;

    public ReservationController(ReservationRepository reservationRepository) {
        this.reservationRepository = reservationRepository;
    }

    // 1. Listar reservas (todas, por data ?date=2026-11-28 ou por estado ?status=PENDENTE)
    @GetMapping
    public List<Reservation> getReservations(
            @RequestParam(required = false) LocalDate date,
            @RequestParam(required = false) String status) {
        if (date != null) {
            return reservationRepository.findByReservationDateOrderByReservationTimeAsc(date);
        }
        if (status != null && !status.isBlank()) {
            return reservationRepository.findByStatusOrderByReservationDateAscReservationTimeAsc(status.toUpperCase());
        }
        return reservationRepository.findAllByOrderByReservationDateDescReservationTimeAsc();
    }

    // 2. Consultar uma reserva específica pelo ID (usado pelo cliente no site com a referência)
    @GetMapping("/{id}")
    public ResponseEntity<?> getReservationById(@PathVariable Long id) {
        Optional<Reservation> reservation = reservationRepository.findById(id);
        if (reservation.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Reserva não encontrada. Verifique o número de referência."));
        }
        return ResponseEntity.ok(reservation.get());
    }

    // 3. Criar nova reserva (submetida pelo cliente no site)
    @PostMapping
    public ResponseEntity<?> createReservation(@RequestBody Reservation newReservation) {
        try {
            // Garante que qualquer reserva criada pelo cliente entra sempre como PENDENTE
            newReservation.setId(null);
            newReservation.setStatus("PENDENTE");

            Reservation saved = reservationRepository.save(newReservation);
            return ResponseEntity.status(HttpStatus.CREATED).body(saved);

        } catch (DataIntegrityViolationException ex) {
            // Captura violações das regras CHECK do PostgreSQL e traduz para mensagem amigável
            String message = ex.getMostSpecificCause().getMessage();
            if (message != null && message.contains("chk_reservation_party_size")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "O número de pessoas por mesa deve ser entre 1 e 16."));
            }
            if (message != null && message.contains("chk_reservation_time_window")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Horário inválido. Aceitamos reservas das 12h00 às 14h15 e das 19h00 às 21h15."));
            }
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Dados da reserva inválidos ou incompletos."));
        }
    }

    // 4. Editar dados de uma reserva existente (usado pela equipa do restaurante)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateReservation(@PathVariable Long id, @RequestBody Reservation updatedData) {
        Optional<Reservation> existingOpt = reservationRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Reserva não encontrada."));
        }

        try {
            Reservation existing = existingOpt.get();
            existing.setCustomerName(updatedData.getCustomerName());
            existing.setCustomerPhone(updatedData.getCustomerPhone());
            existing.setCustomerEmail(updatedData.getCustomerEmail());
            existing.setReservationDate(updatedData.getReservationDate());
            existing.setReservationTime(updatedData.getReservationTime());
            existing.setPartySize(updatedData.getPartySize());
            existing.setNotes(updatedData.getNotes());
            if (updatedData.getStatus() != null && !updatedData.getStatus().isBlank()) {
                existing.setStatus(updatedData.getStatus().toUpperCase());
            }

            Reservation saved = reservationRepository.save(existing);
            return ResponseEntity.ok(saved);

        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Verifique os limites de lotação (1-16 pessoas) e horário de funcionamento."));
        }
    }

    // 5. Alterar rapidamente apenas o estado (PENDENTE -> CONFIRMADA / CANCELADA)
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateReservationStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Optional<Reservation> existingOpt = reservationRepository.findById(id);
        if (existingOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("error", "Reserva não encontrada."));
        }

        String newStatus = body.get("status");
        if (newStatus == null || newStatus.isBlank()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "O novo estado é obrigatório."));
        }

        try {
            Reservation existing = existingOpt.get();
            existing.setStatus(newStatus.toUpperCase());
            Reservation saved = reservationRepository.save(existing);
            return ResponseEntity.ok(saved);
        } catch (DataIntegrityViolationException ex) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Estado inválido. Use PENDENTE, CONFIRMADA ou CANCELADA."));
        }
    }
}