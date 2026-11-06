# OS-005 FINAL — Contexto para retomada

**Pausado a pedido do usuário em 06/11/2026. Não retomar automaticamente.** O usuário acredita ter os projetos/assets completos no computador e pretende fornecê-los depois. Os processos de testes ainda ativos e seus navegadores foram interrompidos. Nenhum push, commit, deploy remoto ou alteração de domínio foi executado.

## Objetivo e autorização vigentes

Finalizar os cinco apps web e integrá-los ao portfólio existente em `/demos/termo/`, `/demos/agenda/`, `/demos/zookids/`, `/demos/medlive/` e `/demos/horoscopo/`. A OS FINAL autoriza correções, atualizações compatíveis, substituições próprias/licenciadas e alteração do portfólio. Push/deploy remoto/domínio continuam exigindo aprovação adicional. Esta pausa suspende o trabalho, não autoriza continuação automática.

## Repositórios e preservação

- Apps: `/Users/noweb/Desktop/PAM`, remoto `Luhenr1que/projetos-etec`; branch `main`, HEAD inicial `d5afc640eb2fa99b90174e5720a62db2c948b53a`.
- Portfólio: `/Users/noweb/Desktop/portifolio-react`, remoto `Luhenr1que/portifolio-react`.
- Ambos tinham alterações locais antes desta execução. Snapshot de branch/HEAD e hashes dos arquivos modificados: `docs/evidencias/OS-005-FINAL/estado-inicial.json`.
- No portfólio já havia mudanças em package.json/package-lock.json, App.tsx, main.tsx, useMotion e arquivos de história/cena 3D. Foram preservadas; a integração não redesenhou os componentes.
- Documentos OS-005 e OS-005.1 são históricos. Ainda **não foi produzido** o relatório consolidado exigido `docs/OS-005-FINAL.md`; não substituir por conclusão fictícia.

## Implementado nesta execução

### Assets substitutos provisórios, agora passíveis de comparação com os originais do usuário

A busca local encontrou apenas o PNG corrompido do ZooKids. Uma tentativa de recuperar esse arquivo no caminho público do repositório ZooKids retornou 404. A OS FINAL passou a permitir substituições identificadas.

Foi criado `scripts/create-original-assets.cjs`: desenhos vetoriais próprios renderizados em PNG via sharp instalado isoladamente em `/tmp/os005-final-assets`, e dois sons PCM sintetizados. Licença CC0 registrada junto aos assets. Não foi usada imagem/som aleatório de terceiro.

- **Horóscopo:** 17 PNGs recriados em `horoscupo/assets/`, incluindo os 12 signos e `img/horos.png`, icon, splash-icon, adaptive-icon e favicon. Fontes SVG em `horoscupo/assets/vetores/`. O aviso HTML identifica arte substituta. Interface teve estilos ajustados, modais roláveis e título; regra/datas da OS-005.1 foi mantida. Nome Sagitário corrigido. **Build passou, mas a validação funcional final da interface ainda falta.**
- **ZooKids:** `assets/img/t2/avesPantanalR.png` substituído por ilustração autoral de tuiuiú. SVG em `assets/vetores/aves-pantanal-substituicao.svg`. O arquivo corrompido anterior foi preservado em `assets/vetores/avesPantanalR.original-corrompido.bin`. Helper web usa agora o PNG íntegro. Modal identifica “Ilustração substituta autoral — CC0”.
- **MedLive:** novos `assets/music/botao.wav` e `botCode.wav`. Providers native/web reproduzem efeitos com tratamento de indisponibilidade; a grade Home chama playSomBot. Músicas existentes preservadas. Aviso removeu a informação antiga de efeitos ausentes e identifica substitutos.

Quando os originais forem fornecidos, comparar e preferir os corretos. Não executar o gerador indiscriminadamente sobre arquivos originais recém-restaurados. Efeitos agora referenciam WAV; se forem recuperados MP3 originais, ajustar as referências conscientemente.

### Configuração e empacotamento

- `demos.config.json`: Horóscopo passou a `public: true`, `buildable: true`; template continua excluído. Nova saída `artifacts/os005-final`.
- Scripts existentes `build-demos.cjs`, `prepare-demos.cjs`, `demo-server.cjs` e `audit-demos.cjs` foram aproveitados e ajustados para cinco apps/saída final/evidências separadas.
- Public HTMLs limitam também `[aria-modal="true"]`, para manter proporção mobile no desktop.
- `scripts/integrate-portfolio.cjs`: verifica repositório/manifesto/hashes e copia só exports para `public/demos` do portfólio. Executado com sucesso.

