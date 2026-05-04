import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sympto+ | Orientación de síntomas',
    short_name: 'Sympto+',
    description: 'Selecciona la zona corporal y describe tu síntoma para recibir orientación informativa.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#2563eb',
    orientation: 'portrait',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
  };
}