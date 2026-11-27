'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      {/* Secção Principal (Hero) */}
      <section className="rounded-2xl border border-stone-800 bg-gradient-to-br from-stone-900 via-stone-900 to-stone-950 p-8 shadow-xl md:p-14">
        <span className="inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-400">
          {t('heroSubtitle')}
        </span>

        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-stone-100 sm:text-5xl">
          Restaurante <span className="text-amber-400">3ª Geração</span>
        </h1>

        <p className="mt-4 max-w-2xl text-base leading-relaxed text-stone-300 sm:text-lg">
          {t('heroDescription')}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/ementa"
            className="rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-stone-950 transition hover:bg-amber-400"
          >
            {t('btnViewMenu')}
          </Link>

          <Link
            href="/reservas"
            className="rounded-xl border border-stone-700 bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-100 transition hover:border-amber-400 hover:text-amber-400"
          >
            {t('btnBookTable')}
          </Link>
        </div>
      </section>

      {/* Destaques Rápidos */}
      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6">
          <h2 className="text-lg font-bold text-amber-400">{t('hoursTitle')}</h2>
          <p className="mt-2 text-sm text-stone-300">{t('lunch')}</p>
          <p className="mt-1 text-sm text-stone-300">{t('dinner')}</p>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6">
          <h2 className="text-lg font-bold text-amber-400">{t('navMenu')}</h2>
          <p className="mt-2 text-sm text-stone-300">
            Entradas, peixe fresco, carnes tradicionais, sobremesas caseiras e carta de vinhos da região.
          </p>
        </div>

        <div className="rounded-xl border border-stone-800 bg-stone-900/60 p-6">
          <h2 className="text-lg font-bold text-amber-400">{t('navReserve')}</h2>
          <p className="mt-2 text-sm text-stone-300">
            Reserve online sem precisar de criar conta e acompanhe o estado do seu pedido por referência.
          </p>
        </div>
      </section>
    </div>
  );
}