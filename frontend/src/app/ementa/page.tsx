'use client';

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { MenuItem } from '@/types';

const labels = {
  pt: {
    title: 'Ementa & Carta de Vinhos',
    subtitle: 'Pratos tradicionais confecionados na hora e vinhos selecionados da região.',
    all: 'Tudo',
    food: 'Ementa',
    wines: 'Carta de Vinhos',
    searchPlaceholder: 'Pesquisar prato, bebida ou ingrediente...',
    loading: 'A carregar a ementa...',
    error: 'Não foi possível carregar a ementa. Verifique se o servidor backend está ligado.',
    empty: 'Nenhum item encontrado com essa pesquisa.',
    marketPrice: 'P.V.',
    allergens: 'Alergénios',
  },
  en: {
    title: 'Menu & Wine List',
    subtitle: 'Traditional dishes freshly prepared and selected regional wines.',
    all: 'All',
    food: 'Menu',
    wines: 'Wine List',
    searchPlaceholder: 'Search dish, wine or ingredient...',
    loading: 'Loading menu...',
    error: 'Could not load the menu. Please check if the backend server is running.',
    empty: 'No items match your search.',
    marketPrice: 'P.V.',
    allergens: 'Allergens',
  },
  fr: {
    title: 'Carte & Vins',
    subtitle: 'Plats traditionnels préparés à la minute et vins sélectionnés de la région.',
    all: 'Tout',
    food: 'La Carte',
    wines: 'Carte des Vins',
    searchPlaceholder: 'Rechercher un plat, un vin ou un ingrédient...',
    loading: 'Chargement de la carte...',
    error: 'Impossible de charger la carte. Vérifiez que le serveur backend est démarré.',
    empty: 'Aucun élément trouvé pour cette recherche.',
    marketPrice: 'P.V.',
    allergens: 'Allergènes',
  },
  nl: {
    title: 'Menu & Wijnkaart',
    subtitle: 'Traditionele gerechten vers bereid en geselecteerde regionale wijnen.',
    all: 'Alles',
    food: 'Menu',
    wines: 'Wijnkaart',
    searchPlaceholder: 'Zoek gerecht, wijn of ingrediënt...',
    loading: 'Menu laden...',
    error: 'Kan het menu niet laden. Controleer of de backend-server actief is.',
    empty: 'Geen items gevonden voor deze zoekopdracht.',
    marketPrice: 'P.V.',
    allergens: 'Allergenen',
  },
};

