import sharp from 'sharp';import {readdir,writeFile} from 'node:fs/promises';
const sizes={};for(const file of await readdir('public/images')){if(!/\.(webp|png|jpe?g)$/i.test(file))continue;const {width,height}=await sharp(`public/images/${file}`).metadata();sizes[`/images/${file}`]={width,height};}await writeFile('content/image-sizes.json',JSON.stringify(sizes,null,2)+'\n');
