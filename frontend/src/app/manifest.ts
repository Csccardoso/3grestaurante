import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Restaurante 3ª Geração',
    short_name: '3ª Geração',
    description: 'Cozinha tradicional portuguesa em Palmela. Ementa digital e reservas online.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0f1115',
    theme_color: '#d97706',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}