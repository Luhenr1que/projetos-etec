#!/usr/bin/env node
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const config = require('../demos.config.json');
const out = path.join(root, config.outputDirectory || 'artifacts/os0051');
const stamp = '.os005-generated';
const temp = path.join(root, 'artifacts/.os005-final-building');
if (fs.existsSync(out) && !fs.existsSync(path.join(out, stamp))) throw new Error('Diretório de destino preexistente sem marcador; nada foi sobrescrito.');
if (fs.existsSync(temp)) throw new Error('Staging anterior encontrado; revise artifacts/.os0051-building antes de continuar.');
const manifest = [];
try {
  for (const app of config.apps.filter(app => app.public)) {
    if (!app.buildable) throw new Error(`Aplicativo bloqueado: ${app.id}`);
    const dist = path.join(root, app.directory, 'dist');
    const html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
    if (!html.includes(app.basePath + '/_expo/')) throw new Error(`Build ${app.id} não corresponde a ${app.basePath}`);
    fs.cpSync(dist, path.join(temp, app.basePath), { recursive: true });
    const files = [];
    function visit(dir) {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const name = path.join(dir, entry.name);
        if (entry.isSymbolicLink()) throw new Error('Symlinks não são permitidos nos artefatos.');
        if (entry.isDirectory()) visit(name);
        else { const data = fs.readFileSync(name); files.push({ path: path.relative(dist, name), bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex') }); }
      }
    }
    visit(dist); manifest.push({ app: app.id, basePath: app.basePath, files });
  }
  fs.writeFileSync(path.join(temp, stamp), 'Gerado por scripts/prepare-demos.cjs. Sem deploy.\n');
  fs.writeFileSync(path.join(temp, 'manifest.json'), JSON.stringify({ apps: manifest }, null, 2) + '\n');
  const rewrites = config.apps.filter(app => app.public).flatMap(app => [
    { source: app.basePath, destination: app.basePath + '/index.html' },
    { source: app.basePath + '/:path((?!assets(?:/|$)|_expo(?:/|$))(?!.*\\.).*)', destination: app.basePath + '/index.html' },
  ]);
  fs.writeFileSync(path.join(temp, 'vercel.demos.fragment.json'), JSON.stringify({ rewrites }, null, 2) + '\n');
  if (fs.existsSync(out)) fs.rmSync(out, { recursive: true });
  fs.renameSync(temp, out);
  fs.copyFileSync(path.join(out, 'manifest.json'), path.join(root, 'docs/evidencias/OS-005-FINAL/pacote.json'));
  console.log('Pacote local: ' + path.relative(root, out) + '/demos/. Cinco demos; sem template ou catálogo.');
} catch (error) {
  if (fs.existsSync(temp)) fs.rmSync(temp, { recursive: true });
  throw error;
}
