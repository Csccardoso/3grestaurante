'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import { Language } from '@/types';

const languages: { code: Language; label: string }[] = [
  { code: 'pt', label: 'PT' },
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'nl', label: 'NL' },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: t('navHome') },
    { href: '/ementa', label: t('navMenu') },
    { href: '/sobre', label: t('navAbout') },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-stone-950/90 backdrop-blur-md">
      {/* Top Bar fina (Telefone, Horário e Idiomas) */}
      <div className="border-b border-white/10 bg-black/50 text-xs text-stone-300">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+351212330000" className="flex items-center gap-1.5 hover:text-amber-400">
              <span className="text-amber-400">📞</span>
              <span>+351 212 350 152</span>
            </a>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="text-amber-400">🕒</span>
              <span>Ter–Sáb: 12h00–14h30 / 19h00–21h30 • Dom: 12h00–14h30</span>
            </span>
          </div>

          {/* Seletor de Idiomas */}
          <div className="flex items-center gap-1.5 font-semibold">
            {languages.map((lang, idx) => (
              <React.Fragment key={lang.code}>
                <button
                  onClick={() => setLanguage(lang.code)}
                  className={`transition ${
                    language === lang.code
                      ? 'text-amber-400'
                      : 'text-stone-400 hover:text-stone-100'
                  }`}
                >
                  {lang.label}
                </button>
                {idx < languages.length - 1 && <span className="text-stone-600">/</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Barra Principal */}
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          {/* Nome do Restaurante */}
          <Link href="/" className="text-2xl font-light tracking-widest text-stone-100 uppercase">
            3ª <span className="font-semibold text-amber-400">Geração</span>
          </Link>

          {/* Links Centrados Desktop */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-200 transition hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Botão CTA Contorno Dourado + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/reservas"
              className="rounded-full border-2 border-amber-400 px-5 py-2 text-xs font-bold uppercase tracking-wider text-stone-100 transition hover:bg-amber-400 hover:text-stone-950"
            >
              {t('btnBookTable')}
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="rounded-lg border border-stone-700 p-2 text-stone-200 hover:bg-stone-900 md:hidden"
              aria-label="Abrir menu"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <nav className="border-b border-stone-800 bg-stone-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-md px-2 py-1.5 text-sm font-medium text-stone-200 hover:bg-stone-900 hover:text-amber-400"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}