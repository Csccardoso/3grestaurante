export type Language = 'pt' | 'en' | 'fr' | 'nl';

export interface MenuItem {
  id: number;
  namePt: string;
  nameEn: string | null;
  nameFr: string | null;
  nameNl: string | null;
  descriptionPt: string | null;
  descriptionEn: string | null;
  descriptionFr: string | null;
  descriptionNl: string | null;
  section: 'Ementa' | 'Vinhos' | string;
  category: string;
  pricePrimary: number | null;
  labelPrimary: string | null;
  priceSecondary: number | null;
  labelSecondary: string | null;
  priceTertiary: number | null;
  labelTertiary: string | null;
  marketPrice: boolean;
  allergens: string | null;
  available: boolean;
  imageUrl: string | null;
}

export type ReservationStatus = 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA';

export interface Reservation {
  id?: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  reservationDate: string; // YYYY-MM-DD
  reservationTime: string; // HH:mm:ss
  partySize: number;
  status?: ReservationStatus;
  notes?: string;
  createdAt?: string;
}