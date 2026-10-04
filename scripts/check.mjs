import { readFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
const errors=[];
const read=async name=>JSON.parse(await readFile(`content/${name}.json`,'utf8'));
const site=await read('site');
const collections=Object.fromEntries(await Promise.all(['exhibitions','team','drops','calls','journal'].map(async name=>[name,await read(name)])));
for(const [name,records] of Object.entries(collections)){
  const seen=new Set();
  for(const record of records){
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug))errors.push(`${name}: invalid slug ${record.slug}`);
    if(seen.has(record.slug))errors.push(`${name}: duplicate slug ${record.slug}`);seen.add(record.slug);
    if(record.image&&!record.imageAlt)errors.push(`${name}/${record.slug}: missing image description`);
    if(name==='exhibitions'){
      for(const image of record.gallery)if(!image.alt||!image.credit)errors.push(`${record.slug}: gallery requires alt text and credit`);
    }
    if(name==='calls'){
      if(record.exhibition&&!collections.exhibitions.some(e=>e.slug===record.exhibition))errors.push(`Unknown exhibition ${record.exhibition}`);
      if(record.status==='open'){
        for(const field of ['deadline','deadlineLabel','submissionUrl','fee','rights'])if(!record[field])errors.push(`${record.slug}: active call missing ${field}`);
        if(!/^https:\/\//.test(record.submissionUrl))errors.push(`${record.slug}: submission URL must use HTTPS`);
        if(!/(Z|[+-]\d{2}:\d{2})$/.test(record.deadline)||Number.isNaN(Date.parse(record.deadline)))errors.push(`${record.slug}: invalid deadline/timezone`);
        if(!record.requirements?.length)errors.push(`${record.slug}: active call needs a brief`);
      }
    }
  }
}
if(!collections.exhibitions.some(e=>e.slug===site.featuredExhibition&&e.image))errors.push('Featured exhibition needs an existing slug and image');
async function walk(dir){const files=[];for(const e of await readdir(dir,{withFileTypes:true})){const full=path.join(dir,e.name);if(e.isDirectory())files.push(...await walk(full));else files.push(full);}return files;}
const files=await walk('dist');const htmlFiles=files.filter(f=>f.endsWith('.html'));const targets=new Set();
for(const file of htmlFiles){const html=await readFile(file,'utf8');
  if((html.match(/<h1(?:\s|>)/g)||[]).length!==1)errors.push(`${file}: expected one H1`);
  if(!html.includes('name="description"'))errors.push(`${file}: missing description`);
  if(!html.includes('rel="canonical"'))errors.push(`${file}: missing canonical`);
  for(const img of html.matchAll(/<img\b[^>]*>/g))if(!/\balt="[^"]+"/.test(img[0]))errors.push(`${file}: missing image alt`);
  for(const match of html.matchAll(/(?:href|src)="([^"#]*)/g)){
    const url=match[1].replaceAll('&amp;','&');
    if(!url.startsWith('/')||url.startsWith('//'))continue;
    const clean=decodeURIComponent(url.split('?')[0]);
    targets.add(clean.endsWith('/')?`dist${clean}index.html`:`dist${clean}`);
  }
}
for(const target of targets){try{await access(target);}catch{errors.push(`Missing local target: ${target}`);}}
const config=JSON.parse(await readFile('vercel.json','utf8'));
for(const redirect of config.redirects){if(redirect.has?.some(h=>h.type==='host')){if(!redirect.destination.startsWith('https://burritodao.com/'))errors.push('Host redirect must use canonical domain');continue;}try{await access(path.join("dist",new URL(redirect.destination,"https://burritodao.com").pathname, path.extname(new URL(redirect.destination,"https://burritodao.com").pathname)?"":"index.html"));}catch{errors.push(`Broken redirect destination: ${redirect.destination}`);}}

const sizes=await read('image-sizes');
const titles=new Map(),descriptions=new Map(),pages=new Map();
for(const file of htmlFiles){
 const html=await readFile(file,'utf8');const route=file==='dist/index.html'?'/':file.replace(/^dist/,'').replace(/index\.html$/,'');
 const title=html.match(/<title>(.*?)<\/title>/)?.[1];const description=html.match(/name="description" content="([^"]*)"/)?.[1];
 for(const [label,value,map] of [['title',title,titles],['description',description,descriptions]]){if(!value?.trim())errors.push(`${file}: empty ${label}`);else if(map.has(value))errors.push(`${file}: duplicate ${label} with ${map.get(value)}`);else map.set(value,file);}
 if(/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/i.test(html))errors.push(`${file}: noindex blocks crawling`);
 const canonical=html.match(/rel="canonical" href="([^"]*)"/)?.[1];
 if(file!=='dist/404.html'&&canonical!==`https://burritodao.com${route}`)errors.push(`${file}: wrong canonical ${canonical}`);
 for(const img of html.matchAll(/<img\b[^>]*>/g)){const src=img[0].match(/src="([^"]+)"/)?.[1];const width=Number(img[0].match(/width="(\d+)"/)?.[1]),height=Number(img[0].match(/height="(\d+)"/)?.[1]);if(!width||!height)errors.push(`${file}: image missing dimensions`);if(src&&sizes[src]&&(width!==sizes[src].width||height!==sizes[src].height))errors.push(`${file}: inaccurate image dimensions ${src}`);}
 let graph=[];for(const schema of html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>(.*?)<\/script>/gs)){try{graph.push(...JSON.parse(schema[1])['@graph']);}catch{errors.push(`${file}: invalid structured data`);}}
 if(!graph.some(x=>x['@type']==='Organization'))errors.push(`${file}: missing collective schema`);
 if(route!=='/'&&file!=='dist/404.html'&&!graph.some(x=>x['@type']==='BreadcrumbList'))errors.push(`${file}: missing breadcrumb schema`);
 pages.set(route,{html,links:[...html.matchAll(/href="(\/[^"?#]*)/g)].map(x=>x[1])});
}
const reached=new Set(),queue=['/'];while(queue.length){const route=queue.shift();if(reached.has(route))continue;reached.add(route);for(const link of pages.get(route)?.links||[])if(pages.has(link)&&!reached.has(link))queue.push(link);}
for(const route of pages.keys())if(route!=='/404.html'&&!reached.has(route))errors.push(`Orphan page ${route}`);
const sitemap=await readFile('dist/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x=>x[1]);
if(urls.length!==new Set(urls).size)errors.push('Duplicate sitemap URL');
for(const route of pages.keys())if(route!=='/404.html'&&!urls.includes(`https://burritodao.com${route}`))errors.push(`Missing sitemap URL ${route}`);
for(const url of urls)if(!pages.has(url.replace('https://burritodao.com','')))errors.push(`Sitemap points to unknown route ${url}`);
for(const redirect of config.redirects.filter(r=>!r.has)){if(config.redirects.some(r=>!r.has&&r.source===new URL(redirect.destination,"https://burritodao.com").pathname))errors.push(`Redirect chain: ${redirect.source}`);}
console.log(`SEO: ${urls.length} sitemap URLs; unique titles/descriptions; crawlable HTML; accurate image sizes; structured data; no orphan pages.`);

if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Checked ${htmlFiles.length} HTML pages, ${targets.size} local targets, ${config.redirects.length} redirects, and all content relationships. No missing links or images.`);
