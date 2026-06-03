import type { APIRoute } from 'astro';
import { readData } from '../lib/readData';

export const GET: APIRoute = async ({ request }) => {
  const siteConfig = readData('siteConfig.json', { url: '' }) as any;
  
  // Usa a URL configurada no CMS, caso contrário, usa a URL da requisição atual
  let baseUrl = siteConfig.url;
  if (!baseUrl) {
    const url = new URL(request.url);
    baseUrl = `${url.protocol}//${url.host}`;
  }
  
  // Remove barra no final se houver
  baseUrl = baseUrl.replace(/\/$/, '');

  const robotsTxt = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap-index.xml
`.trim();

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
