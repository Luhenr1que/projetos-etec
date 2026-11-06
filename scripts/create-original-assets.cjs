// Original geometric vector artwork and synthesized PCM chimes. CC0-1.0.
// Regenerate with ASSET_RENDERER_MODULE=/path/to/sharp node scripts/create-original-assets.cjs.
const fs=require('node:fs'),path=require('node:path');
const sharp=require(process.env.ASSET_RENDERER_MODULE || 'sharp');
const root=path.resolve(__dirname,'..');
const symbols={
 ares:'M120 235 C120 105 185 95 200 235 C215 95 280 105 280 235 M200 235 V285',
 touro:'M135 115 Q135 170 200 170 Q265 170 265 115 M200 170 A60 60 0 1 0 200 290 A60 60 0 1 0 200 170',
 gemeos:'M135 125 Q200 145 265 125 M135 275 Q200 255 265 275 M165 137 V263 M235 137 V263',
 cancer:'M280 150 Q170 100 135 180 M120 250 Q230 300 265 220 M135 180 A28 28 0 1 0 191 180 A28 28 0 1 0 135 180 M209 220 A28 28 0 1 0 265 220 A28 28 0 1 0 209 220',
 leao:'M145 230 A30 30 0 1 0 205 230 A30 30 0 1 0 145 230 M175 200 C120 90 275 95 255 180 L225 260 Q215 300 280 275',
 virgem:'M120 255 V150 Q145 110 165 150 V255 M165 150 Q190 110 210 150 V255 M210 150 Q240 110 255 150 L255 235 Q240 285 210 280 M210 280 L270 210',
 libra:'M120 235 H170 M230 235 H280 M170 235 C115 145 285 145 230 235 M120 275 H280',
 escorpiao:'M115 255 V155 Q140 115 165 155 V255 M165 155 Q190 115 215 155 V255 Q215 280 260 260 M245 245 L275 255 L260 280',
 sargitario:'M130 280 L270 140 M205 140 H270 V205 M145 205 L205 265',
 capricornio:'M115 150 L155 255 L195 150 L215 260 Q245 300 275 255 Q290 210 255 215 Q220 220 230 260',
 aquario:'M110 175 L145 145 L180 175 L215 145 L250 175 L285 145 M110 245 L145 215 L180 245 L215 215 L250 245 L285 215',
 peixes:'M145 130 Q215 200 145 270 M255 130 Q185 200 255 270 M125 200 H275',
};
const stars=Array.from({length:45},(_,i)=>`<circle cx="${(i*83+21)%400}" cy="${(i*137+29)%400}" r="${i%3+1}" fill="#fff" opacity=".5"/>`).join('');
const bg=`<defs><linearGradient id="b" x2="1" y2="1"><stop stop-color="#211038"/><stop offset="1" stop-color="#60427b"/></linearGradient></defs><rect width="400" height="400" fill="url(#b)"/>${stars}`;
async function png(relative,svg,width,height){const p=path.join(root,relative);fs.mkdirSync(path.dirname(p),{recursive:true});await sharp(Buffer.from(svg)).resize(width,height).png().toFile(p);}
(async()=>{
 for(const[name,d]of Object.entries(symbols)){
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${bg}<circle cx="200" cy="200" r="155" fill="#ffffff" fill-opacity=".05" stroke="#dac6e9" stroke-width="3"/><path d="${d}" fill="none" stroke="#f6e7c9" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  fs.mkdirSync(path.join(root,'horoscupo/assets/vetores'),{recursive:true});fs.writeFileSync(path.join(root,`horoscupo/assets/vetores/${name}.svg`),svg+'\n');await png(`horoscupo/assets/img/${name}.png`,svg,400,400);
 }
 const background=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${bg}</svg>`;
 fs.writeFileSync(path.join(root,'horoscupo/assets/vetores/horos.svg'),background+'\n');await png('horoscupo/assets/img/horos.png',background,400,400);
 const icon=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">${bg}<circle cx="200" cy="200" r="130" fill="none" stroke="#f6e7c9" stroke-width="12"/><path d="M200 90 L224 176 L310 200 L224 224 L200 310 L176 224 L90 200 L176 176 Z" fill="#f6e7c9"/></svg>`;
 fs.writeFileSync(path.join(root,'horoscupo/assets/vetores/icon.svg'),icon+'\n');
 for(const name of ['icon','splash-icon','adaptive-icon','favicon'])await png(`horoscupo/assets/${name}.png`,icon,name==='favicon'?64:1024,name==='favicon'?64:1024);
 const bird=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 400"><rect width="600" height="400" fill="#cce7d0"/><path d="M0 230 Q100 185 210 235 T420 225 T600 220 V400 H0Z" fill="#78bec2"/><path d="M0 315 Q150 270 320 310 T600 285 V400 H0Z" fill="#e0c88d"/><circle cx="500" cy="70" r="34" fill="#f8e8b0"/><g stroke="#713205" stroke-width="6" stroke-linecap="round"><path d="M270 260 L255 350 M315 260 L325 350"/><path d="M245 350 H270 M315 350 H340"/></g><ellipse cx="290" cy="230" rx="77" ry="53" fill="#fffaf0" stroke="#713205" stroke-width="4"/><path d="M250 205 Q320 200 350 255 Q280 280 250 205" fill="#263d35"/><path d="M315 200 Q350 150 350 100" fill="none" stroke="#243e34" stroke-width="28" stroke-linecap="round"/><path d="M340 157 L355 137" stroke="#d84d39" stroke-width="30"/><ellipse cx="354" cy="91" rx="26" ry="21" fill="#253f34"/><path d="M375 84 L450 102 L375 105Z" fill="#40362c"/><circle cx="360" cy="84" r="4" fill="#fff"/><g fill="#487d42"><path d="M45 340 L40 240 L60 310 L70 240 L72 340Z"/><path d="M520 330 L515 230 L535 305 L550 240 L548 330Z"/></g><rect x="18" y="18" width="564" height="364" rx="24" fill="none" stroke="#713205" stroke-width="6"/></svg>`;
 fs.mkdirSync(path.join(root,'ZooKids/assets/vetores'),{recursive:true});fs.writeFileSync(path.join(root,'ZooKids/assets/vetores/aves-pantanal-substituicao.svg'),bird+'\n');
 const original=path.join(root,'ZooKids/assets/img/t2/avesPantanalR.png'),backup=path.join(root,'ZooKids/assets/vetores/avesPantanalR.original-corrompido.bin');if(!fs.existsSync(backup))fs.copyFileSync(original,backup);await png('ZooKids/assets/img/t2/avesPantanalR.png',bird,600,400);
 // Authored short tones, no third-party samples.
 function tone(file,f1,f2){const rate=22050,n=Math.round(rate*.12),b=Buffer.alloc(44+n*2);b.write('RIFF');b.writeUInt32LE(b.length-8,4);b.write('WAVEfmt ',8);b.writeUInt32LE(16,16);b.writeUInt16LE(1,20);b.writeUInt16LE(1,22);b.writeUInt32LE(rate,24);b.writeUInt32LE(rate*2,28);b.writeUInt16LE(2,32);b.writeUInt16LE(16,34);b.write('data',36);b.writeUInt32LE(n*2,40);for(let i=0;i<n;i++){const t=i/rate,envelope=Math.sin(Math.PI*i/n)**2;const v=(Math.sin(2*Math.PI*f1*t)+.3*Math.sin(2*Math.PI*f2*t))*.12*envelope;b.writeInt16LE(Math.round(v*32767),44+i*2);}fs.writeFileSync(path.join(root,file),b);}
 tone('medLiveProjeto/medLive/assets/music/botao.wav',660,990);tone('medLiveProjeto/medLive/assets/music/botCode.wav',880,1320);
 const license='# Recursos substitutos — OS-005 FINAL\n\nArte vetorial geométrica original e efeitos PCM sintetizados para este projeto, disponibilizados sob CC0-1.0: https://creativecommons.org/publicdomain/zero/1.0/\n\nNão são recuperação dos arquivos originais. Nenhum sample, imagem de terceiro ou marca foi utilizado. Fontes vetoriais e gerador permitem reproduzir os PNGs. As características textuais dos animais e signos continuam sendo o conteúdo acadêmico original.\n';
 for(const dir of ['horoscupo/assets','ZooKids/assets/vetores','medLiveProjeto/medLive/assets/music'])fs.writeFileSync(path.join(root,dir,'OS-005-LICENSE.md'),license);
 console.log('17 assets Horóscopo, ilustração Pantanal e 2 efeitos originais produzidos.');
})().catch(e=>{console.error(e);process.exitCode=1});
