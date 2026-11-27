'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Reservation, ReservationStatus } from '@/types';
import MiniCalendar from '@/components/MiniCalendar';

const labels = {
  pt: {
    title: 'Reservas',
    subtitle: 'Reserve a sua mesa online ou consulte o estado de uma reserva existente.',
    tabNew: 'Nova Reserva',
    tabCheck: 'Consultar / Cancelar Reserva',
    closedNote: 'Encerrado às segundas-feiras todo o dia e aos domingos ao jantar.',
    dateLabel: 'Data da Reserva',
    mondayError: 'O restaurante encontra-se encerrado à segunda-feira. Por favor escolha outro dia.',
    lunchTitle: 'Almoço (12h00 – 14h30)',
    dinnerTitle: 'Jantar (19h00 – 21h30)',
    sundayDinnerClosed: 'Encerrado ao jantar aos domingos.',
    selectTimeFirst: 'Selecione primeiro uma data válida para ver os horários disponíveis.',
    timeLabel: 'Hora Pretendida',
    partyLabel: 'Número de Pessoas',
    person: 'pessoa',
    people: 'pessoas',
    groupMenuWarning: 'Para grupos a partir de 10 pessoas, é necessário escolher os pratos previamente (pelo menos 50% do grupo). Pode indicar as escolhas nas observações ou entraremos em contacto consigo.',
    nameLabel: 'Nome',
    namePlaceholder: 'Ex: Joana Silva',
    phoneLabel: 'Telemóvel / Telefone',
    phonePlaceholder: 'Ex: 912 345 678',
    emailLabel: 'Email (opcional, para receber confirmação)',
    emailPlaceholder: 'Ex: joana@email.com',
    notesLabel: 'Observações / Pedidos Especiais (opcional)',
    notesPlaceholder: 'Alergias, quantidade de crianças no grupo, etc...',
    submitBtn: 'Confirmar Pedido de Reserva',
    submitting: 'A enviar reserva...',
    successTitle: 'Pedido de Reserva Registado!',
    successDesc: 'Guarde o seu código de referência para consultar ou acompanhar o estado da reserva:',
    refLabel: 'Código de Referência',
    checkBookingBtn: 'Ver Estado da Reserva',
    newBookingBtn: 'Fazer Nova Reserva',
    errorGeneric: 'Não foi possível registar a reserva. Verifique os dados ou se o servidor está ativo.',
    missingFields: 'Por favor preencha a data, hora, nome e telefone.',
    // Consulta
    checkSubtitle: 'Introduza o código de referência da sua reserva para ver o estado ou cancelar.',
    inputPlaceholder: 'Código de referência (ex: 1)...',
    searchBtn: 'Procurar',
    searching: 'A procurar...',
    notFound: 'Nenhuma reserva encontrada com esse código. Verifique o número e tente novamente.',
    errorServer: 'Erro ao contactar o servidor.',
    statusMap: {
      PENDENTE: 'Pendente de Confirmação',
      CONFIRMADA: 'Confirmada',
      CANCELADA: 'Cancelada',
    },
    client: 'Cliente',
    date: 'Data e Hora',
    party: 'Pessoas',
    phone: 'Contacto',
    notes: 'Observações',
    cancelBtn: 'Cancelar Reserva',
    cancelling: 'A cancelar...',
    cancelConfirm: 'Tem a certeza que pretende cancelar esta reserva?',
  },
  en: {
    title: 'Reservations',
    subtitle: 'Book your table online or check the status of an existing reservation.',
    tabNew: 'New Booking',
    tabCheck: 'Check / Cancel Booking',
    closedNote: 'Closed all day on Mondays and on Sunday evenings.',
    dateLabel: 'Reservation Date',
    mondayError: 'The restaurant is closed on Mondays. Please select another day.',
    lunchTitle: 'Lunch (12:00 PM – 2:30 PM)',
    dinnerTitle: 'Dinner (7:00 PM – 9:30 PM)',
    sundayDinnerClosed: 'Closed for dinner on Sundays.',
    selectTimeFirst: 'Select a valid date first to view available time slots.',
    timeLabel: 'Preferred Time',
    partyLabel: 'Party Size',
    person: 'guest',
    people: 'guests',
    groupMenuWarning: 'For groups of 10 or more people, dishes must be chosen in advance (at least 50% of the group). You may list your choices in the notes or we will contact you.',
    nameLabel: 'Full Name',
    namePlaceholder: 'E.g., John Smith',
    phoneLabel: 'Phone Number',
    phonePlaceholder: 'E.g., +351 912 345 678',
    emailLabel: 'Email (optional, for confirmation)',
    emailPlaceholder: 'E.g., john@email.com',
    notesLabel: 'Notes / Special Requests (optional)',
    notesPlaceholder: 'Allergies, number of children in the group, etc...',
    submitBtn: 'Submit Reservation',
    submitting: 'Submitting reservation...',
    successTitle: 'Reservation Request Received!',
    successDesc: 'Save your reference code to check or track your booking status:',
    refLabel: 'Reference Code',
    checkBookingBtn: 'Check Booking Status',
    newBookingBtn: 'Make Another Booking',
    errorGeneric: 'Could not submit reservation. Please check your details or if the server is running.',
    missingFields: 'Please fill in date, time, name, and phone number.',
    checkSubtitle: 'Enter your booking reference code to view its status or cancel.',
    inputPlaceholder: 'Reference code (e.g., 1)...',
    searchBtn: 'Search',
    searching: 'Searching...',
    notFound: 'No booking found with that code. Please check the number and try again.',
    errorServer: 'Error contacting server. Please check if the backend is running.',
    statusMap: {
      PENDENTE: 'Pending Confirmation',
      CONFIRMADA: 'Confirmed',
      CANCELADA: 'Cancelled',
    },
    client: 'Guest',
    date: 'Date & Time',
    party: 'Guests',
    phone: 'Phone',
    notes: 'Notes',
    cancelBtn: 'Cancel Booking',
    cancelling: 'Cancelling...',
    cancelConfirm: 'Are you sure you want to cancel this reservation?',
  },
  fr: {
    title: 'Réservations',
    subtitle: 'Réservez votre table en ligne ou consultez le statut d’une réservation existante.',
    tabNew: 'Nouvelle Réservation',
    tabCheck: 'Consulter / Annuler',
    closedNote: 'Fermé toute la journée le lundi et le dimanche soir.',
    dateLabel: 'Date de Réservation',
    mondayError: 'Le restaurant est fermé le lundi. Veuillez choisir un autre jour.',
    lunchTitle: 'Déjeuner (12h00 – 14h30)',
    dinnerTitle: 'Dîner (19h00 – 21h30)',
    sundayDinnerClosed: 'Fermé le dimanche soir.',
    selectTimeFirst: 'Sélectionnez d’abord une date valide pour voir les créneaux disponibles.',
    timeLabel: 'Heure Souhaitée',
    partyLabel: 'Nombre de Personnes',
    person: 'personne',
    people: 'personnes',
    groupMenuWarning: 'Pour les groupes à partir de 10 personnes, les plats doivent être choisis à l’avance (au moins 50 % du groupe). Vous pouvez indiquer vos choix dans les remarques ou nous vous contacterons.',
    nameLabel: 'Nom Complet',
    namePlaceholder: 'Ex : Jean Dupont',
    phoneLabel: 'Téléphone',
    phonePlaceholder: 'Ex : +351 912 345 678',
    emailLabel: 'E-mail (facultatif, pour confirmation)',
    emailPlaceholder: 'Ex : jean@email.com',
    notesLabel: 'Remarques / Demandes Spéciales (facultatif)',
   notesPlaceholder: 'Allergies, nombre d’enfants dans le groupe, etc...',
    submitBtn: 'Confirmer la Réservation',
    submitting: 'Envoi en cours...',
    successTitle: 'Demande de Réservation Enregistrée !',
    successDesc: 'Conservez votre code de référence pour consulter le statut de votre réservation :',
    refLabel: 'Code de Référence',
    checkBookingBtn: 'Voir le Statut',
    newBookingBtn: 'Nouvelle Réservation',
    errorGeneric: 'Impossible d’enregistrer la réservation. Vérifiez vos informations ou le serveur.',
    missingFields: 'Veuillez renseigner la date, l’heure, le nom et le téléphone.',
    checkSubtitle: 'Entrez votre code de référence pour voir le statut ou annuler.',
    inputPlaceholder: 'Code de référence (ex : 1)...',
    searchBtn: 'Rechercher',
    searching: 'Recherche...',
    notFound: 'Aucune réservation trouvée avec ce code.',
    errorServer: 'Erreur de connexion au serveur.',
    statusMap: {
      PENDENTE: 'En attente de confirmation',
      CONFIRMADA: 'Confirmée',
      CANCELADA: 'Annulée',
    },
    client: 'Client',
    date: 'Date et Heure',
    party: 'Personnes',
    phone: 'Téléphone',
    notes: 'Remarques',
    cancelBtn: 'Annuler la Réservation',
    cancelling: 'Annulation...',
    cancelConfirm: 'Êtes-vous sûr de vouloir annuler cette réservation ?',
  },
  nl: {
    title: 'Reserveringen',
    subtitle: 'Reserveer online uw tafel of bekijk de status van een bestaande reservering.',
    tabNew: 'Nieuwe Reservering',
    tabCheck: 'Bekijken / Annuleren',
    closedNote: 'Gesloten op maandag de hele dag en op zondagavond.',
    dateLabel: 'Reserveringsdatum',
    mondayError: 'Het restaurant is op maandag gesloten. Kies alstublieft een andere dag.',
    lunchTitle: 'Lunch (12:00 – 14:30)',
    dinnerTitle: 'Diner (19:00 – 21:30)',
    sundayDinnerClosed: 'Op zondagavond gesloten.',
    selectTimeFirst: 'Selecteer eerst een geldige datum om beschikbare tijden te zien.',
    timeLabel: 'Gewenste Tijd',
    partyLabel: 'Aantal Personen',
    person: 'persoon',
    people: 'personen',
    groupMenuWarning: 'Voor groepen vanaf 10 personen dienen de gerechten vooraf gekozen te worden (minstens 50% van de groep). U kunt uw keuzes bij de opmerkingen vermelden of wij nemen contact met u op.',
    nameLabel: 'Volledige Naam',
    namePlaceholder: 'Bijv. Jan de Vries',
    phoneLabel: 'Telefoonnummer',
    phonePlaceholder: 'Bijv. +351 912 345 678',
    emailLabel: 'E-mail (optioneel, voor bevestiging)',
    emailPlaceholder: 'Bijv. jan@email.com',
    notesLabel: 'Opmerkingen / Speciale Wensen (optioneel)',
    notesPlaceholder: 'Allergieën, aantal kinderen in de groep, enz...',
    submitBtn: 'Reservering Bevestigen',
    submitting: 'Reservering versturen...',
    successTitle: 'Reserveringsaanvraag Ontvangen!',
    successDesc: 'Bewaar uw referentiecode om de status van uw reservering te bekijken:',
    refLabel: 'Referentiecode',
    checkBookingBtn: 'Status Bekijken',
    newBookingBtn: 'Nieuwe Reservering',
    errorGeneric: 'Kan reservering niet opslaan. Controleer uw gegevens of of de server actief is.',
    missingFields: 'Vul alstublieft datum, tijd, naam en telefoonnummer in.',
    checkSubtitle: 'Voer uw referentiecode in om de status te bekijken of te annuleren.',
    inputPlaceholder: 'Referentiecode (bijv. 1)...',
    searchBtn: 'Zoeken',
    searching: 'Zoeken...',
    notFound: 'Geen reservering gevonden met deze code.',
    errorServer: 'Fout bij verbinden met de server.',
    statusMap: {
      PENDENTE: 'In afwachting van bevestiging',
      CONFIRMADA: 'Bevestigd',
      CANCELADA: 'Geannuleerd',
    },
    client: 'Gast',
    date: 'Datum & Tijd',
    party: 'Personen',
    phone: 'Telefoon',
    notes: 'Opmerkingen',
    cancelBtn: 'Reservering Annuleren',
    cancelling: 'Annuleren...',
    cancelConfirm: 'Weet u zeker dat u deze reservering wilt annuleren?',
  },
};