### Integração real no portfólio, já aplicada localmente

- `src/data/projetos.ts`: novos cards Termo, Agenda e Horóscopo; ZooKids/MedLive existentes receberam links reais. Todos com rótulo **Testar aplicativo** e `/demos/<app>/`. GitHub/estudos de caso/ações existentes preservados. MedLive tem descrição de demo fictícia; tecnologias corrigidas.
- `public/demos/`: cinco exports copiados. `public/demos-manifest.json`: hashes.
- `package.json`: build agora `tsc -b && vite build && node scripts/integrar-demos.mjs`; script `demos:verificar` acrescentado.
- `scripts/integrar-demos.mjs`: valida as cinco demos e hashes em public/dist, sem importar seus bundles no React.
- `vercel.json`: rewrites por app com exclusão de assets faltantes; permissões camera/geolocation somente no MedLive. Headers de segurança/cache anteriores preservados. Nada foi aplicado remotamente.
- `scripts/serve-production.cjs` no PAM: servidor local da distribuição real `portifolio-react/dist`, usando transformação das regras do vercel.json real pela ferramenta Vercel. Suporta ranges de áudio.

## Dependências e segurança

Aplicados patches **dentro dos SDKs existentes**: Expo 53.0.27 (Termo/Agenda/ZooKids/template), 54.0.38 (MedLive completo), 52.0.49 (Horóscopo). RN dos apps SDK53 alinhado a 0.79.6 quando necessário e Horóscopo a 0.76.9. React 19.1.0/React DOM 19.1.0 do MedLive foram fixados, sem upgrade de React principal.

- Axios MedLive atualizado para 1.21.0.
- Dependências vulneráveis transitivas atualizadas apenas dentro das faixas permitidas; Navigation atualizado.
- CLI React Native Community direta e sem uso foi removida do ZooKids (scripts são Expo).
- expo-asset explícito com versão compatível em cada SDK; template recebeu query-string 7.1.3 e patch Expo Router 5.1.11 compatível para uma dependência antes indireta.
- Override PostCSS 8.5.32 nos apps, mesma versão principal.
- Override tar 7.5.22 no subtree @expo/cli do Horóscopo, para o tar 6 vulnerável. **Reauditoria final/validação específica desse override ainda deve ser concluída.**
- Não foi executado `npm audit fix --force`.
- A auditoria intermediária reduziu críticos a zero nos SDKs 53/54, antes das últimas correções. **Não afirmar auditoria final zerada:** relatórios residuais precisam ser gerados depois dos últimos overrides. Template não público continua com decoder legado; image-size de build e outros avisos precisam triagem residual.
- `bundle-module-exposure.json` em evidências finais foi gerado com source maps em `dist-audit/` separado e **passou nos cinco apps públicos**. image-size, postcss, tar, shell-quote, axios e xmldom não aparecem nos sources dos bundles públicos; Navigation aparece nos três apps com navegação. Source maps não foram copiados para o portfólio.
- Chaves históricas Google continuam exigindo ação externa do proprietário. Não repetir valores. Backend Laravel das demos continua desconectado.

## Resultados efetivamente confirmados

- Build baseline do portfólio **antes** da integração passou.
- Última execução dos scripts de build: **seis builds web passaram**, incluindo cinco demos e template preservado. Registro: `docs/evidencias/OS-005-FINAL/builds.json`.
- Build do portfólio integrado passou e verificou os hashes das cinco demos em `dist`. JS principal passou aproximadamente de 307,41 kB para 309,25 kB, não recebeu bundles Expo; cena 3D lazy original preservada. Log copiado para evidências.
- Exportações Android **ZooKids, Horóscopo e MedLive passaram**, com novos assets. Logs em evidências finais. Isso não equivale a teste em dispositivo.
- 39 verificações de datas do Horóscopo passaram.
- Testes existentes de formulários: inicialmente 4/8 passaram; fixture de orçamento estava sem o telefone já obrigatório na API. Foi acrescentado telefone fictício à fixture e teste explícito de rejeição sem telefone, sem alterar o backend. **9/9 passaram**. Nenhuma mensagem real foi enviada.
- Verificador privado do portfólio retornou configuração incompleta: variáveis de servidor precisam ser reconciliadas com a configuração atual antes de produção. O log bruto está em `/tmp/os005-final-private-config.log`; não publicar valores/segredos.
- Playwright **Chromium, Firefox e WebKit foram instalados com sucesso**, em cache local. Ainda falta a execução final nos três motores/quatro viewports.

