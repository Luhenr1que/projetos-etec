const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const tools = require(process.env.VERCEL_ROUTING_MODULE || '@vercel/routing-utils');
const config = require('../docs/OS-005.1-VERCEL-EXEMPLO.json');
const transformed = tools.getTransformedRoutes(config);
assert.equal(transformed.error, null);
const rewrites = tools.getTransformedRoutes({ rewrites: config.rewrites });
assert.equal(rewrites.error, null);
assert.equal(rewrites.routes[0].handle, 'filesystem', 'Static files must precede SPA fallback');
const matches = url => rewrites.routes.some(route => route.src && new RegExp(route.src).test(url));
let checks = 0;
for (const app of ['termo','agenda','zookids','medlive']) {
  for (const suffix of ['', '/', '/home', '/cadastro/foto']) { assert.ok(matches(`/demos/${app}${suffix}`)); checks++; }
  for (const suffix of ['/assets/missing.png','/_expo/missing.js','/assets/missing','/_expo/missing','/missing.css']) { assert.ok(!matches(`/demos/${app}${suffix}`)); checks++; }
}
for (const url of ['/', '/api/contato', '/assets/main.js', '/demos/horoscopo/', '/_preservacao/medlive-template/']) { assert.ok(!matches(url)); checks++; }
const out = path.resolve(__dirname,'../docs/evidencias/OS-005.1/vercel-routes.json');
fs.writeFileSync(out,JSON.stringify({ tool:'@vercel/routing-utils@6.6.1',checks,status:'passed',error:transformed.error,scope:'Validação local de sintaxe e matching. Não é deploy nem emulação completa da Vercel.' },null,2)+'\n');
console.log(`${checks} verificações de rotas Vercel aprovadas. Nenhum deploy.`);
