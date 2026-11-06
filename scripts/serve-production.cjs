// Static production verification using the actual Vercel rewrite/header configuration.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const routing=require(process.env.VERCEL_ROUTING_MODULE || '@vercel/routing-utils');
const root=path.resolve(process.env.PORTFOLIO_DIR || path.join(__dirname,'../../portifolio-react'));
const dist=path.join(root,'dist'),config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
const transformed=routing.getTransformedRoutes({rewrites:config.rewrites || []});if(transformed.error)throw new Error(JSON.stringify(transformed.error));
const headers=routing.getTransformedRoutes({headers:config.headers || []});if(headers.error)throw new Error(JSON.stringify(headers.error));
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon','.ttf':'font/ttf','.woff':'font/woff','.woff2':'font/woff2','.mp3':'audio/mpeg','.wav':'audio/wav','.pdf':'application/pdf','.json':'application/json'};
function resolve(route){const file=path.resolve(dist,'.'+route);if(file!==dist&&!file.startsWith(dist+path.sep))return null;if(fs.existsSync(file))return fs.statSync(file).isDirectory()?path.join(file,'index.html'):file;return null;}
function createProductionServer(){return http.createServer((req,res)=>{
 let route;try{route=decodeURIComponent(new URL(req.url,'http://local').pathname)}catch{res.writeHead(400).end();return}
 for(const rule of headers.routes || [])if(rule.src&&new RegExp(rule.src).test(route))for(const[name,value]of Object.entries(rule.headers || {}))res.setHeader(name,value);
 let file=resolve(route);
 if(!file||!fs.existsSync(file))for(const rule of transformed.routes)if(rule.src&&new RegExp(rule.src).test(route)){file=resolve(rule.dest.split('?')[0]);break;}
 if(!file||!fs.existsSync(file)){res.writeHead(404,{'Content-Type':'text/plain'}).end('Not found');return;}
 const stat=fs.statSync(file);res.setHeader('Content-Type',types[path.extname(file)] || 'application/octet-stream');
 const range=req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
 if(range){const start=Number(range[1]),end=range[2]?Math.min(Number(range[2]),stat.size-1):stat.size-1;if(start>end||start>=stat.size){res.writeHead(416).end();return}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${stat.size}`,'Accept-Ranges':'bytes','Content-Length':end-start+1});if(req.method==='HEAD')res.end();else fs.createReadStream(file,{start,end}).pipe(res);}
 else{res.writeHead(200,{'Content-Length':stat.size,'Accept-Ranges':'bytes'});if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res);}
 });}
module.exports={createProductionServer};
if(require.main===module){const port=Number(process.argv[2] || 8091);createProductionServer().listen(port,'127.0.0.1',()=>console.log(`Distribuição completa: http://127.0.0.1:${port}/`));}
