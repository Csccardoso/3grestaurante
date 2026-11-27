'use client';

import React, { useEffect, useState } from 'react';
import { Language } from '@/types';

interface MiniCalendarProps {
  selectedDate: string;
  onSelectDate: (dateStr: string) => void;
  language: Language;
}

const localeMap: Record<Language, string> = {
  pt: 'pt-PT',
  en: 'en-GB',
  fr: 'fr-FR',
  nl: 'nl-NL',
};

const weekDaysMap: Record<Language, string[]> = {
  pt: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  fr: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  nl: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
};

export default function MiniCalendar({ selectedDate, onSelectDate, language }: MiniCalendarProps) {
  const [today, setToday] = useState<Date | null>(null);
  const [viewYear, setViewYear] = useState<number>(2026);
  const [viewMonth, setViewMonth] = useState<number>(0);

  useEffect(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    setToday(now);
    setViewYear(now.getFullYear());
    setViewMonth(now.getMonth());
  }, []);

  if (!today) {
    return (
      <div className="mt-2 h-72 animate-pulse rounded-xl border border-stone-700 bg-stone-950 p-4" />
    );
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const startOffset = (firstDayOfMonth.getDay() + 6) % 7;
  const isCurrentMonth = viewYear === today.getFullYear() && viewMonth === today.getMonth();

  const handlePrevMonth = () => {
    if (isCurrentMonth) return;
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const monthLabel = new Intl.DateTimeFormat(localeMap[language], {
    month: 'long',
    year: 'numeric',
  }).format(new Date(viewYear, viewMonth, 1));

  const formatDateStr = (year: number, month: number, day: number) => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  return (
    <div className="mt-2 rounded-xl border border-stone-700 bg-stone-950 p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={handlePrevMonth}
          disabled={isCurrentMonth}
          className="rounded-lg border border-stone-800 px-2.5 py-1 text-sm text-stone-200 transition hover:border-amber-400 disabled:opacity-25"
        >
          ‹
        </button>
        <span className="text-sm font-bold capitalize text-stone-100">{monthLabel}</span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="rounded-lg border border-stone-800 px-2.5 py-1 text-sm text-stone-200 transition hover:border-amber-400"
        >
          ›
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase text-stone-500">
        {weekDaysMap[language].map((day) => (
          <div key={day} className="py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: startOffset }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const cellDate = new Date(viewYear, viewMonth, day);
          const dateStr = formatDateStr(viewYear, viewMonth, day);

          const isPast = cellDate < today;
          const isMonday = cellDate.getDay() === 1;
          const isDisabled = isPast || isMonday;
          const isSelected = selectedDate === dateStr;

          return (
            <button
              key={dateStr}
              type="button"
              disabled={isDisabled}
              onClick={() => onSelectDate(dateStr)}
              className={`rounded-lg py-2 text-xs font-semibold transition ${
                isSelected
                  ? 'bg-amber-500 text-stone-950'
                  : isDisabled
                  ? 'cursor-not-allowed text-stone-700 line-through'
                  : 'text-stone-200 hover:bg-stone-800 hover:text-amber-400'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}