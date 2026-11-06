/* Run with Playwright installed externally; see docs/OS-005-TESTES.md. */
const playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browserName = process.env.OS005_BROWSER || 'chromium';
if (!['chromium', 'firefox', 'webkit'].includes(browserName)) throw new Error('OS005_BROWSER inválido');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const evidence = path.join(root, 'docs/evidencias/OS-005.1');
fs.mkdirSync(evidence, { recursive: true });
const apps = { termo: 'termo', agenda: 'Agenda', zookids: 'ZooKids', template: 'MedLive', medlive: 'medLiveProjeto/medLive' };
const results = [], servers = [];
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg', '.ico': 'image/x-icon', '.gif': 'image/gif', '.jpg': 'image/jpeg' };
const demoConfig = require('../demos.config.json');
const { createDemoServer } = require('../scripts/demo-server.cjs');
let origin;
async function serve(app) {
  if (!origin) {
    const server = createDemoServer({ preserveTemplate: true });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    servers.push(server); origin = `http://127.0.0.1:${server.address().port}`;
    for (const missing of ['/', '/demos/horoscopo/', '/assets/missing.png', '/_expo/missing.js', '/demos/termo/assets/missing.png', '/demos/termo/_expo/missing']) {
      const response = await fetch(origin + missing); assert.equal(response.status, 404, missing + ' must return 404');
    }
  }
  const id = app === 'template' ? 'medlive-template' : app;
  return origin + demoConfig.apps.find(item => item.id === id).basePath;
}
async function visible(locator) { await locator.waitFor({ state: 'visible', timeout: 15000 }); }
async function flow(app, page, base) {
  if (app === 'termo') {
    await visible(page.getByText('Termo Numérico', { exact: true }).filter({ visible: true }));
    await page.keyboard.type('0000'); await page.keyboard.press('Enter');
    await visible(page.getByText('Vc Ganhou', { exact: true }).filter({ visible: true }));
    await page.getByText('Repetir?', { exact: true }).filter({ visible: true }).click();
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) await page.getByRole('button', { name: 'Dígito 1', exact: true }).click();
      await page.getByRole('button', { name: 'Enviar tentativa' }).click();
    }
    await visible(page.getByText('Vc Perdeu', { exact: true }).filter({ visible: true }));
    await page.keyboard.press('9');
    await page.getByText('Repetir?', { exact: true }).filter({ visible: true }).click();
    await page.getByRole('button', { name: 'Dígito 2', exact: true }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByText('2', { exact: true }).filter({ visible: true }).count(), 2);
  }
  if (app === 'agenda') {
    await page.getByText('Cadastre-se', { exact: true }).filter({ visible: true }).click();
    await page.getByPlaceholder('Digite seu nome').fill('Pessoa Ficticia');
    await page.getByPlaceholder('dd/mm/aaaa').fill('01012000');
    await page.getByPlaceholder('Crie uma senha').fill('1234');
    await page.getByText('Concluir', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Olá, Pessoa Ficticia', { exact: true }).filter({ visible: true }));
    await page.getByRole('button', { name: 'Adicionar recebimento' }).click();
    await page.getByPlaceholder('Descrição', { exact: true }).fill('Salario ficticio');
    await page.getByPlaceholder('Valor', { exact: true }).fill('10000');
    await page.getByPlaceholder('Data', { exact: true }).fill('06112026');
    await page.getByPlaceholder('Hora', { exact: true }).fill('1200');
    await page.getByText('Salvar', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Salario ficticio', { exact: true }).filter({ visible: true }));
    await page.reload();
    await visible(page.getByText('Salario ficticio', { exact: true }).filter({ visible: true }));
    await page.getByText('Salario ficticio', { exact: true }).filter({ visible: true }).click();
    await page.getByPlaceholder('Descrição', { exact: true }).fill('Receita editada');
    await page.getByText('Salvar', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Receita editada', { exact: true }).filter({ visible: true }));
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('os005:agenda:dados')));
    assert.equal(stored[0].desc, 'Receita editada');
    await page.getByText('Receita editada', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Deletar', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Receita editada', { exact: true }).filter({ visible: true }).waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'Adicionar pagamento' }).focus(); await page.keyboard.press('Enter');
    await visible(page.getByPlaceholder('Descrição', { exact: true }).first());
    await page.getByPlaceholder('Descrição', { exact: true }).first().fill('Pagamento ficticio');
    await page.getByPlaceholder('Valor', { exact: true }).first().fill('1234');
    await page.getByPlaceholder('Data', { exact: true }).first().fill('06112026');
    await page.getByPlaceholder('Hora', { exact: true }).first().fill('1300');
    await page.getByText('Salvar', { exact: true }).filter({ visible: true }).first().click();
    await visible(page.getByText('Pagamento ficticio', { exact: true }).filter({ visible: true }));
    await visible(page.getByText(/-12,34/));
    await page.evaluate(() => localStorage.setItem('unrelated-data', 'preservar'));
    await page.getByRole('button', { name: 'Excluir todos os lançamentos' }).click();
    await page.getByText('Sim', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Pagamento ficticio', { exact: true }).filter({ visible: true }).waitFor({ state: 'hidden' });
    assert.equal(await page.evaluate(() => localStorage.getItem('os005:agenda:dados')), null);
    assert.equal(await page.evaluate(() => localStorage.getItem('unrelated-data')), 'preservar');
  }
  if (app === 'zookids') {
    await page.getByRole('button', { name: 'Cadastrar', exact: true }).click();
    await page.getByPlaceholder('Digite seu nome').fill('Pessoa Ficticia');
    await page.getByPlaceholder('dd/mm/aaaa').fill('01012000');
    await page.getByRole('textbox', { name: 'Digite seu email', exact: true }).fill('pessoa@example.test');
    await page.getByPlaceholder('Crie uma senha').fill('demo1234');
    await page.getByRole('button', { name: 'Continuar cadastro' }).click();
    await page.getByRole('button', { name: 'Ícone 2', exact: true }).click();
    await page.getByRole('button', { name: 'Salvar cadastro', exact: true }).click();
    await visible(page.getByRole('button', { name: 'Confirmar login', exact: true }));
    await page.getByRole('textbox', { name: 'Digite seu email', exact: true }).fill('pessoa@example.test');
    await page.getByPlaceholder('Digite sua senha').fill('demo1234');
    await page.getByRole('button', { name: 'Confirmar login' }).click();
    await visible(page.getByRole('button', { name: 'Território 1', exact: true }));
    for (let i = 1; i <= 6; i++) {
      const territory = page.getByRole('button', { name: `Território ${i}`, exact: true });
      if (i === 1) { await territory.focus(); await page.keyboard.press('Enter'); } else await territory.click();
      await visible(page.getByRole('button', { name: 'Voltar ao início', exact: true }));
      if (i === 1) {
        await page.getByRole('button', { name: 'Ver Onça-Pintada', exact: true }).click();
        await visible(page.getByText('Onça-Pintada', { exact: true }).filter({ visible: true }));
        // Modal has an image-only close action in the original UI.
        await page.locator('[aria-modal="true"]').getByRole('button').last().click();
      }
      if (i === 2) {
        await page.getByRole('button', { name: 'Ver Aves do Pantanal', exact: true }).click();
        await visible(page.getByText('Aves do Pantanal', { exact: true }).filter({ visible: true }));
        const image = page.locator('[aria-modal="true"] img[src^="data:image/svg+xml"]');
        await image.first().waitFor({ state: 'attached' });
        assert.ok(await image.first().evaluate(img => img.complete && img.naturalWidth > 0));
        await page.locator('[aria-modal="true"]').getByRole('button').last().click();
      }
      await page.getByRole('button', { name: 'Voltar ao início', exact: true }).click();
      await visible(page.getByRole('button', { name: 'Território 1', exact: true }));
    }
    await page.reload();
    await visible(page.getByRole('button', { name: 'Território 1', exact: true }));
    await page.evaluate(() => localStorage.setItem('unrelated-data', 'preservar'));
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByText('Logout', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByRole('button', { name: 'Entrar', exact: true }));
    assert.equal(await page.evaluate(() => localStorage.getItem('unrelated-data')), 'preservar');
  }
  if (app === 'template') {
    await page.getByRole('tab', { name: /Explore/ }).click();
    await visible(page.getByText('File-based routing', { exact: true }).filter({ visible: true }));
    await page.getByText('File-based routing', { exact: true }).filter({ visible: true }).click();
    await page.reload();
    await visible(page.getByText('File-based routing', { exact: true }).filter({ visible: true }));
  }
  if (app === 'medlive') {
    await page.goto(base + '/login');
    await page.getByRole('textbox', { name: 'seu@email.com', exact: true }).fill('demo@example.test');
    await page.getByPlaceholder('Sua senha').fill('demo1234');
    await page.getByText('Entrar', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Sua Saúde', { exact: true }).filter({ visible: true }));
    await page.getByText('Mercados Próximos', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('2 mercados fictícios no raio', { exact: true }).filter({ visible: true }));
    await page.getByLabel('Raio da busca').selectOption('5000');
    await visible(page.getByText('3 mercados fictícios no raio', { exact: true }).filter({ visible: true }));
    await page.getByRole('button', { name: 'Ver no mapa', exact: true }).first().click();
    await page.getByRole('button', { name: 'Usar minha localização' }).click();
    await visible(page.getByText('Localização negada ou indisponível. Centro ilustrativo mantido.', { exact: true }).filter({ visible: true }));
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByText('Alimentação', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Salada ilustrativa (salad)', { exact: true }).filter({ visible: true }));
    await page.getByText('Salada ilustrativa (salad)', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText(/Exemplo fictício: lave e misture/));
    await page.getByRole('button', { name: '✕', exact: true }).click();
    await page.getByRole('dialog').waitFor({ state: 'hidden' });
    const search = page.getByPlaceholder('Ex: pasta, chicken, salad, cake, soup...');
    await search.fill('pasta'); await search.press('Enter');
    await visible(page.getByText('Massa ilustrativa (pasta)', { exact: true }).filter({ visible: true }));
    await page.getByRole('button', { name: /Salada ilustrativa/ }).waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByText('Meu Perfil', { exact: true }).filter({ visible: true }).click();
    await visible(page.locator('input[value="Visitante Fictício"]'));
    const name = page.locator('input[value="Visitante Fictício"]');
    await name.fill('Visitante Editado');
    await page.getByText('Salvar Alterações', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Meditação', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Relaxamento Profundo', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Tocando...', { exact: true }).filter({ visible: true }));
    await page.getByText('Fechar', { exact: true }).filter({ visible: true }).click();
    await page.goto(base + '/login');
    await page.getByText('Crie uma', { exact: true }).filter({ visible: true }).click();
    await page.getByPlaceholder('Seu nome completo').fill('Pessoa Ficticia');
    await page.getByRole('textbox', { name: 'seu@email.com', exact: true }).fill('pessoa@example.test');
    await page.getByPlaceholder('DD/MM/AAAA').fill('01012000');
    await page.getByPlaceholder('(11) 99999-9999').fill('11000000000');
    await page.getByPlaceholder('Mínimo 4 caracteres').fill('demo1234');
    await page.getByRole('button', { name: /Continuar/ }).click();
    await page.getByPlaceholder('00000-000').fill('00000000');
    await page.getByPlaceholder('123', { exact: true }).fill('1');
    await page.getByRole('button', { name: /Continuar/ }).click();
    await page.getByPlaceholder('Ex: 70, 70.5').fill('70');
    await page.getByPlaceholder('Ex: 1.75').fill('1.75');
    await page.getByText('O+', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Finalizar Cadastro', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByText('Adicionar Foto', { exact: true }).filter({ visible: true }));
    const fixture = path.join(root, 'MedLive/assets/images/favicon.png');
    await page.getByText('Adicionar Foto', { exact: true }).filter({ visible: true }).click();
    let chooser = page.waitForEvent('filechooser');
    await page.getByText('Tirar Foto', { exact: true }).filter({ visible: true }).click();
    let file = await chooser;
    assert.ok(await file.element().getAttribute('capture'), 'Camera web delegates to capture file input');
    await file.setFiles(fixture);
    await page.getByRole('button', { name: 'Remover foto selecionada', exact: true }).click();
    await page.getByText('Adicionar Foto', { exact: true }).filter({ visible: true }).click();
    chooser = page.waitForEvent('filechooser');
    await page.getByText('Escolher da Galeria', { exact: true }).filter({ visible: true }).click();
    file = await chooser; await file.setFiles(fixture);
    await page.getByText('Finalizar com Foto', { exact: true }).filter({ visible: true }).click();
    await visible(page.getByPlaceholder('Sua senha'));
    await page.getByRole('textbox', { name: 'seu@email.com', exact: true }).fill('pessoa@example.test');
    await page.getByPlaceholder('Sua senha').fill('demo1234');
    await page.getByText('Entrar', { exact: true }).filter({ visible: true }).click();
    await page.getByText('Meu Perfil', { exact: true }).filter({ visible: true }).click();
    const profileDialog = page.getByRole('dialog');
    await visible(profileDialog);
    await visible(profileDialog.locator('input[value="Pessoa Ficticia"]'));
    const localPhoto = profileDialog.locator('img[src^="blob:"]').first();
    await localPhoto.waitFor({ state: 'attached' });
    await localPhoto.evaluate(img => img.decode());
    assert.ok(await localPhoto.evaluate(img => img.naturalWidth > 0), 'Selected photo displayed locally');
    await page.screenshot({ path: path.join(evidence, `medlive-foto-${page.viewportSize().width}.png`), fullPage: true });
  }
}
(async () => {
  const browser = await playwright[browserName].launch({ headless: true, ...(browserName === 'chromium' && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  try {
    for (const app of (process.env.OS005_APPS ? process.env.OS005_APPS.split(',') : Object.keys(apps))) {
      const base = await serve(app);
      for (const [viewportName, viewport] of Object.entries({ mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } })) {
        const context = await browser.newContext({ viewport });
        if (app === 'termo') await context.addInitScript(() => { Math.random = () => 0; });
        if (app === 'medlive') await context.addInitScript(() => { navigator.geolocation.getCurrentPosition = (_, error) => error({ code: 1, message: 'Denied in test' }); });
        const page = await context.newPage(), errors = [], externalRequests = [], wrongPaths = [], failedResponses = [];
        page.setDefaultTimeout(12000);
        page.on('pageerror', e => errors.push(e.message));
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        page.on('request', req => { if (!/^https?:/.test(req.url())) return; if (!req.url().startsWith(origin + '/')) externalRequests.push(req.url()); else if (!req.url().startsWith(base + '/') && req.url() !== base) wrongPaths.push(req.url()); });
        page.on('response', response => { if (response.status() >= 400) failedResponses.push({ url: response.url(), status: response.status() }); });
        page.on('dialog', dialog => dialog.accept());
        const entry = { browser: browserName, app, viewport: viewportName, status: 'passed', basePath: base.slice(origin.length), errors, externalRequests, wrongPaths, failedResponses };
        try {
          await page.goto(base + '/');
          await flow(app, page, base);
          assert.ok(page.url().startsWith(base), 'Navigation escaped demo prefix');
          await page.evaluate(() => document.fonts.ready);
          assert.deepEqual(wrongPaths, [], 'Requests outside the demo base path');
          assert.deepEqual(failedResponses, [], 'Missing files or assets');
          assert.deepEqual(errors, [], 'Critical browser errors');
          if (app === 'medlive') assert.deepEqual(externalRequests, [], 'Fictitious demo should not send data to external APIs');
          const media = await page.evaluate(async () => {
            const images = [...document.querySelectorAll('img[src]')].filter(img => img.getAttribute('src') && img.getClientRects().length);
            const badImages = [];
            await Promise.all(images.map(async img => { try { await img.decode(); if (!img.naturalWidth) badImages.push(img.getAttribute('src')); } catch { badImages.push(img.getAttribute('src')); } }));
            return { checkedImages: images.length, badImages, badFonts: [...document.fonts].filter(font => font.status === 'error').map(font => font.family) };
          });
          entry.media = media;
          assert.deepEqual(media.badImages, [], 'Image decoding failed');
          assert.deepEqual(media.badFonts, [], 'Font loading failed');
          const sizing = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: innerWidth, root: document.getElementById('root').getBoundingClientRect().width }));
          assert.ok(sizing.scroll <= sizing.width + 1, 'Page should not overflow horizontally');
          assert.ok(sizing.root <= 481, 'Desktop app width must be limited');
          // Also verify direct refresh of exported root after completing the flow.
          await page.reload(); await page.waitForTimeout(app === 'zookids' ? 5200 : app === 'agenda' ? 2500 : 500);
          assert.deepEqual(errors, []);
        } catch (error) { entry.status = 'failed'; entry.failure = error.stack; }
        await page.screenshot({ path: path.join(evidence, `${browserName === 'chromium' ? '' : browserName + '-'}${app}-${viewportName}.png`), fullPage: true });
        results.push(entry); console.log(`${entry.status}: ${app}/${viewportName}${entry.failure ? '\n' + entry.failure : ''}`);
        await context.close();
      }
    }
  } finally { await browser.close(); servers.forEach(server => server.close()); }
  fs.writeFileSync(path.join(evidence, process.env.OS005_RESULTS_FILE || (browserName === 'chromium' ? 'web-results.json' : `web-results-${browserName}.json`)), JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2) + '\n');
  if (results.some(result => result.status === 'failed')) process.exitCode = 1;
})().catch(error => { console.error(error); servers.forEach(server => server.close()); process.exitCode = 1; });
