'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, t } = useLanguage();

  const welcomePrefix = {
    pt: 'Bem-vindo à',
    en: 'Welcome to',
    fr: 'Bienvenue chez',
    nl: 'Welkom bij',
  }[language];

  return (
    <div>
      {/* Hero Full-Screen estilo Restaurantly */}
      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden">
        {/* Imagem de fundo (coloca uma foto real em frontend/public/images/hero-bg.jpg) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/hero-bg.jpg'), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')",
          }}
        />
        {/* Camada escura para contraste perfeito do texto */}
        <div className="absolute inset-0 bg-black/65" />

        {/* Conteúdo sobreposto */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-extrabold leading-tight text-white sm:text-6xl">
              {welcomePrefix}{' '}
              <span className="block text-amber-400">3ª Geração</span>
            </h1>

            <p className="mt-4 text-lg font-light text-stone-200 sm:text-xl">
              {t('heroDescription')}
            </p>

            {/* Botões arredondados com contorno dourado */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/ementa"
                className="rounded-full border-2 border-amber-400 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-amber-400 hover:text-stone-950"
              >
                {t('btnViewMenu')}
              </Link>

              <Link
                href="/reservas"
                className="rounded-full border-2 border-amber-400 px-7 py-3 text-xs font-bold uppercase tracking-widest text-white transition hover:bg-amber-400 hover:text-stone-950"
              >
                {t('btnBookTable')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Secção de Destaques abaixo do Hero */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">01</span>
            <h2 className="mt-2 text-lg font-bold text-stone-100">{t('hoursTitle')}</h2>
            <p className="mt-2 text-sm text-stone-300">{t('lunch')}</p>
            <p className="mt-1 text-sm text-stone-300">{t('dinner')} (exceto Dom.)</p>
            <p className="mt-1 text-xs text-stone-400">Encerrado à Segunda-feira</p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">02</span>
            <h2 className="mt-2 text-lg font-bold text-stone-100">{t('navMenu')}</h2>
            <p className="mt-2 text-sm text-stone-300">
              Cozinha tradicional portuguesa em Palmela, peixe fresco, carnes selecionadas e vinhos da região.
            </p>
          </div>

          <div className="rounded-xl border border-stone-800 bg-stone-900/70 p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">03</span>
            <h2 className="mt-2 text-lg font-bold text-stone-100">{t('navReserve')}</h2>
            <p className="mt-2 text-sm text-stone-300">
              Escolha o dia e hora e acompanhe a sua reserva online.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}