const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const playwright=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const {createProductionServer}=require('../scripts/serve-production.cjs');
const {flow}=require('./demo-flows.cjs');
const root=path.resolve(__dirname,'..'),evidence=path.join(root,'docs/evidencias/OS-005-FINAL');
const apps=[['termo','Termo Numérico'],['agenda','Agenda Next'],['zookids','ZooKids'],['medlive','MedLive'],['horoscopo','Horóscopo']];
const viewports={mobile:{width:390,height:844},tablet:{width:768,height:1024},desktop:{width:1440,height:900},wide:{width:1920,height:1080}};
const engines=(process.env.OS005_BROWSERS || 'chromium,firefox,webkit').split(',');
const requested=(process.env.OS005_VIEWPORTS || Object.keys(viewports).join(',')).split(',');
const results=[];
async function attach(page,errors,failures){
 page.on('pageerror',error=>errors.push(error.message));
 page.on('console',message=>{if(message.type()==='error')errors.push(message.text())});
 page.on('response',response=>{if(response.status()>=400)failures.push({url:response.url(),status:response.status()})});
 page.on('dialog',dialog=>dialog.accept());page.setDefaultTimeout(18000);
}
async function checkMedia(page){
 await page.evaluate(()=>document.fonts.ready);
 const result=await page.evaluate(async()=>{
  const bad=[],images=[...document.querySelectorAll('img[src]')].filter(img=>img.getAttribute('src')&&img.getClientRects().length);
  await Promise.all(images.map(async img=>{try{await img.decode();if(!img.naturalWidth)bad.push(img.src)}catch{bad.push(img.src)}}));
  return {checkedImages:images.length,badImages:bad,badFonts:[...document.fonts].filter(font=>font.status==='error').map(font=>font.family)};
 });
 assert.deepEqual(result.badImages,[]);assert.deepEqual(result.badFonts,[]);return result;
}
(async()=>{
 fs.mkdirSync(evidence,{recursive:true});
 const server=createProductionServer();await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const origin=`http://127.0.0.1:${server.address().port}`;
 try{
  // HTTP assertions against the actual final artifact and transformed Vercel routes.
  for(const[id]of apps){
   for(const suffix of ['','/','/rota-profunda'])assert.equal((await fetch(origin+'/demos/'+id+suffix)).status,200);
   for(const suffix of ['/assets/missing.png','/_expo/missing.js','/_expo/missing'])assert.equal((await fetch(origin+'/demos/'+id+suffix)).status,404);
  }
  assert.equal((await fetch(origin+'/_preservacao/medlive-template/')).status,404);
  assert.equal((await fetch(origin+'/demos/medlive/mapa')).headers.get('permissions-policy'),'camera=(self), microphone=(), geolocation=(self)');
  assert.equal((await fetch(origin+'/')).headers.get('permissions-policy'),'camera=(), microphone=(), geolocation=()');
  for(const engine of engines){
   let browser;try{browser=await playwright[engine].launch({headless:true,...(engine==='chromium'&&process.env.CHROMIUM_PATH?{executablePath:process.env.CHROMIUM_PATH}:{})});}
   catch(error){results.push({browser:engine,status:'unavailable',reason:error.message});continue;}
   try{
    for(const viewName of requested){
     const viewport=viewports[viewName],directory=path.join(evidence,engine,viewName);fs.mkdirSync(directory,{recursive:true});
     const context=await browser.newContext({viewport,reducedMotion:'reduce',colorScheme:viewName==='desktop'?'dark':'light'});
     // Mock only portfolio contact/analytics to avoid sending messages or real telemetry.
     let submitted=0;
     await context.route('**/api/**',async route=>{const req=route.request();if(new URL(req.url()).pathname==='/api/contact'){if(req.method()==='GET')await route.fulfill({json:{disponivel:true}});else{submitted++;await route.fulfill({json:{ok:true}})}}else await route.fulfill({json:{ok:true}})});
     await context.addInitScript(()=>{
      if(location.pathname.startsWith('/demos/termo'))Math.random=()=>0;
      if(location.pathname.startsWith('/demos/medlive')){window.__os005NativeGeo=navigator.geolocation.getCurrentPosition.bind(navigator.geolocation);navigator.geolocation.getCurrentPosition=(_,error)=>error({code:1,message:'Denied by deterministic test'})}
     });
     const page=await context.newPage(),errors=[],failures=[];await attach(page,errors,failures);
     const portfolio={browser:engine,viewport:viewName,app:'portfolio',status:'passed',errors,failures};
     try{
      const initialDemoRequests=[];page.on('request',req=>{if(req.url().includes('/demos/'))initialDemoRequests.push(req.url())});
      await page.goto(origin+'/');await page.locator('#hero-titulo').waitFor({state:'visible'});
      assert.equal(await page.getByRole('main').count(),1);assert.equal(await page.getByRole('link',{name:/Pular para o conteúdo/}).count(),1);
      const resume=page.getByRole('link',{name:/Currículo/}).first();assert.ok(await resume.getAttribute('href'));
      const resumePath=await resume.getAttribute('href');if(resumePath.startsWith('/'))assert.equal((await fetch(origin+resumePath)).status,200);
      const menu=page.getByRole('button',{name:'Abrir menu',exact:true});if(await menu.isVisible()){await menu.click();await page.getByRole('navigation',{name:'Principal, menu móvel',exact:true}).waitFor({state:'visible'});await page.keyboard.press('Escape');}
      await page.locator('#grupo-demais').scrollIntoViewIfNeeded();await page.getByRole('heading',{name:'Mais projetos',exact:true}).waitFor({state:'visible'});
      assert.deepEqual(initialDemoRequests,[],'Portfolio should not load demo bundles before a demo opens');
      for(const[id,name]of apps){const article=page.locator('[aria-labelledby="grupo-demais"] article').filter({has:page.getByRole('heading',{name,exact:true})});const action=article.getByRole('link',{name:/Testar aplicativo/});assert.equal(await action.getAttribute('href'),'/demos/'+id+'/');assert.equal(await article.getByRole('button',{name:/Ver estudo de caso/}).count(),1);assert.equal(await article.getByRole('link',{name:/Código/}).count(),1);}
      // Existing study dialog remains functional with the new projects.
      await page.locator('[aria-labelledby="grupo-demais"] article').filter({has:page.getByRole('heading',{name:'Termo Numérico',exact:true})}).getByRole('button',{name:/Ver estudo/}).click();
      await page.getByRole('dialog').waitFor({state:'visible'});await page.keyboard.press('Escape');await page.getByRole('dialog').waitFor({state:'hidden'});
      await page.locator('#contato').scrollIntoViewIfNeeded();const form=page.locator('form').filter({has:page.getByRole('button',{name:'Enviar mensagem',exact:true})});
      await form.getByRole('button',{name:'Enviar mensagem',exact:true}).click();assert.equal(submitted,0);
      await form.getByRole('textbox',{name:/nome/i}).fill('Pessoa Fictícia');await form.getByRole('textbox',{name:/e-mail/i}).fill('pessoa@example.test');await form.getByRole('textbox',{name:/mensagem/i}).fill('Teste local de integração, sem envio externo.');
      await form.getByRole('button',{name:'Enviar mensagem',exact:true}).click();await page.getByText('Mensagem enviada!',{exact:true}).waitFor({state:'visible'});assert.equal(submitted,1);
      const sizing=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(sizing.scroll<=sizing.width+1,'Portfolio horizontal overflow');
      portfolio.media=await checkMedia(page);assert.deepEqual(errors,[]);assert.deepEqual(failures,[]);
      await page.screenshot({path:path.join(directory,'portfolio.png'),fullPage:true});
     }catch(error){portfolio.status='failed';portfolio.failure=error.stack;}
     results.push(portfolio);console.log(`${portfolio.status}: ${engine}/${viewName}/portfolio${portfolio.failure?'\n'+portfolio.failure:''}`);
     for(const[id,name]of apps.filter(([id])=>!process.env.OS005_APPS||process.env.OS005_APPS.split(',').includes(id))){
      const e=[],f=[],entry={browser:engine,viewport:viewName,app:id,status:'passed',errors:e,failures:f};let popup;
      try{
       await page.locator('#grupo-demais').scrollIntoViewIfNeeded();const article=page.locator('[aria-labelledby="grupo-demais"] article').filter({has:page.getByRole('heading',{name,exact:true})});
       const opened=context.waitForEvent('page');await article.getByRole('link',{name:/Testar aplicativo/}).click();popup=await opened;await attach(popup,e,f);await popup.waitForLoadState('domcontentloaded');
       const base=origin+'/demos/'+id;assert.ok(popup.url().startsWith(base));const wrong=[];popup.on('request',req=>{if(req.url().startsWith(origin+'/')&&!req.url().startsWith(base+'/')&&req.url()!==base)wrong.push(req.url())});
       await flow(id,popup,base,directory);
       assert.ok(popup.url().startsWith(base));entry.media=await checkMedia(popup);assert.deepEqual(wrong,[]);assert.deepEqual(e,[]);assert.deepEqual(f,[]);
       const sizing=await popup.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,root:document.getElementById('root').getBoundingClientRect().width}));assert.ok(sizing.scroll<=sizing.width+1,'Demo horizontal overflow');assert.ok(sizing.root<=481);
       await popup.reload();await popup.waitForTimeout(id==='zookids'?1400:600);assert.deepEqual(e,[]);assert.deepEqual(f,[]);
       await popup.screenshot({path:path.join(directory,id+'.png'),fullPage:true});
      }catch(error){entry.status='failed';entry.failure=error.stack;if(popup)await popup.screenshot({path:path.join(directory,id+'-failed.png'),fullPage:true}).catch(()=>{});}
      results.push(entry);console.log(`${entry.status}: ${engine}/${viewName}/${id}${entry.failure?'\n'+entry.failure:''}`);if(popup)await popup.close();
     }
     await context.close();
    }
   }finally{await browser.close();}
  }
 }finally{server.close();}
 fs.writeFileSync(path.join(evidence,process.env.OS005_RESULTS_FILE || 'production-results.json'),JSON.stringify({timestamp:new Date().toISOString(),results},null,2)+'\n');
 if(results.some(result=>result.status==='failed'||result.status==='unavailable'))process.exitCode=1;
})().catch(error=>{console.error(error);process.exitCode=1});
