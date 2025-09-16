const fs = require('fs');
const path = require('path');

const hostname = 'https://buzzness.cl';
const routes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/buzzbot', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 }
  // añade aquí más rutas o genera dinámicamente desde Contentful/tu CMS
];

const today = new Date().toISOString().split('T')[0];

const urlsXml = routes.map(r => `
  <url>
    <loc>${hostname}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>
`;

const outPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, sitemap, 'utf8');
console.log('Sitemap generado en:', outPath);