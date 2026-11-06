# OS-005 — Preparação de publicação (sem deploy executado)

## Builds independentes

Use Node 22 e npm compatível com os lockfiles. Execute dentro de **uma** pasta por vez:

```sh
npm ci
npm run web
npm run build:web
```

| Demo | Pasta de trabalho | Artefato |
|---|---|---|
| Termo Numérico | `termo/` | `termo/dist/` |
| Agenda Next | `Agenda/` | `Agenda/dist/` |
| ZooKids | `ZooKids/` | `ZooKids/dist/` |
| MedLive template | `MedLive/` | `MedLive/dist/` |
| MedLive fictício | `medLiveProjeto/medLive/` | `medLiveProjeto/medLive/dist/` |

Não executar npm na raiz, copiar node_modules entre apps, nem publicar o repositório inteiro. Servir somente o conteúdo de `dist/`, sem fontes, `.env`, backend ou bancos. `dist/` é ignorado no Git e pode ser reconstruído independentemente. Horóscopo não tem artefato publicável; ZooKids tem pendência visual documentada.

Preview local, da raiz do repositório:

```sh
python3 scripts/preview-web.py termo --port 8091
# alternativas: agenda, zookids, medlive-template, medlive
```

O servidor faz fallback SPA e escuta apenas em 127.0.0.1. É ferramenta local, não servidor de produção. Acesse `http://127.0.0.1:8091/`.

## Hospedagem

Preferência inicial: origem/subdomínio independente por app, servindo cada `dist/` na raiz. Isso evita acoplamento de atualização, fallback e assets do portfólio. Todas as saídas são arquivos estáticos; não exigem Node em produção.

Para SPA, configure refresh de rotas para o index **da própria demo**. Assets ausentes devem retornar 404, sem fallback HTML para JS/CSS. Exemplo Nginx para origem dedicada (configuração ilustrativa, não aplicada):

```nginx
root /srv/demos/termo/dist;
location /_expo/ { try_files $uri =404; }
location /assets/ { try_files $uri =404; }
location / { try_files $uri $uri/ /index.html; }
```

Use HTTPS. Recomendação de cache: arquivos com hash em `/_expo/` e `/assets/` podem usar cache longo e immutable; `index.html` deve revalidar. Publicar o conjunto completo de forma atômica evita misturar HTML e bundles de versões distintas. Rollback consiste em restaurar o `dist/` anterior. Nenhum service worker foi adicionado.

## Subrotas futuras do portfólio

Exemplo, dentro de `termo/`:

```sh
DEMO_BASE_PATH=/demos/termo npm run build:web
```

`app.config.js` preserva a configuração existente e adiciona `experiments.baseUrl`. Não usar `/` final. Hospedagem deve mapear `/demos/termo/*` para o conteúdo dessa build, preservar esse prefixo nos assets e usar `/demos/termo/index.html` no refresh. No Router, links também dependem dessa configuração. As builds padrão testadas são de raiz; a configuração definitiva e o fallback da hospedagem do portfólio precisam ser validados quando ela for escolhida. Não copiar uma build de raiz para uma subpasta sem reconstruir.

Integração futura: incluir links na seção “Mais projetos” do portfólio para as URLs aprovadas. Se houver iframe/moldura, verificar CSP, permissões, scroll, acessibilidade e áudio por gesto; não importar os aplicativos no bundle do portfólio. Alterar o portfólio ou publicar exige autorização separada; nenhum de seus arquivos foi acessado para edição.

## Dados, configuração e restrições

Demos web não exigem credenciais. Agenda/ZooKids guardam dados fictícios no navegador em namespaces separados; limpar apenas as chaves com o respectivo prefixo para resetar. MedLive usa perfil em memória e restaura ao recarregar; nenhuma autenticação de saúde real. Tema pode persistir localmente.

Não colocar chaves privadas em EXPO_PUBLIC ou no frontend. `.env.example` do MedLive descreve apenas a configuração mobile de mapas; chaves históricas precisam rotação no provedor. Não publicar o backend Laravel acadêmico antes de revisar autorização por paciente, CORS, HTTPS, banco, arquivos e autenticação. Não se fez deploy dele nesta OS.

Mapa MedLive: geolocalização requer HTTPS (ou localhost) e permissão explícita. Tiles são requisitados ao OpenStreetMap somente por ação, com atribuição; avaliar a [política de uso de tiles](https://operations.osmfoundation.org/policies/tiles/) antes de tráfego público relevante. Áudio depende de gesto; o usuário pode continuar sem áudio quando indisponível. As receitas e os mercados da demo são fictícios.

Antes da publicação: recuperar assets pendentes, revisar as evidências, validar base path no host escolhido, testar em Safari/Firefox e dispositivos reais, restringir/rotacionar chaves históricas e obter autorização de publicação.
