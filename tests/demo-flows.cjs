const assert = require('node:assert/strict');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const evidence = path.resolve(root, process.env.OS005_EVIDENCE_DIR || 'docs/evidencias/OS-005-FINAL');
async function visible(locator) { await locator.waitFor({ state: 'visible', timeout: 15000 }); }
async function flow(app, page, base, evidenceDir = evidence) {
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
        const image = page.locator('[aria-modal="true"] img[src*="avesPantanalR"]');
        await image.first().waitFor({ state: 'attached' });
        await image.first().evaluate(img => img.decode());
        assert.ok(await image.first().evaluate(img => img.naturalWidth > 0));
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
  if (app === 'horoscopo') {
    await page.getByRole('button', { name: 'Verificar', exact: true }).click();
    await visible(page.getByText('Digite uma data valida!!!', { exact: true }));
    await page.getByRole('button', { name: 'Tentar Novamente', exact: true }).click();
    const signs = [['21','marco','Áries'],['20','maio','Touro'],['21','maio','Gêmeos'],['21','junho','Câncer'],['23','julho','Leão'],['23','agosto','Virgem'],['23','setembro','Libra'],['23','outubro','Escorpião'],['22','novembro','Sagitário'],['22','dezembro','Capricórnio'],['20','janeiro','Aquário'],['29','fevereiro','Peixes']];
    for (const [day, month, name] of signs) {
      await page.getByLabel('Dia de nascimento', { exact: true }).selectOption(day);
      await page.getByLabel('Mês de nascimento', { exact: true }).selectOption(month);
      await page.getByRole('button', { name: 'Verificar', exact: true }).click();
      await visible(page.getByText(name, { exact: true }));
      const images = page.getByRole('dialog').locator('img[src]');
      for (const image of await images.all()) await image.evaluate(img => img.decode());
      await page.getByRole('button', { name: 'Novo Teste', exact: true }).click();
    }
    await page.getByLabel('Dia de nascimento', { exact: true }).selectOption('30');
    await page.getByLabel('Mês de nascimento', { exact: true }).selectOption('fevereiro');
    await page.getByRole('button', { name: 'Verificar', exact: true }).click();
    await visible(page.getByText('Digite uma data valida!!!', { exact: true }));
    await page.getByRole('button', { name: 'Tentar Novamente', exact: true }).click();
    await page.reload();
    await visible(page.getByRole('button', { name: 'Verificar', exact: true }));
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
    await page.screenshot({ path: path.join(evidenceDir, `medlive-foto-${page.viewportSize().width}.png`), fullPage: true });
  }
}
module.exports = { flow };
