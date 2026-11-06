# OS-005 — Migração

Data: 06/11/2026. Diagnóstico inicial e prioridade em [OS-005-AUDITORIA.md](OS-005-AUDITORIA.md). Implementação mantém Expo e React Native Web, sem catálogo novo, dependências compartilhadas, atualização de SDK, commit, push ou deploy.

## Decisões e alterações

Cada aplicativo viável tem `npm run web`, `npm run build:web`, `app.config.js`, Metro, saída SPA (`web.output: single`) e `public/index.html` próprio. O HTML identifica a demo, define idioma, título, descrição, foco visível e largura máxima de 480px no desktop. A página pode rolar em telas curtas. O portfólio não importa código dos apps.

`DEMO_BASE_PATH` configura opcionalmente `experiments.baseUrl` durante o build. Não contém credenciais. Sem essa variável, o build é para a raiz de uma origem independente. Não foi adotada arquitetura definitiva de hospedagem do portfólio.

### Termo Numérico

Corrigidos `flexDirection: collum` e peso inválido; removido import web sem uso que afetava portabilidade. Mantidas regras e distribuição original dos dígitos. Entrada protegida após vitória/derrota e rodada final; cópia independente das linhas do tabuleiro; remoção de índice negativo ao apagar; fechamento dos modais reinicia o jogo. Teclado físico web aceita números, Backspace e Enter, sem capturar atalhos nem duplicar acionamento quando um botão está focado. Botões têm semântica e nomes acessíveis. Removido log que revelava a resposta.

### Agenda Next

Código e regras originais de cadastro e lançamentos mantidos. `storage.js` reexporta AsyncStorage no mobile; `storage.web.js` isola dados no prefixo `os005:agenda:`. Formulários, criação/edição/exclusão, saldo e persistência foram exercitados com dados fictícios. Controles com imagem receberam nomes acessíveis, e Pressables receberam papel de botão para acionamento por teclado.

A senha local permanece parte do exercício original, armazenada sem criptografia; não é autenticação segura e não deve receber senha real. Demo informa explicitamente a restrição. Migração de autenticação não foi realizada.

### ZooKids

`audioContext.web.js` usa HTMLAudio, inicia música somente após gesto e trata rejeições sem impedir navegação. Imports sem extensão permitem ao Metro selecionar a variante web; `audioContext.js` mobile foi preservado. `storage.web.js` usa prefixo `os005:zookids:` e limpa somente as próprias chaves. Mapa tem URL HTTPS de fallback; no navegador “Fechar” retorna ao início, enquanto mobile mantém BackHandler.

A imagem original `assets/img/t2/avesPantanalR.png` está corrompida (assinatura não reconhecida). `avesPantanalDetalhe.web.js` mostra aviso textual no lugar desse único detalhe; `avesPantanalDetalhe.js` mantém a referência original mobile. Nenhum asset acadêmico foi apagado ou redesenhado. A navegação e os outros conteúdos continuam disponíveis; fidelidade visual integral depende da recuperação desse arquivo. Labels permitem testar login e territórios sem depender de coordenadas.

### MedLive template

Preservadas as telas Welcome/Explore e Expo Router. `simple-swizzle` transitivo mudou de 0.2.3 (tarball 404) para 0.2.4, dentro da faixa ^0.2.2 existente; URL e integrity foram verificadas no registry. Nenhum SDK/React foi atualizado.

A pré-renderização original apresentou erro React #418 ao recarregar Explore. A exportação SPA remove a divergência de hidratação e preserva navegação/refresh com fallback de hospedagem. Essa demo está identificada como template, sem inventar funcionalidades do MedLive completo.

### medLive completo

O usuário autorizou explicitamente modo fictício e adaptação web do mapa nesta sessão. As telas originais continuam sendo usadas. Adapters `.web.js` implementam os serviços da demonstração; as variantes `.js` continuam usando integrações mobile originais.

- `crud.web.js`: perfil e cadastro/login fictícios em memória, edição e seleção de foto local. Login inicial `demo@example.test` / `demo1234`; cadastro aceita e-mail `.test`. Não envia dados ao Laravel, não cria tokens reais e não persiste credenciais. Recarregar encerra a sessão e restaura exemplos; logout restaura o perfil inicial.
- `demoHttp.web.js`: busca local de receitas e frase ilustrativa. Fonte é identificada como fictícia nas telas; não se apresenta como resposta real da TheMealDB. `demoHttp.js` continua reexportando axios no mobile.
- `addressLookup.web.js`: endereço fictício; mobile continua ViaCEP. Nenhuma busca web por CEP real.
- `alerts.web.js`: mensagens/confirmacões nativas do navegador, incluindo callbacks; mobile reexporta Alert.
- `profilePhoto.web.js`: trata URI local da seleção sem prefixar URL do backend. Fotos não são enviadas; câmera depende de suporte/permissão do navegador, com alternativa de arquivo já existente na tela.
- `audioContext.web.js`: usa o áudio de fundo existente e evita autoplay. Efeitos `botao.mp3` e `botCode.mp3`, ausentes no repositório, são declarados indisponíveis no aviso. Faixas de meditação existentes continuam usando o player original expo-av.
- `mapa.web.js`: Leaflet **1.9.4** (única dependência direta nova), mapa interativo, raio, lista/distância de mercados fictícios e links de rotas ilustrativas. Localização só por solicitação. Recusa/indisponibilidade tem mensagem. Mapa base OpenStreetMap é opcional; somente seu botão inicia acesso externo. Sem chamada Google Places nem chave no bundle. Animação de zoom desativada para evitar callback após desmontagem.
- Botões de telas que o projeto original não implementa (IMC, água, sangue etc.) exibem mensagem de indisponibilidade; não criam novas regras de saúde. Botão de emergência da demo é ilustrativo e não disca.

As chaves Google literais foram removidas do código corrente e passaram a configuração mobile (`GOOGLE_MAPS_ANDROID_API_KEY` e `EXPO_PUBLIC_GOOGLE_PLACES_API_KEY`). O proprietário deve restringir/rotacionar as chaves expostas historicamente; histórico Git não foi alterado. Variáveis EXPO_PUBLIC são públicas, nunca segredos de servidor. Nenhuma chave real foi inserida nesta OS. Para mobile, configurar as chaves restritas antes de usar mapas; sem configuração, esse serviço não funciona. O backend Laravel não foi modificado.

### Horóscopo

Nenhuma adaptação visual substituta: a pasta `assets/` inteira está ausente. Restaurar imagens e ícones, depois trocar Picker removido do RN por dependência compatível com SDK 52 e usar Image de RN. Não instalar dependências nem alterar a regra de signo sem poder validar a aplicação completa. Falha original em 20/maio precisa teste e correção explícita posterior.

## Limitações e preservação mobile

Exportação de bundle Android não equivale a APK, instalação, teste de câmera/GPS/áudio ou validação iOS. Variantes web isolam adaptações; seleção mobile foi exercitada por exportação onde possível. ZooKids continua bloqueado no Android pelo asset corrompido preexistente. Há arquivos de áudio ausentes no MedLive; embora a exportação Android tenha concluído, seus efeitos não podem ser certificados. Nenhum dispositivo/simulador foi usado.

Dependências legadas e peer warnings do MedLive completo foram preservados para evitar migração de framework fora do escopo. Não foi realizado pentest ou saneamento de todas as dependências. Backend e dados reais não estão preparados para exposição pública. O relatório final separa funcionalidade demonstrada de pendências.
