# OS-005 — Testes e evidências

Data: 06/11/2026. Evidências automatizadas em [evidencias/](evidencias/); resultados finais do navegador em `web-results.json`, inventário e hashes das builds em `bundle-audit.json`. Não considerar build sozinha como aprovação funcional.

## Ambiente e instalações

Shell inicial: Node 22.18.0, npm 10.9.3; executor de rede reportou npm 11.12.1. Playwright 1.51.1 instalado isoladamente em `/tmp/os005-testing`, Chromium 131 já disponível no ambiente. Nenhuma dependência de testes compartilhada entre aplicativos.

Comando de instalação executado nas cinco pastas viáveis:

```sh
npm ci --ignore-scripts --no-audit --no-fund --cache /tmp/os005-npm-network
```

Instalações limpas concluídas para Termo, Agenda, ZooKids, MedLive template (após reparo do lockfile) e MedLive completo (repetida após Leaflet, 886 pacotes). Lifecycle scripts foram desabilitados; não se executou `npm audit` neste comando. Warnings de bibliotecas legadas não foram ocultados nem corrigidos com atualizações indiscriminadas. O MedLive completo reportou peers React 16 de dependências legadas, apesar de usar React 19; caminhos web exercitados não usam esses componentes.

Falhas iniciais: sandbox impediu acesso ao cache padrão/rede (ENOTFOUND e erro de finalização npm). Foi usado cache temporário e acesso de rede aprovado. O template falhou com 404 em simple-swizzle 0.2.3; instalação limpa com patch 0.2.4 passou.

## Builds e servidores

`npm run build:web` (`expo export --platform web`) foi executado nas cinco pastas. Nas revalidações foi usado `-- --max-workers 2` para limitar concorrência. Build Expo Router pré-renderizada apresentou React #418 em refresh; alterada para SPA e revalidada. ZooKids falhou inicialmente na leitura da imagem corrompida; fallback específico web permitiu a build, preservando o arquivo mobile original.

Servidores de produção locais iniciados para cada artefato, com requisições reais por Chromium. Servidor Expo de desenvolvimento Termo iniciado com:

```sh
CI=1 EXPO_NO_TELEMETRY=1 npm run web -- --offline --port 8191
```

GET local retornou HTTP 200. Os outros comandos de desenvolvimento foram preparados, mas não se declara teste interativo de servidor Expo de cada app: seus fluxos foram testados nas builds de produção servidas localmente.

## Reproduzir os testes funcionais

Com as cinco builds geradas, instalar ferramentas **fora dos apps**:

```sh
npm install --prefix /tmp/os005-testing playwright@1.51.1
/tmp/os005-testing/node_modules/.bin/playwright install chromium
PLAYWRIGHT_MODULE=/tmp/os005-testing/node_modules/playwright node tests/os005-web.cjs
python3 scripts/audit-web.py
git diff --check
```

Opcional: `CHROMIUM_PATH` indica um executável Chromium já instalado. `OS005_APPS=termo,agenda` restringe o conjunto para depurar; a verificação final deve rodar sem esse filtro. O script cria servidores locais temporários por app, fecha-os ao finalizar, registra falhas sem convertê-las em aprovação e captura PNG por viewport.

## Cobertura

Viewports: mobile 390×844 e desktop 1440×900, Chromium. Captura de `pageerror` e console.error, controle de largura máxima e overflow, refresh real, dados exclusivamente fictícios.

- Termo: resposta determinística somente no teste (`Math.random` interceptado no browser), vitória, reinício, seis tentativas erradas, derrota, proteção após fim e acionamento por teclado físico/Enter em botão focado.
- Agenda: cadastro, recebimento, saldo, refresh/persistência, edição, exclusão e abertura de pagamento por teclado. Namespaces web confirmados em localStorage.
- ZooKids: cadastro com ícone, login local, navegação pelos seis territórios, modal de animal, retorno, refresh com login salvo e logout que preserva chave de outro app. Áudio por gesto não deve produzir rejeição não tratada. Não se certifica qualidade sonora pela ausência de erros.
- Template: Home → Explore, expandir conteúdo e refresh direto de `/explore`, sem divergência de hidratação na saída SPA.
- MedLive: mapa interativo e mudança de raio, focar mercado, tratamento de geolocalização negada (simulado deterministicamente), receitas/detalhe, perfil/edição, meditação/estado de reprodução. Verificação de ausência de chamadas externas nos fluxos fictícios. Mapa base opcional e câmera/seleção de arquivo não foram exercitados nessa suíte.

Houve falhas de sincronização/seletores na primeira suíte (campos de telas retidas pelo navigator e nomes aninhados); foram corrigidas nos testes sem declarar esses casos como sucesso retroativamente. Reteste expôs callback de zoom Leaflet após desmontagem; animações foram desativadas e cleanup reforçado. Overflow horizontal do ZooKids durante animações foi limitado no contêiner web. A suíte final teve 10/10 cenários aprovados, sem erros críticos capturados. `npm run lint` no MedLive template passou. O JSON final é a fonte do resultado da execução final.

## Mobile

Executado em cada uma das cinco pastas:

```sh
npx expo export --platform android --output-dir dist-native
```

Termo, Agenda, MedLive template e MedLive completo geraram bundles Android. ZooKids falhou pela imagem corrompida `avesPantanalR.png`, falha preexistente e mantida documentada. Os diretórios `dist-native/` são ignorados no Git. Uma tentativa inicial de exportar para `/tmp` foi recusada pela CLI, que exige saída dentro do projeto; não foi considerada aprovação.

Exportar JavaScript/Hermes e assets não cria APK/AAB, não prova runtime mobile e não certifica áudio, permissões, mapas, câmera ou upload. iOS e aparelhos/simuladores não foram executados. Configuração de chaves mobile é necessária para mapas MedLive; efeitos com arquivos ausentes precisam restauração.

## Segurança e limites

`python3 scripts/audit-web.py` verifica artefatos textuais exportados contra padrões de chave Google, AWS, GitHub, private key e endpoints HTTP privados. Nenhum padrão encontrado nas cinco builds verificadas. O JSON inclui SHA-256 e tamanho de cada arquivo. A análise é direcionada; não é prova universal de ausência de segredos nem auditoria de backend.

Sem chamadas autenticadas reais, cadastro de pessoa real, teste de serviços pagos ou publicação. Não houve testes do backend Laravel, PHPUnit, CORS de APIs reais, Safari/Firefox, permissões reais de câmera/GPS, mapa base remoto nem teste assistivo completo. Horóscopo não foi instalado ou compilado porque os assets necessários estão ausentes. As pendências impedem declarar a OS integralmente concluída.