export default function EmentaPage() {
  const { language } = useLanguage();
  const text = labels[language];

  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedSection, setSelectedSection] = useState<'ALL' | 'Ementa' | 'Vinhos'>('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchMenu() {
      try {
        const response = await fetch('http://localhost:8080/api/menu');
        if (!response.ok) throw new Error('Erro na API');
        const data: MenuItem[] = await response.json();
        setItems(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMenu();
  }, []);

  const getLocalizedName = (item: MenuItem) => {
    if (language === 'en' && item.nameEn) return item.nameEn;
    if (language === 'fr' && item.nameFr) return item.nameFr;
    if (language === 'nl' && item.nameNl) return item.nameNl;
    return item.namePt;
  };

  const getLocalizedDescription = (item: MenuItem) => {
    if (language === 'en' && item.descriptionEn) return item.descriptionEn;
    if (language === 'fr' && item.descriptionFr) return item.descriptionFr;
    if (language === 'nl' && item.descriptionNl) return item.descriptionNl;
    return item.descriptionPt;
  };

  const formatPrice = (price: number | null) => {
    if (price === null || price === undefined) return '';
    return `${Number(price).toFixed(2).replace('.', ',')} €`;
  };

  const filteredItems = items.filter((item) => {
    const matchesSection =
      selectedSection === 'ALL' ||
      item.section.toLowerCase() === selectedSection.toLowerCase();

    const name = getLocalizedName(item).toLowerCase();
    const desc = (getLocalizedDescription(item) || '').toLowerCase();
    const cat = item.category.toLowerCase();
    const query = search.toLowerCase();

    return matchesSection && (name.includes(query) || desc.includes(query) || cat.includes(query));
  });

  // Agrupar itens por categoria mantendo a ordem vinda da base de dados
  const groupedByCategory = filteredItems.reduce<Record<string, MenuItem[]>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* Cabeçalho da página */}
      <div className="border-b border-stone-800 pb-6">
        <h1 className="text-3xl font-extrabold text-amber-400 sm:text-4xl">{text.title}</h1>
        <p className="mt-2 text-stone-400">{text.subtitle}</p>

        {/* Filtros e Pesquisa */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedSection('ALL')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedSection === 'ALL'
                  ? 'bg-amber-500 text-stone-950'
                  : 'border border-stone-800 bg-stone-900 text-stone-300 hover:border-amber-400'
              }`}
            >
              {text.all}
            </button>
            <button
              onClick={() => setSelectedSection('Ementa')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedSection === 'Ementa'
                  ? 'bg-amber-500 text-stone-950'
                  : 'border border-stone-800 bg-stone-900 text-stone-300 hover:border-amber-400'
              }`}
            >
              {text.food}
            </button>
            <button
              onClick={() => setSelectedSection('Vinhos')}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                selectedSection === 'Vinhos'
                  ? 'bg-amber-500 text-stone-950'
                  : 'border border-stone-800 bg-stone-900 text-stone-300 hover:border-amber-400'
              }`}
            >
              {text.wines}
            </button>
          </div>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={text.searchPlaceholder}
            className="w-full rounded-lg border border-stone-800 bg-stone-900 px-4 py-2 text-sm text-stone-100 placeholder-stone-500 focus:border-amber-400 focus:outline-none sm:w-72"
          />
        </div>
      </div>

      {/* Estados de carregamento / erro */}
      {loading && <p className="mt-10 text-center text-stone-400">{text.loading}</p>}

      {error && (
        <div className="mt-10 rounded-xl border border-red-900/50 bg-red-950/30 p-6 text-center text-red-300">
          {text.error}
        </div>
      )}

      {!loading && !error && Object.keys(groupedByCategory).length === 0 && (
        <p className="mt-10 text-center text-stone-400">{text.empty}</p>
      )}

      {/* Listagem por Categoria */}
      <div className="mt-10 space-y-12">
        {Object.entries(groupedByCategory).map(([category, categoryItems]) => (
          <section key={category}>
            <h2 className="border-l-4 border-amber-500 pl-3 text-2xl font-bold text-stone-100">
              {category}
            </h2>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {categoryItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between rounded-xl border border-stone-800 bg-stone-900/70 p-5 transition hover:border-stone-700"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-lg font-bold text-stone-100">
                        {getLocalizedName(item)}
                      </h3>

                      {/* Preços */}
                      <div className="shrink-0 text-right">
                        {item.marketPrice ? (
                          <span className="rounded-md bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-400">
                            {text.marketPrice}
                          </span>
                        ) : (
                          <div className="space-y-0.5 text-sm font-bold text-amber-400">
                            {item.pricePrimary !== null && (
                              <div>
                                {item.labelPrimary && (
                                  <span className="mr-1 text-xs font-normal text-stone-400">
                                    {item.labelPrimary}:
                                  </span>
                                )}
                                {formatPrice(item.pricePrimary)}
                              </div>
                            )}
                            {item.priceSecondary !== null && (
                              <div>
                                {item.labelSecondary && (
                                  <span className="mr-1 text-xs font-normal text-stone-400">
                                    {item.labelSecondary}:
                                  </span>
                                )}
                                {formatPrice(item.priceSecondary)}
                              </div>
                            )}
                            {item.priceTertiary !== null && (
                              <div>
                                {item.labelTertiary && (
                                  <span className="mr-1 text-xs font-normal text-stone-400">
                                    {item.labelTertiary}:
                                  </span>
                                )}
                                {formatPrice(item.priceTertiary)}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {getLocalizedDescription(item) && (
                      <p className="mt-2 text-sm leading-relaxed text-stone-400">
                        {getLocalizedDescription(item)}
                      </p>
                    )}
                  </div>

                  {item.allergens && (
                    <p className="mt-3 border-t border-stone-800/80 pt-2 text-xs text-stone-500">
                      <span className="font-semibold text-stone-400">{text.allergens}:</span>{' '}
                      {item.allergens}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}