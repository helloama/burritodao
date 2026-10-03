import exhibitions from '../../content/exhibitions.json';
import drops from '../../content/drops.json';
import journal from '../../content/journal.json';
export function GET(){const paths=['/','/exhibitions/','/team/','/open-calls/','/drops/','/journal/','/podcast/','/about/','/contact/','/privacy/',...exhibitions.map(x=>`/exhibitions/${x.slug}/`),...drops.map(x=>`/drops/${x.slug}/`),...journal.map(x=>`/journal/${x.slug}/`)];return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map(path=>`<url><loc>https://burritodao.com${path}</loc></url>`).join('')}</urlset>`,{headers:{'Content-Type':'application/xml'}});}
