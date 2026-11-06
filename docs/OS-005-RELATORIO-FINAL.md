# OS-005 — Relatório final

Data: 06/11/2026. **Execução parcial: cinco builds web independentes geradas e dez cenários funcionais aprovados em Chromium; a OS não está integralmente concluída.** Há assets ausentes/corrompidos e validações mobile/serviços reais pendentes. Nenhum deploy, push, commit ou alteração do portfólio foi realizado.

## Aplicativos identificados e resultado

| Aplicativo | Classe inicial | Resultado web | Build | Pendências |
|---|---|---|---|---|
| Termo Numérico (`termo/`) | A | Migrado; vitória/derrota/reinício e teclado verificados | `termo/dist/` | Teste real Android/iOS e outros browsers |
| Agenda Next (`Agenda/`) | B | Migrado; cadastro, CRUD, saldo e persistência verificados | `Agenda/dist/` | Cadastro local acadêmico não é autenticação segura; somente dados fictícios; teste de dispositivo |
| ZooKids (`ZooKids/`) | B | Funcional com limitação visual; cadastro/login, seis territórios e modal verificados | `ZooKids/dist/` | Recuperar `avesPantanalR.png`; web informa indisponibilidade desse detalhe; Android bloqueado pelo mesmo arquivo original |
| MedLive template (`MedLive/`) | A | Migrado; tabs, conteúdo expansível e refresh verificados | `MedLive/dist/` | É template Welcome/Explore, sem recursos do produto completo |
| MedLive completo (`medLiveProjeto/medLive/`) | C | Demo fictícia autorizada, funcional nos fluxos exercitados; não é integração de produção | `medLiveProjeto/medLive/dist/` | Recuperar efeitos sonoros, testar cadastro/foto/câmera, geolocalização real e tiles; telas ausentes do original continuam indisponíveis; backend real não validado |
| Horóscopo (`horoscupo/`) | B | Bloqueado | Não gerada | Restaurar toda a pasta assets; corrigir Picker/import e testar limites de datas |

Todos são projetos Expo; nenhum React Native CLI. `medLiveProjeto/BackEnd/` é Laravel 10, não app React Native. Outras pastas são exercícios HTML/PHP/SQL/Java e foram inventariadas sem conversão. MedLive template e MedLive completo são aplicativos distintos, não demos equivalentes.

## Evidências e testes

Execução final de `tests/os005-web.cjs`: **10/10 aprovados**, cinco apps em mobile 390×844 e desktop 1440×900, sem `pageerror` ou console.error nos fluxos. Conferidos interações reais, navegação, formulários, refresh, largura limitada e overflow. Isso não representa cobertura integral de todas as funções nem acessibilidade completa.

Termo: vitória/derrota, reinício e teclado. Agenda: cadastro, recebimento, edição, exclusão, saldo, persistência e teclado. ZooKids: cadastro com ícone, login, todos os territórios, modal de animal, refresh e logout sem apagar outros dados. Template: Explore, collapsible e refresh direto. MedLive: receitas/detalhe, perfil editável, meditação, mapa/raio e recusa de localização simulada; nenhuma chamada externa de dados nesses fluxos fictícios.

Cinco instalações limpas de dependências e cinco builds web aprovadas. Servidores locais das builds foram exercitados. Servidor Expo Web Termo também iniciou e respondeu HTTP 200. `npm run lint` do template passou. Exportação Android passou em Termo, Agenda, MedLive template e MedLive completo; ZooKids falhou pelo asset corrompido preexistente. Não foram testados dispositivos, iOS, Safari/Firefox ou backend Laravel. Exportação Android não equivale a APK testado.

Varredura direcionada de bundles: nenhum padrão de chave Google/AWS/GitHub, private key ou endpoint HTTP privado encontrado. Chaves Google literais removidas do código corrente; exposição histórica exige rotação/restrição pelo proprietário. Não houve alteração de histórico Git. Scan não equivale a auditoria de segurança completa.

- [Resultados finais do navegador](evidencias/web-results.json)
- [Builds web e Android](evidencias/build-results.json)
- [Hashes e varredura dos artefatos](evidencias/bundle-audit.json)
- [Evidências PNG](evidencias/)
- [Resultados da primeira suíte, com falhas históricas](evidencias/web-results-initial.json)

## Arquivos modificados

Mudanças concentradas em configurações/HTML web das cinco demos, scripts build nos respectivos manifestos, correções do Termo, adapters de storage/áudio ZooKids/Agenda, semântica de botões, adapters fictícios e mapa web MedLive, configuração segura de chaves mobile, dois lockfiles pontualmente alterados, `.gitignore`, ferramentas de preview/scan/testes e esta documentação. Nenhum projeto foi apagado. Lista completa em [arquivos-modificados.txt](evidencias/arquivos-modificados.txt).

## Reproduzir e preparar integração

Na pasta de cada app: `npm ci`, `npm run web`, `npm run build:web`. Da raiz: `python3 scripts/preview-web.py termo --port 8091` (substituir nome conforme docs). Login fictício MedLive: `demo@example.test` / `demo1234`; dados do perfil ficam em memória e são restaurados ao recarregar.

As builds são independentes e não entram no bundle do portfólio. Ainda é necessário escolher hospedagem/URLs, validar eventual `DEMO_BASE_PATH` e fallback no host escolhido e, com autorização separada, adicionar links na seção “Mais projetos”. O portfólio principal não foi modificado.

Prioridades restantes: recuperar assets do Horóscopo e imagem ZooKids; restaurar sons MedLive; restringir/rotacionar chaves históricas; testar dispositivos, cadastro/upload/câmera/GPS e mapa base remoto; revisar backend antes de qualquer exposição real; validar integração na hospedagem escolhida. Não há necessidade de reescrever os apps ou criar catálogo separado.

## Documentação

- [Auditoria e matriz](OS-005-AUDITORIA.md)
- [Alterações e decisões de migração](OS-005-MIGRACAO.md)
- [Comandos, testes, falhas e limites](OS-005-TESTES.md)
- [Preparação de deploy e integração futura](OS-005-DEPLOY.md)
