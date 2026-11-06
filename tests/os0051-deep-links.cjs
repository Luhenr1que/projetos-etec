const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { createDemoServer } = require('../scripts/demo-server.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
(async () => {
  const server = createDemoServer(); await new Promise(resolve => server.listen(0,'127.0.0.1',resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ headless:true,...(process.env.CHROMIUM_PATH ? {executablePath:process.env.CHROMIUM_PATH} : {}) });
  const results=[];
  try {
    for (const route of ['receitas','mapa','meditacao']) {
      const page=await browser.newPage({ viewport:{width:390,height:844} });const errors=[];
      page.setDefaultTimeout(6000);
      page.on('pageerror',error=>errors.push(error.message));
      const result={route:`/demos/medlive/${route}`,status:'passed',errors};
      try {
        await page.goto(origin+result.route);
        await page.reload();
        await page.getByRole('button',{name:'Voltar',exact:true}).click();
        await page.getByText('Sua Saúde', { exact: true }).filter({ visible: true }).waitFor({state:'visible'});
        assert.ok(['/demos/medlive','/demos/medlive/'].includes(new URL(page.url()).pathname));
        assert.deepEqual(errors,[]);
      } catch(error) {result.status='failed';result.failure=error.message;}
      results.push(result);console.log(`${result.status}: ${result.route} → Home`);await page.close();
    }
  } finally {await browser.close();server.close();}
  fs.writeFileSync(path.resolve(__dirname,'../docs/evidencias/OS-005.1/deep-links.json'),JSON.stringify({timestamp:new Date().toISOString(),results},null,2)+'\n');
  if(results.some(result=>result.status==='failed'))process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1});
