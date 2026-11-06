// Local verification of the future same-origin layout. No portfolio files are served.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const config = require('../demos.config.json');
const root = path.resolve(__dirname, '..');
const types = { '.html':'text/html; charset=utf-8','.js':'application/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.gif':'image/gif','.svg':'image/svg+xml','.ttf':'font/ttf','.woff2':'font/woff2','.ico':'image/x-icon','.mp3':'audio/mpeg','.wav':'audio/wav','.json':'application/json' };
function createDemoServer({ preserveTemplate = false } = {}) {
  const mounted = config.apps.filter(app => app.public || (preserveTemplate && app.id === 'medlive-template'));
  return http.createServer((req,res) => {
    let url;
    try { url = decodeURIComponent(new URL(req.url, 'http://local').pathname); } catch { res.writeHead(400).end(); return; }
    const app = mounted.find(item => url === item.basePath || url.startsWith(item.basePath + '/'));
    if (!app) { res.writeHead(404).end(); return; }
    const dir = app.id === 'medlive-template' ? path.join(root,app.directory,'dist') : path.join(root,config.outputDirectory || 'artifacts/os0051',app.basePath);
    let target = path.resolve(dir, '.' + url.slice(app.basePath.length));
    if (target !== dir && !target.startsWith(dir + path.sep)) { res.writeHead(403).end(); return; }
    if (target === dir || (fs.existsSync(target) && fs.statSync(target).isDirectory())) target = path.join(target,'index.html');
    const remaining = url.slice(app.basePath.length).replace(/^\//,'');
    if (!fs.existsSync(target) && !path.extname(target) && !/^(assets|_expo)(\/|$)/.test(remaining)) target = path.join(dir,'index.html');
    if (!fs.existsSync(target)) { res.writeHead(404).end(); return; }
    const data = fs.readFileSync(target);
    res.writeHead(200, { 'Content-Type':types[path.extname(target)] || 'application/octet-stream','Content-Length':data.length, 'Permissions-Policy': app.id === 'medlive' ? 'camera=(self), microphone=(), geolocation=(self)' : 'camera=(), microphone=(), geolocation=()' });
    res.end(req.method === 'HEAD' ? undefined : data);
  });
}
module.exports = { createDemoServer };
if (require.main === module) {
  const port = Number(process.argv[2] || 8091);
  createDemoServer().listen(port,'127.0.0.1',() => console.log(`Demos locais: http://127.0.0.1:${port}/demos/termo/ (sem página de catálogo)`));
}
