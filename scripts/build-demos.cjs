#!/usr/bin/env node
// Build each app independently. No installation, publication or portfolio writes.
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const config = require('../demos.config.json');
const args = process.argv.slice(2);
const requested = args.filter(arg => !arg.startsWith('--'));
const known = new Set(config.apps.map(app => app.id));
if (requested.some(id => !known.has(id)) || args.some(arg => arg.startsWith('--') && arg !== '--include-template')) {
  console.error('Uso: node scripts/build-demos.cjs [termo agenda zookids medlive] [--include-template]'); process.exit(1);
}
const chosen = config.apps.filter(app => requested.length ? requested.includes(app.id) : app.public || (args.includes('--include-template') && app.id === 'medlive-template'));
const evidence = path.join(root, process.env.OS005_EVIDENCE_DIR || 'docs/evidencias/OS-005-FINAL'); fs.mkdirSync(evidence, { recursive: true });
const results = [];
for (const app of chosen) {
  if (!app.buildable) { results.push({ app: app.id, status: 'blocked', reason: 'Assets originais ausentes; não incluído no pacote público.' }); continue; }
  const command = ['npm', 'run', 'build:web', '--', '--max-workers', '2'];
  const run = spawnSync(command[0], command.slice(1), { cwd: path.join(root, app.directory), env: { ...process.env, DEMO_BASE_PATH: app.basePath, EXPO_NO_TELEMETRY: '1', EXPO_OFFLINE: '1', CI: '1' }, encoding: 'utf8', maxBuffer: 20 * 1024 * 1024 });
  fs.writeFileSync(path.join(evidence, `build-${app.id}.log`), (run.stdout || '') + (run.stderr || '') + (run.error ? String(run.error) : ''));
  const index = path.join(root, app.directory, 'dist/index.html');
  const passed = run.status === 0 && fs.existsSync(index) && fs.readFileSync(index, 'utf8').includes(app.basePath + '/_expo/');
  const result = { app: app.id, basePath: app.basePath, command: command.join(' '), exitCode: run.status, status: passed ? 'passed' : 'failed', artifact: app.directory + '/dist/' };
  results.push(result); console.log(`${result.status}: ${app.id} em ${app.basePath}/`);
}
const report = path.join(evidence, 'builds.json');
const previous = requested.length && fs.existsSync(report) ? JSON.parse(fs.readFileSync(report, 'utf8')).results.filter(item => !chosen.some(app => app.id === item.app)) : [];
fs.writeFileSync(report, JSON.stringify({ timestamp: new Date().toISOString(), results: [...previous, ...results] }, null, 2) + '\n');
if (results.some(result => result.status !== 'passed')) process.exitCode = 1;
