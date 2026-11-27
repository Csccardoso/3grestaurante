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
    { href: '/reservas', label: t('navReserve') },
    { href: '/consultar', label: t('navCheck') },
    { href: '/sobre', label: t('navAbout') },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-stone-800 bg-stone-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logótipo / Nome */}
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold tracking-wide text-amber-400">
            3ª Geração
          </span>
          <span className="text-[11px] uppercase tracking-widest text-stone-400">
            Restaurante • Palmela
          </span>
        </Link>

        {/* Navegação Desktop */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-stone-300 transition hover:text-amber-400"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Seletor de Idiomas + Botão Mobile */}
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-lg border border-stone-800 bg-stone-900 p-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`rounded-md px-2 py-1 text-xs font-semibold transition ${
                  language === lang.code
                    ? 'bg-amber-500 text-stone-950'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-stone-800 p-2 text-stone-300 hover:bg-stone-900 md:hidden"
            aria-label="Abrir menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {mobileMenuOpen && (
        <nav className="border-t border-stone-800 bg-stone-950 px-4 py-3 md:hidden">
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