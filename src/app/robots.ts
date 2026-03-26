import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: 'https://euro-asfalt.ru/sitemap.xml',
    host: 'https://euro-asfalt.ru',
  };
}
