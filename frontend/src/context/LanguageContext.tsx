'use client';

import React, { createContext, useContext, useState } from 'react';
import { Language } from '@/types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  pt: {
    navHome: 'Início',
    navMenu: 'Ementa & Vinhos',
    navReserve: 'Reservar Mesa',
    navCheck: 'Consultar Reserva',
    navAbout: 'Sobre & Contactos',
    heroSubtitle: 'Tradição à Mesa em Palmela',
    heroDescription: 'Sabores autênticos da cozinha tradicional portuguesa, passados de geração em geração com produtos frescos e hospitalidade genuína.',
    btnViewMenu: 'Ver Ementa',
    btnBookTable: 'Reservar Mesa',
    hoursTitle: 'Horário de Funcionamento',
    lunch: 'Almoço: 12h00 – 14h30',
    dinner: 'Jantar: 19h00 – 21h30',
  },
  en: {
    navHome: 'Home',
    navMenu: 'Menu & Wines',
    navReserve: 'Book a Table',
    navCheck: 'Check Booking',
    navAbout: 'About & Contact',
    heroSubtitle: 'Tradition at the Table in Palmela',
    heroDescription: 'Authentic flavors of traditional Portuguese cuisine, passed down through generations with fresh ingredients and genuine hospitality.',
    btnViewMenu: 'View Menu',
    btnBookTable: 'Book a Table',
    hoursTitle: 'Opening Hours',
    lunch: 'Lunch: 12:00 PM – 2:30 PM',
    dinner: 'Dinner: 7:00 PM – 9:30 PM',
  },
  fr: {
    navHome: 'Accueil',
    navMenu: 'Carte & Vins',
    navReserve: 'Réserver une Table',
    navCheck: 'Ma Réservation',
    navAbout: 'À Propos & Contact',
    heroSubtitle: 'La Tradition à Table à Palmela',
    heroDescription: 'Saveurs authentiques de la cuisine traditionnelle portugaise, transmises de génération en génération avec des produits frais.',
    btnViewMenu: 'Voir la Carte',
    btnBookTable: 'Réserver',
    hoursTitle: 'Horaires d’Ouverture',
    lunch: 'Déjeuner : 12h00 – 14h30',
    dinner: 'Dîner : 19h00 – 21h30',
  },
  nl: {
    navHome: 'Home',
    navMenu: 'Menu & Wijnen',
    navReserve: 'Tafel Reserveren',
    navCheck: 'Reservering Bekijken',
    navAbout: 'Over Ons & Contact',
    heroSubtitle: 'Traditie aan Tafel in Palmela',
    heroDescription: 'Authentieke smaken van de traditionele Portugese keuken, van generatie op generatie doorgegeven met verse ingrediënten.',
    btnViewMenu: 'Bekijk Menu',
    btnBookTable: 'Tafel Reserveren',
    hoursTitle: 'Openingstijden',
    lunch: 'Lunch: 12:00 – 14:30',
    dinner: 'Diner: 19:00 – 21:30',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt');

  const t = (key: string): string => {
    return translations[language][key] || translations['pt'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}