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
for(const redirect of config.redirects){try{await access(`dist${redirect.destination}index.html`);}catch{errors.push(`Broken redirect destination: ${redirect.destination}`);}}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Checked ${htmlFiles.length} HTML pages, ${targets.size} local targets, ${config.redirects.length} redirects, and all content relationships. No missing links or images.`);
