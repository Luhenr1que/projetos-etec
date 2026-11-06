const fs=require('node:fs'),path=require('node:path');
const playwright=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browsers=['chromium','firefox','webkit'].map(name=>{
 const custom=name==='chromium' ? process.env.CHROMIUM_PATH : undefined;
 const executable=custom || playwright[name].executablePath();
 return {browser:name,available:fs.existsSync(executable),customExecutable:!!custom,reason:fs.existsSync(executable)?'Executável encontrado':'Executável Playwright não instalado; teste não executado'};
});
const result={timestamp:new Date().toISOString(),browsers,note:'Não baixa navegadores nem inicia dispositivos. Dispositivos são verificados separadamente.'};
fs.writeFileSync(path.resolve(__dirname,'../docs/evidencias/OS-005.1/browser-availability.json'),JSON.stringify(result,null,2)+'\n');
for(const browser of browsers)console.log(browser.browser+': '+(browser.available?'disponível':'indisponível'));