## Onde o trabalho parou

O primeiro smoke contra o portfólio integrado falhou por um **seletor do teste**, não por build: `#grupo-demais` é o h3, não o contêiner dos cards. O seletor foi corrigido para `[aria-labelledby="grupo-demais"] article`.

Foi iniciado um reteste Chromium/mobile priorizando Horóscopo, porém **não havia resultado consolidado ao pausar**. O processo restante foi encerrado por solicitação do usuário. Não classificar os fluxos finais como aprovados.

Testes novos:

- `tests/demo-flows.cjs`: reaproveita os fluxos existentes, adapta a imagem ZooKids e acrescenta 12 signos/erros/refresh do Horóscopo. Aceita diretório de evidências por execução.
- `tests/os005-final.cjs`: abre o portfólio real, verifica Mais projetos, botões e popups, formulários com mocks (sem envio externo), currículo, media, overflow, deep paths e headers; executa apps nos quatro viewports e motores escolhidos.
- O wrapper `tests/os005-web.cjs` **ainda aponta para a suíte OS-005.1**, não foi trocado para o runner final. Fazer isso somente depois de estabilizar o runner final, preservando o legado.

## Próximos passos quando o usuário pedir retomada

1. Receber e comparar os projetos/assets completos do usuário; restaurar originais íntegros sem sobrescrever os avanços funcionais ou alterações locais alheias. Conferir nomes/capitalização e referências WAV/MP3.
2. Atualizar atribuições/avisos/gerador para não regenerar substitutos sobre originais restaurados.
3. Reexecutar builds dos apps efetivamente alterados, reagregar, transferir e buildar portfólio.
4. Estabilizar o smoke final; verificar especialmente o Horóscopo na UI, o tamanho dos modais e responsividade.
5. Executar a matriz final Chromium/Firefox/WebKit × 390×844, 768×1024, 1440×900 e 1920×1080, com flows, refresh, deep links, permissões, isolamento e regressões do portfólio. Testar cores/preferências sem redesenhar: a versão atual do portfólio força tema claro no index.html e tem estilos legados dark, não havia toggle antes da integração.
6. Reauditar dependências após os últimos overrides, separar desenvolvimento/runtime e validar a configuração Vercel real (não só o exemplo antigo de quatro demos). Reavaliar configuração de formulários sem enviar mensagens reais.
7. Examinar a distribuição final por segredos/arquivos indevidos e correspondência com manifestos; manter template e source maps de auditoria fora da publicação.
8. Atualizar o ponto de entrada de testes, inventário final de ambos os repositórios e produzir **somente o relatório final obrigatório `docs/OS-005-FINAL.md`**, com resultados reais e riscos residuais.
9. Apresentar distribuição pronta para aprovação adicional de deploy. Não executar commit, push ou deploy sem a autorização correspondente.

## Comandos e caminhos úteis (não executados automaticamente na retomada)

```sh
# Gerador de substitutos: não usar sobre os originais que o usuário trouxer.
ASSET_RENDERER_MODULE=/tmp/os005-final-assets/node_modules/sharp node scripts/create-original-assets.cjs

node scripts/build-demos.cjs --include-template
node scripts/prepare-demos.cjs
node scripts/integrate-portfolio.cjs /Users/noweb/Desktop/portifolio-react
# O comando acima escreve fora do workspace PAM; requer execução autorizada pelo ambiente.

# Dentro do portfólio:
npm run build
node --test tests/forms-api.test.mjs

# Dentro do PAM, após build integrado:
PLAYWRIGHT_MODULE=/tmp/os005-testing/node_modules/playwright VERCEL_ROUTING_MODULE=/tmp/os0051-config-tools/node_modules/@vercel/routing-utils OS005_BROWSERS=chromium OS005_VIEWPORTS=mobile OS005_RESULTS_FILE=smoke-results.json node tests/os005-final.cjs
# Omitir filtros de browser/viewport para a matriz completa.
```

Distribuição local integrada: `/Users/noweb/Desktop/portifolio-react/dist/`. Pacote intermediário: `artifacts/os005-final/`. Evidências desta execução: `docs/evidencias/OS-005-FINAL/`. Logs temporários adicionais: `/tmp/os005-final-*` (podem desaparecer; os principais foram copiados para evidências na pausa).
