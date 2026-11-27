'use client';

import React from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-stone-800 bg-stone-950 text-stone-400">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-bold text-amber-400">Restaurante 3ª Geração</h3>
          <p className="mt-2 text-sm leading-relaxed">
            Palmela, Portugal • Cozinha tradicional portuguesa com sabor caseiro.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-200">
            {t('hoursTitle')}
          </h4>
          <p className="mt-2 text-sm">{t('lunch')}</p>
          <p className="mt-1 text-sm">{t('dinner')}</p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-stone-200">
            Acesso Rápido
          </h4>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li>
              <Link href="/ementa" className="hover:text-amber-400">
                {t('navMenu')}
              </Link>
            </li>
            <li>
              <Link href="/reservas" className="hover:text-amber-400">
                {t('navReserve')}
              </Link>
            </li>
            <li>
              <Link href="/sobre" className="hover:text-amber-400">
                {t('navAbout')}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-900 py-4 text-center text-xs text-stone-500">
        © 2026 Restaurante 3ª Geração. Todos os direitos reservados.
      </div>
    </footer>
  );
}