const LUNCH_SLOTS = [
  '12:00', '12:15', '12:30', '12:45',
  '13:00', '13:15', '13:30', '13:45',
  '14:00', '14:15',
];

const DINNER_SLOTS = [
  '19:00', '19:15', '19:30', '19:45',
  '20:00', '20:15', '20:30', '20:45',
  '21:00', '21:15',
];

export default function ReservasPage() {
  const { language } = useLanguage();
  const text = labels[language];

  const [activeTab, setActiveTab] = useState<'new' | 'check'>('new');

  // Estados da Nova Reserva
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [partySize, setPartySize] = useState(2);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [createdReservation, setCreatedReservation] = useState<Reservation | null>(null);

  // Estados da Consulta / Cancelamento
  const [searchCode, setSearchCode] = useState('');
  const [foundReservation, setFoundReservation] = useState<Reservation | null>(null);
  const [searching, setSearching] = useState(false);
  const [cancelling, setCancelling] = useState(false);
  const [searchError, setSearchError] = useState('');

  const getDayOfWeek = (dateStr: string): number | null => {
    if (!dateStr) return null;
    const [year, month, day] = dateStr.split('-').map(Number);
    return new Date(year, month - 1, day).getDay();
  };

  const dayOfWeek = getDayOfWeek(reservationDate);
  const isMonday = dayOfWeek === 1;
  const isSunday = dayOfWeek === 0;

  const handleDateChange = (newDate: string) => {
    setReservationDate(newDate);
    setReservationTime('');
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!reservationDate || isMonday || !reservationTime || !customerName.trim() || !customerPhone.trim()) {
      setErrorMsg(text.missingFields);
      return;
    }

    setSubmitting(true);

    try {
      const payload: Reservation = {
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        reservationDate,
        reservationTime: `${reservationTime}:00`,
        partySize,
        notes: notes.trim() || undefined,
      };

      const response = await fetch('http://localhost:8080/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar reserva');
      }

      const saved: Reservation = await response.json();
      setCreatedReservation(saved);
    } catch {
      setErrorMsg(text.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setCreatedReservation(null);
    setReservationDate('');
    setReservationTime('');
    setPartySize(2);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
    setErrorMsg('');
  };

  const goToCheckTabWithCreated = () => {
    if (createdReservation?.id) {
      setSearchCode(String(createdReservation.id));
      setFoundReservation(createdReservation);
      setSearchError('');
    }
    setActiveTab('check');
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = searchCode.replace('#', '').trim();
    if (!cleanId) return;

    setSearching(true);
    setSearchError('');
    setFoundReservation(null);

    try {
      const response = await fetch(`http://localhost:8080/api/reservations/${cleanId}`);
      if (response.status === 404) {
        setSearchError(text.notFound);
        return;
      }
      if (!response.ok) {
        throw new Error('Erro na API');
      }
      const data: Reservation = await response.json();
      setFoundReservation(data);
    } catch {
      setSearchError(text.errorServer);
    } finally {
      setSearching(false);
    }
  };

  const handleCancel = async () => {
    if (!foundReservation?.id) return;
    if (!window.confirm(text.cancelConfirm)) return;

    setCancelling(true);
    try {
      const response = await fetch(
        `http://localhost:8080/api/reservations/${foundReservation.id}/cancel`,
        { method: 'PATCH' }
      );
      if (response.ok) {
        const updated: Reservation = await response.json();
        setFoundReservation(updated);
      } else {
        setSearchError(text.errorServer);
      }
    } catch {
      setSearchError(text.errorServer);
    } finally {
      setCancelling(false);
    }
  };

  const getStatusBadge = (status?: ReservationStatus) => {
    const current = status || 'PENDENTE';
    const colors: Record<ReservationStatus, string> = {
      PENDENTE: 'border-amber-500/40 bg-amber-500/15 text-amber-300',
      CONFIRMADA: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-300',
      CANCELADA: 'border-red-500/40 bg-red-500/15 text-red-300',
    };
    return (
      <span className={`rounded-full border px-3 py-1 text-xs font-bold ${colors[current]}`}>
        {text.statusMap[current]}
      </span>
    );
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      {/* Cabeçalho + Separadores (Tabs) */}
      <div className="border-b border-stone-800 pb-6">
        <h1 className="text-3xl font-extrabold text-amber-400 sm:text-4xl">{text.title}</h1>
        <p className="mt-2 text-stone-400">{text.subtitle}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('new')}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'new'
                ? 'bg-amber-500 text-stone-950'
                : 'border border-stone-700 bg-stone-900 text-stone-300 hover:border-amber-400'
            }`}
          >
            {text.tabNew}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('check')}
            className={`rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition ${
              activeTab === 'check'
                ? 'bg-amber-500 text-stone-950'
                : 'border border-stone-700 bg-stone-900 text-stone-300 hover:border-amber-400'
            }`}
          >
            {text.tabCheck}
          </button>
        </div>
      </div>

      {/* SEPARADOR 1: NOVA RESERVA */}
      {activeTab === 'new' && (
        <>
          <p className="mt-6 inline-block rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
            🕒 {text.closedNote}
          </p>

          {createdReservation ? (
            <div className="mt-6 rounded-2xl border border-emerald-700/50 bg-emerald-950/20 p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-400">
                ✓
              </div>
              <h2 className="mt-4 text-2xl font-bold text-stone-100">{text.successTitle}</h2>
              <p className="mt-2 text-sm text-stone-300">{text.successDesc}</p>

              {createdReservation.id && (
                <div className="mx-auto mt-6 max-w-xs rounded-xl border border-amber-400/40 bg-stone-900 p-4">
                  <span className="text-xs uppercase tracking-widest text-stone-400">
                    {text.refLabel}
                  </span>
                  <p className="mt-1 text-3xl font-extrabold text-amber-400">
                    #{createdReservation.id}
                  </p>
                </div>
              )}

              <div className="mt-6 text-sm text-stone-300">
                <p>
                  <strong>{createdReservation.customerName}</strong> • {createdReservation.partySize}{' '}
                  {createdReservation.partySize === 1 ? text.person : text.people}
                </p>
                <p className="mt-1 text-stone-400">
                  {createdReservation.reservationDate} •{' '}
                  {createdReservation.reservationTime.slice(0, 5)}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <button
                  type="button"
                  onClick={goToCheckTabWithCreated}
                  className="rounded-full bg-amber-500 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-400"
                >
                  {text.checkBookingBtn}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-full border border-stone-700 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-stone-200 transition hover:border-amber-400"
                >
                  {text.newBookingBtn}
                </button>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mt-6 space-y-6 rounded-2xl border border-stone-800 bg-stone-900/60 p-6 sm:p-8"
            >
              {errorMsg && (
                <div className="rounded-xl border border-red-800/60 bg-red-950/40 p-4 text-sm text-red-300">
                  {errorMsg}
                </div>
              )}

           {/* Data e Número de Pessoas */}
<div className="grid items-start gap-6 sm:grid-cols-2">
  <div>
    <label className="block text-sm font-semibold text-stone-200">
      {text.dateLabel} *
    </label>
    <MiniCalendar
      selectedDate={reservationDate}
      onSelectDate={handleDateChange}
      language={language}
    />
  </div>

  <div>
    <label className="block text-sm font-semibold text-stone-200">
      {text.partyLabel} *
    </label>
    <div className="mt-2 flex items-center justify-between rounded-xl border border-stone-700 bg-stone-950 px-3 py-2">
      <button
        type="button"
        onClick={() => setPartySize((prev) => Math.max(1, prev - 1))}
        disabled={partySize <= 1}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700 bg-stone-900 text-lg font-bold text-stone-100 transition hover:border-amber-400 disabled:opacity-30"
      >
        −
      </button>

      <span className="text-sm font-bold text-stone-100">
        {partySize} {partySize === 1 ? text.person : text.people}
      </span>

      <button
        type="button"
        onClick={() => setPartySize((prev) => Math.min(16, prev + 1))}
        disabled={partySize >= 16}
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-stone-700 bg-stone-900 text-lg font-bold text-stone-100 transition hover:border-amber-400 disabled:opacity-30"
      >
        +
      </button>
    </div>
    {partySize >= 10 && (
      <div className="mt-3 rounded-xl border border-amber-500/40 bg-amber-500/10 p-3 text-xs leading-relaxed text-amber-200">
        ⚠️ {text.groupMenuWarning}
      </div>
    )}
  </div>
</div>

              {/* Seleção de Hora em intervalos de 15 min */}
              <div>
                <label className="block text-sm font-semibold text-stone-200">
                  {text.timeLabel} *
                </label>

                {!reservationDate && (
                  <p className="mt-2 text-sm text-stone-400">{text.selectTimeFirst}</p>
                )}

                {isMonday && (
                  <div className="mt-2 rounded-xl border border-amber-700/40 bg-amber-950/30 p-4 text-sm text-amber-300">
                    {text.mondayError}
                  </div>
                )}

                {reservationDate && !isMonday && (
                  <div className="mt-3 space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        {text.lunchTitle}
                      </p>
                      <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
                        {LUNCH_SLOTS.map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setReservationTime(slot)}
                            className={`rounded-lg py-2 text-sm font-semibold transition ${
                              reservationTime === slot
                                ? 'bg-amber-500 text-stone-950'
                                : 'border border-stone-700 bg-stone-950 text-stone-200 hover:border-amber-400'
                            }`}
                          >
                            {slot}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">
                        {text.dinnerTitle}
                      </p>
                      {isSunday ? (
                        <p className="mt-2 rounded-lg border border-stone-800 bg-stone-950/60 px-4 py-2.5 text-xs text-stone-400">
                          {text.sundayDinnerClosed}
                        </p>
                      ) : (
                        <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-5">
                          {DINNER_SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setReservationTime(slot)}
                              className={`rounded-lg py-2 text-sm font-semibold transition ${
                                reservationTime === slot
                                  ? 'bg-amber-500 text-stone-950'
                                  : 'border border-stone-700 bg-stone-950 text-stone-200 hover:border-amber-400'
                              }`}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Dados do Cliente */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-stone-200">
                    {text.nameLabel} *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder={text.namePlaceholder}
                    required
                    className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-200">
                    {text.phoneLabel} *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder={text.phonePlaceholder}
                    required
                    className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-200">
                  {text.emailLabel}
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder={text.emailPlaceholder}
                  className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-stone-200">
                  {text.notesLabel}
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={text.notesPlaceholder}
                  className="mt-2 w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || isMonday || !reservationTime}
                className="w-full rounded-full bg-amber-500 py-3.5 text-sm font-bold uppercase tracking-wider text-stone-950 transition hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting ? text.submitting : text.submitBtn}
              </button>
            </form>
          )}
        </>
      )}

      {/* SEPARADOR 2: CONSULTAR / CANCELAR RESERVA */}
      {activeTab === 'check' && (
        <div className="mt-8">
          <p className="text-sm text-stone-400">{text.checkSubtitle}</p>

          <form onSubmit={handleSearch} className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder={text.inputPlaceholder}
              className="flex-1 rounded-xl border border-stone-700 bg-stone-900 px-4 py-3 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={searching}
              className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-400 disabled:opacity-50"
            >
              {searching ? text.searching : text.searchBtn}
            </button>
          </form>

          {searchError && (
            <div className="mt-6 rounded-xl border border-red-800/60 bg-red-950/30 p-4 text-sm text-red-300">
              {searchError}
            </div>
          )}

          {foundReservation && (
            <div className="mt-8 rounded-2xl border border-stone-800 bg-stone-900/70 p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-800 pb-4">
                <div>
                  <span className="text-xs uppercase tracking-widest text-stone-400">Reserva</span>
                  <h2 className="text-2xl font-extrabold text-amber-400">
                    #{foundReservation.id}
                  </h2>
                </div>
                {getStatusBadge(foundReservation.status)}
              </div>

              <dl className="mt-6 grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-stone-400">{text.client}</dt>
                  <dd className="mt-1 font-semibold text-stone-100">
                    {foundReservation.customerName}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">{text.phone}</dt>
                  <dd className="mt-1 font-semibold text-stone-100">
                    {foundReservation.customerPhone}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">{text.date}</dt>
                  <dd className="mt-1 font-semibold text-stone-100">
                    {foundReservation.reservationDate} •{' '}
                    {foundReservation.reservationTime.slice(0, 5)}
                  </dd>
                </div>
                <div>
                  <dt className="text-stone-400">{text.party}</dt>
                  <dd className="mt-1 font-semibold text-stone-100">
                    {foundReservation.partySize}
                  </dd>
                </div>
              </dl>

              {foundReservation.notes && (
                <div className="mt-4 border-t border-stone-800 pt-4 text-sm">
                  <span className="text-stone-400">{text.notes}: </span>
                  <span className="text-stone-200">{foundReservation.notes}</span>
                </div>
              )}

              {foundReservation.status !== 'CANCELADA' && (
                <div className="mt-6 border-t border-stone-800 pt-5 text-right">
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={cancelling}
                    className="rounded-lg border border-red-800/70 px-4 py-2 text-xs font-semibold text-red-300 transition hover:bg-red-950/50 disabled:opacity-50"
                  >
                    {cancelling ? text.cancelling : text.cancelBtn}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}