import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración del sitio
const SITE_URL = 'https://buzzness.cl'; // Cambia por tu dominio
const BUILD_DIR = path.resolve(__dirname, '../../dist');
const SITEMAP_PATH = path.join(BUILD_DIR, 'sitemap.xml');

// Rutas estáticas de tu aplicación React
const routes = [
  {
    url: '/',
    changefreq: 'weekly',
    priority: '1.0'
  },
  {
    url: '/about',
    changefreq: 'monthly',
    priority: '0.8'
  },
  {
    url: '/contact',
    changefreq: 'monthly',
    priority: '0.7'
  },
  {
    url: '/buzzbot',
    changefreq: 'weekly',
    priority: '0.9'
  }
];

// Función para generar el sitemap XML
function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  routes.forEach(route => {
    sitemap += `
  <url>
    <loc>${SITE_URL}${route.url}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
}

// Función principal
async function main() {
  try {
    console.log('🚀 Generando sitemap...');
    
    // Crear directorio dist si no existe
    if (!fs.existsSync(BUILD_DIR)) {
      fs.mkdirSync(BUILD_DIR, { recursive: true });
    }

    // Generar el contenido del sitemap
    const sitemapContent = generateSitemap();
    
    // Escribir el archivo sitemap.xml
    fs.writeFileSync(SITEMAP_PATH, sitemapContent);
    
    console.log('✅ Sitemap generado exitosamente en:', SITEMAP_PATH);
    console.log(`📝 ${routes.length} rutas incluidas en el sitemap`);
    
  } catch (error) {
    console.error('❌ Error generando sitemap:', error.message);
    process.exit(1);
  }
}

// Ejecutar si es llamado directamente
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { generateSitemap, routes };