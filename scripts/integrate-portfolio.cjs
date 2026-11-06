#!/usr/bin/env node
// Transfer only verified static exports. Never build, commit, push or deploy the portfolio.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),config=require('../demos.config.json');
const portfolio=path.resolve(process.argv[2] || path.join(root,'../portifolio-react'));
const remote=execFileSync('git',['remote','get-url','origin'],{cwd:portfolio,encoding:'utf8'});
if(!remote.includes('Luhenr1que/portifolio-react'))throw new Error('Destino não é o repositório esperado do portfólio.');
const source=path.join(root,config.outputDirectory),manifest=JSON.parse(fs.readFileSync(path.join(source,'manifest.json'),'utf8'));
const expected=config.apps.filter(app=>app.public).map(app=>app.id).sort();
if(JSON.stringify(manifest.apps.map(app=>app.app).sort())!==JSON.stringify(expected))throw new Error('Pacote incompleto.');
for(const app of manifest.apps)for(const entry of app.files){const file=path.join(source,app.basePath,entry.path);if(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==entry.sha256)throw new Error('Hash inválido em '+entry.path);}
const dest=path.join(portfolio,'public/demos'),marker=path.join(portfolio,'public/demos-manifest.json');
if(fs.existsSync(dest)&&!fs.existsSync(marker))throw new Error('Destino preexistente sem manifesto; nada sobrescrito.');
const temp=path.join(portfolio,'public/.demos-preparing');
if(fs.existsSync(temp))throw new Error('Staging anterior encontrado; revisar antes de substituir.');
fs.cpSync(path.join(source,'demos'),temp,{recursive:true});
if(fs.existsSync(dest))fs.rmSync(dest,{recursive:true});
fs.renameSync(temp,dest);fs.copyFileSync(path.join(source,'manifest.json'),marker);
console.log('Cinco exports verificados copiados para public/demos do portfólio. Sem publicação.');
