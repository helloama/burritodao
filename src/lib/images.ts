import sizes from '../../content/image-sizes.json';
export function imageSize(src:string){return (sizes as Record<string,{width:number;height:number}>)[src] || {width:1200,height:800};}
