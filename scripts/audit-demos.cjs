const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const config = require('../demos.config.json');
const root = path.resolve(__dirname, '..');
const patterns = {
  'google-api-key': /AIza[0-9A-Za-z_-]{35}/,
  'aws-access-key': /AKIA[0-9A-Z]{16}/,
  'private-key': /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  'github-token': /gh[pousr]_[A-Za-z0-9]{30,}/,
  'private-http-endpoint': /https?:\/\/(?:192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+)(?::\d+)?/,
};
const results = [];
for (const app of config.apps.filter(item => item.public)) {
  const dir = path.join(root, config.outputDirectory || 'artifacts/os0051', app.basePath);
  const findings = [], files = [];
  function scan(folder) {
    for (const entry of fs.readdirSync(folder,{withFileTypes:true})) {
      const file = path.join(folder,entry.name);
      if (entry.isSymbolicLink()) throw new Error('Unexpected symlink');
      if (entry.isDirectory()) scan(file);
      else {
        const data = fs.readFileSync(file), relative = path.relative(dir,file);
        files.push({ path: relative, bytes: data.length, sha256: crypto.createHash('sha256').update(data).digest('hex') });
        if (/\.(html|js|json|css)$/.test(file)) for (const [name, regex] of Object.entries(patterns)) if (regex.test(data.toString('utf8'))) findings.push({path:relative,type:name});
        if (/\.(php|tsx?|jsx|map)$/.test(file) || entry.name.startsWith('.env') || ['package.json','package-lock.json'].includes(entry.name)) findings.push({path:relative,type:'source-or-local-config'});
      }
    }
  }
  scan(dir);
  const html = fs.readFileSync(path.join(dir,'index.html'),'utf8');
  const refs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match=>match[1]);
  for (const ref of refs) if (!ref.startsWith(app.basePath + '/')) findings.push({type:'html-reference-outside-base',path:ref});
  results.push({app:app.id,basePath:app.basePath,htmlReferences:refs,findings,files});
  console.log(`${app.id}: ${files.length} arquivos, ${findings.length} achados.`);
}
const unexpected = ['medlive-template'].filter(name => fs.existsSync(path.join(root,config.outputDirectory || 'artifacts/os0051','demos',name)));
fs.writeFileSync(path.join(root,'docs/evidencias/OS-005-FINAL/bundle-audit.json'),JSON.stringify({scope:Object.keys(patterns),note:'Varredura direcionada; não é prova universal de ausência de segredos.',unexpected,results},null,2)+'\n');
if (unexpected.length || results.some(result=>result.findings.length)) process.exitCode=1;
