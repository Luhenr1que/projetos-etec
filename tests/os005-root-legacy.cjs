/* Run with Playwright installed externally; see docs/OS-005-TESTES.md. */
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const evidence = path.join(root, 'docs/evidencias');
fs.mkdirSync(evidence, { recursive: true });
const apps = { termo: 'termo', agenda: 'Agenda', zookids: 'ZooKids', template: 'MedLive', medlive: 'medLiveProjeto/medLive' };
const results = [], servers = [];
const types = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.mp3': 'audio/mpeg', '.ico': 'image/x-icon', '.gif': 'image/gif', '.jpg': 'image/jpeg' };
async function serve(app) {
  const dir = path.join(root, apps[app], 'dist');
  const server = http.createServer((req, res) => {
    let target = path.resolve(dir, '.' + decodeURIComponent(new URL(req.url, 'http://local').pathname));
    if (!target.startsWith(dir + path.sep) && target !== dir) { res.writeHead(403).end(); return; }
    if (fs.existsSync(target) && fs.statSync(target).isDirectory()) target = path.join(target, 'index.html');
    if (!fs.existsSync(target) && fs.existsSync(target + '.html')) target += '.html';
    if (!fs.existsSync(target) && !path.extname(target)) target = path.join(dir, 'index.html');
    if (!fs.existsSync(target)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'Content-Type': types[path.extname(target)] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(res);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); servers.push(server);
  return `http://127.0.0.1:${server.address().port}`;
}
async function visible(locator) { await locator.waitFor({ state: 'visible', timeout: 15000 }); }
async function flow(app, page) {
  if (app === 'termo') {
    await visible(page.getByText('Termo Numérico', { exact: true }));
    await page.keyboard.type('0000'); await page.keyboard.press('Enter');
    await visible(page.getByText('Vc Ganhou', { exact: true }));
    await page.getByText('Repetir?', { exact: true }).click();
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 4; j++) await page.getByRole('button', { name: 'Dígito 1', exact: true }).click();
      await page.getByRole('button', { name: 'Enviar tentativa' }).click();
    }
    await visible(page.getByText('Vc Perdeu', { exact: true }));
    await page.keyboard.press('9');
    await page.getByText('Repetir?', { exact: true }).click();
    await page.getByRole('button', { name: 'Dígito 2', exact: true }).focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.getByText('2', { exact: true }).count(), 2);
  }
  if (app === 'agenda') {
    await page.getByText('Cadastre-se', { exact: true }).click();
    await page.getByPlaceholder('Digite seu nome').fill('Pessoa Ficticia');
    await page.getByPlaceholder('dd/mm/aaaa').fill('01012000');
    await page.getByPlaceholder('Crie uma senha').fill('1234');
    await page.getByText('Concluir', { exact: true }).click();
    await visible(page.getByText('Olá, Pessoa Ficticia', { exact: true }));
    await page.getByRole('button', { name: 'Adicionar recebimento' }).click();
    await page.getByPlaceholder('Descrição', { exact: true }).fill('Salario ficticio');
    await page.getByPlaceholder('Valor', { exact: true }).fill('10000');
    await page.getByPlaceholder('Data', { exact: true }).fill('06112026');
    await page.getByPlaceholder('Hora', { exact: true }).fill('1200');
    await page.getByText('Salvar', { exact: true }).click();
    await visible(page.getByText('Salario ficticio', { exact: true }));
    await page.reload();
    await visible(page.getByText('Salario ficticio', { exact: true }));
    await page.getByText('Salario ficticio', { exact: true }).click();
    await page.getByPlaceholder('Descrição', { exact: true }).fill('Receita editada');
    await page.getByText('Salvar', { exact: true }).click();
    await visible(page.getByText('Receita editada', { exact: true }));
    const stored = await page.evaluate(() => JSON.parse(localStorage.getItem('os005:agenda:dados')));
    assert.equal(stored[0].desc, 'Receita editada');
    await page.getByText('Receita editada', { exact: true }).click();
    await page.getByText('Deletar', { exact: true }).click();
    await page.getByText('Receita editada', { exact: true }).waitFor({ state: 'hidden' });
    await page.getByRole('button', { name: 'Adicionar pagamento' }).focus(); await page.keyboard.press('Enter');
    await visible(page.getByPlaceholder('Descrição', { exact: true }).first());
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
      await page.getByRole('button', { name: `Território ${i}`, exact: true }).click();
      await visible(page.getByRole('button', { name: 'Voltar ao início', exact: true }));
      if (i === 1) {
        await page.getByRole('button', { name: 'Ver Onça-Pintada', exact: true }).click();
        await visible(page.getByText('Onça-Pintada', { exact: true }));
        // Modal has an image-only close action in the original UI.
        await page.locator('[aria-modal="true"]').getByRole('button').last().click();
      }
      await page.getByRole('button', { name: 'Voltar ao início', exact: true }).click();
    }
    await page.reload();
    await visible(page.getByRole('button', { name: 'Território 1', exact: true }));
    await page.evaluate(() => localStorage.setItem('unrelated-data', 'preservar'));
    await page.getByRole('button', { name: 'Abrir menu' }).click();
    await page.getByText('Logout', { exact: true }).click();
    await visible(page.getByRole('button', { name: 'Entrar', exact: true }));
    assert.equal(await page.evaluate(() => localStorage.getItem('unrelated-data')), 'preservar');
  }
  if (app === 'template') {
    await page.getByRole('tab', { name: /Explore/ }).click();
    await visible(page.getByText('File-based routing', { exact: true }));
    await page.getByText('File-based routing', { exact: true }).click();
    await page.reload();
    await visible(page.getByText('File-based routing', { exact: true }));
  }
  if (app === 'medlive') {
    await page.getByText('Mercados Próximos', { exact: true }).click();
    await visible(page.getByText('2 mercados fictícios no raio', { exact: true }));
    await page.getByLabel('Raio da busca').selectOption('5000');
    await visible(page.getByText('3 mercados fictícios no raio', { exact: true }));
    await page.getByRole('button', { name: 'Ver no mapa', exact: true }).first().click();
    await page.getByRole('button', { name: 'Usar minha localização' }).click();
    await visible(page.getByText('Localização negada ou indisponível. Centro ilustrativo mantido.', { exact: true }));
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByText('Alimentação', { exact: true }).click();
    await visible(page.getByText('Salada ilustrativa (salad)', { exact: true }));
    await page.getByText('Salada ilustrativa (salad)', { exact: true }).click();
    await visible(page.getByText(/Exemplo fictício: lave e misture/));
    await page.getByRole('button', { name: '✕', exact: true }).click();
    await page.getByRole('button', { name: 'Voltar', exact: true }).click();
    await page.getByText('Meu Perfil', { exact: true }).click();
    await visible(page.locator('input[value="Visitante Fictício"]'));
    const name = page.locator('input[value="Visitante Fictício"]');
    await name.fill('Visitante Editado');
    await page.getByText('Salvar Alterações', { exact: true }).click();
    await page.getByText('Meditação', { exact: true }).click();
    await page.getByText('Relaxamento Profundo', { exact: true }).click();
    await visible(page.getByText('Tocando...', { exact: true }));
    await page.getByText('Fechar', { exact: true }).click();
  }
}
(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}) });
  try {
    for (const app of (process.env.OS005_APPS ? process.env.OS005_APPS.split(',') : Object.keys(apps))) {
      const base = await serve(app);
      for (const [viewportName, viewport] of Object.entries({ mobile: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } })) {
        const context = await browser.newContext({ viewport });
        if (app === 'termo') await context.addInitScript(() => { Math.random = () => 0; });
        if (app === 'medlive') await context.addInitScript(() => { navigator.geolocation.getCurrentPosition = (_, error) => error({ code: 1, message: 'Denied in test' }); });
        const page = await context.newPage(), errors = [], externalRequests = [];
        page.setDefaultTimeout(12000);
        page.on('pageerror', e => errors.push(e.message));
        page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });
        page.on('request', req => { if (!req.url().startsWith(base) && /^https?:/.test(req.url())) externalRequests.push(req.url()); });
        page.on('dialog', dialog => dialog.accept());
        const entry = { app, viewport: viewportName, status: 'passed', errors, externalRequests };
        try {
          await page.goto(base + '/');
          await flow(app, page);
          assert.deepEqual(errors, [], 'Critical browser errors');
          if (app === 'medlive') assert.deepEqual(externalRequests, [], 'Fictitious demo should not send data to external APIs');
          const sizing = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: innerWidth, root: document.getElementById('root').getBoundingClientRect().width }));
          assert.ok(sizing.scroll <= sizing.width + 1, 'Page should not overflow horizontally');
          assert.ok(sizing.root <= 481, 'Desktop app width must be limited');
          // Also verify direct refresh of exported root after completing the flow.
          await page.reload(); await page.waitForTimeout(app === 'zookids' ? 4000 : app === 'agenda' ? 2500 : 500);
          assert.deepEqual(errors, []);
        } catch (error) { entry.status = 'failed'; entry.failure = error.stack; }
        await page.screenshot({ path: path.join(evidence, `${app}-${viewportName}.png`), fullPage: true });
        results.push(entry); console.log(`${entry.status}: ${app}/${viewportName}${entry.failure ? '\n' + entry.failure : ''}`);
        await context.close();
      }
    }
  } finally { await browser.close(); servers.forEach(server => server.close()); }
  fs.writeFileSync(path.join(evidence, 'web-results.json'), JSON.stringify({ timestamp: new Date().toISOString(), results }, null, 2) + '\n');
  if (results.some(result => result.status === 'failed')) process.exitCode = 1;
})().catch(error => { console.error(error); servers.forEach(server => server.close()); process.exitCode = 1; });
