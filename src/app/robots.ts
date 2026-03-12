import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/panel/', '/auth/'],
      },
    ],
    sitemap: 'https://upboost.pro/sitemap.xml',
    host: 'https://upboost.pro',
  };
}
