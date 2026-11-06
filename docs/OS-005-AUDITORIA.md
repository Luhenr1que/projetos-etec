# OS-005 — Auditoria técnica

Data: 06/11/2026. Repositório local corresponde a `Luhenr1que/projetos-etec`. Git inicialmente limpo; sem alterações preexistentes. Diagnóstico registrado antes das adaptações. Nenhum push, commit, deploy ou alteração do portfólio autorizado ou executado.

## Inventário completo

Foram encontrados seis aplicativos independentes, todos Expo gerenciado; nenhum React Native CLI. `medLiveProjeto/` é um conjunto com frontend e backend, não um sétimo aplicativo. `MedLive/` e `medLiveProjeto/medLive/` não são duplicatas funcionais: o primeiro contém o template Expo Router, o segundo o produto acadêmico.

Demais áreas: `PW1/` e `Site-Proprio/` contêm HTML/CSS/JS e cópias de exercícios; `PW2/` contém PHP (Helpdesk, PokemonQuiz, Guaraná, limao); `Banco-Dados/` contém SQL; `Projetos/jogo-da-velha/` contém Java. Não devem ser convertidos para React Native Web. `.github/`, arquivos raiz e assets também foram inventariados. Nenhum outro manifesto de aplicativo encontrado. Cada app possui seu próprio lockfile; o lockfile raiz não configura workspace.

## Matriz inicial de compatibilidade

| Aplicativo | Tecnologia | Web atual | Bloqueios | Complexidade | Prioridade |
|---|---|---|---|---|---|
| Termo Numérico | Expo 53 / RN 0.79.5 | Dependências presentes; não validado inicialmente | Estilos inválidos, entrada após fim, teclado físico ausente | A — pequena | 1 |
| Agenda Next | Expo 53 / RN 0.79.3 | Dependências presentes; não validado inicialmente | Formulários/modais, armazenamento sem isolamento por app | B — moderada | 2 |
| ZooKids | Expo 53 / RN 0.79.2 | Dependências presentes; não validado inicialmente | Autoplay, URL de mapa só Android, sair do app, dados locais | B — moderada | 3 |
| MedLive (template) | Expo Router 5 / Expo 53 | Exportação estática já configurada | Não implementa o produto de saúde | A — pequena | 4 (baixo valor demonstrativo) |
| Horóscopo (pitaia) | Expo 52 / RN 0.76.7 | Script presente, código incompatível | Pasta assets ausente; Picker removido do RN, Image importada de web | B — moderada, bloqueado por assets | 5 |
| medLive completo | Expo 54 / RN 0.81.5 + Laravel 10 | Script presente; mapa nativo impede bundle web | Assets de áudio ausentes, backend LAN, chaves Google, mapas/Places, upload nativo | C — relevante | 6; decisões pendentes |

As classificações expressam esforço, não testes aprovados. Nenhum aplicativo é classificado D: há caminhos tecnicamente possíveis, com dependências e decisões ainda abertas.

## Diagnóstico individual

### Termo Numérico
Jogo de adivinhação de quatro dígitos em seis tentativas, marca posição correta e número existente, vitória/derrota e reinício. Entrada `index.js → App.js`; sem navegação ativa (dependências de navegação e `TelaImagem.js` não fazem parte do fluxo). Sem backend, autenticação, armazenamento ou recursos exclusivos mobile. `App.js` permite escrever após a rodada final e registra a resposta no console; `style.js` usa `collum` e importa Modal de RN Web sem uso. Melhor relação entre risco e valor para iniciar. Compatibilidade provável com mouse/toque; teclado físico requer adaptação. Risco de privacidade baixo.

### Agenda Next
Entrada `index.js → App.js`; native stack com Splach, Inicio, Cadastro e Home. Cadastro local com nome, nascimento e senha; controle de recebimentos/pagamentos, edição, exclusão, data/hora e perfil. Sem API/backend nem autenticação de servidor. AsyncStorage guarda `usuarios` e `dados`; senha em texto simples e logs de dados em Home. `src/home/index.js` envolve formulários em Pressable que fecha modal: validar propagação de eventos web. Splash de 2s. Sem capacidade nativa imprescindível; precisa demonstração identificada, dados fictícios e separação de chaves entre apps no mesmo domínio. Mobile ainda não executado.

### ZooKids
Entrada `index.js → App.js`; native stack com splash, início, cadastro, login, home e seis territórios. Informações de animais, imagens, modais, áudio, conta e links externos. AsyncStorage `usuarios`/`login`; cadastro e senha locais, sem backend ou autenticação real. `audioContext.js` tenta autoplay no mount; browsers exigem gesto. `src/pages/home/index.js` só define mapa no Android, usa `BackHandler.exitApp()` e `AsyncStorage.clear()`. Fonte Supersonic/cream e assets referenciados presentes. Ajustes por plataforma devem manter áudio mobile e navegação. Risco de coleta desnecessária de dados de crianças: rotular demo e usar apenas dados fictícios.

### MedLive (template)
Entrada `expo-router/entry`; rotas `app/_layout.tsx`, `(tabs)/index.tsx`, `explore.tsx`, `+not-found.tsx`. Telas Welcome/Explore, links e collapsibles; não contém cadastro, receitas ou meditação. `app.json` já usa Metro + output static. Haptics apenas iOS em `components/HapticTab.tsx`; IconSymbol/TabBarBackground têm variantes iOS. Sem backend, autenticação ou armazenamento de usuário. Pode exportar o template, mas não deve ser anunciado como demonstração do produto completo.

### Horóscopo
Entrada `index.js → App.js`; tela única com seletores de dia/mês, cálculo de signo e modais. Sem backend, persistência ou autenticação. `App.js:2` importa Picker de RN (removido); Image vem de RN Web (quebra portabilidade). Nenhuma pasta `assets/` presente, incluindo as 13 imagens usadas e ícones do app.json. Sem recuperar os originais, a identidade visual não pode ser preservada fielmente; não substituir por protótipo. Há falha de regra preexistente no limite Touro/Gêmeos (20/maio), fora da adaptação mínima. É necessário restaurar assets e testar datas de fronteira.

### medLive completo e backend
Entrada `index.js → App.js`; native stack Login, Cadastro (4 etapas), Home, Meditacao, Alimentacao, MapaMercados. Providers de tema, API, cadastro e áudio. Tem perfil, upload/câmera, busca de receitas, frases, meditação, geolocalização e mercados. AsyncStorage armazena tema, token e perfil. `crud.js` aponta para endereço privado HTTP; navegador HTTPS terá mixed content, indisponibilidade e possíveis restrições CORS. APIs adicionais: ViaCEP, TheMealDB, frases.docapi.dev, Google Places. Disponibilidade/CORS não foram validados; chamadas com dados pessoais não foram feitas.

`src/principal/mapa/mapa.js` importa react-native-maps (sem web), solicita localização no mount e chama Places com chave embutida; `app.json` contém outra chave Google. Valores omitidos deste documento. Remover do código corrente não revoga exposição histórica: proprietário precisa restringir/rotacionar chaves no provedor. `audioContext.js` referencia `botao.mp3` e `botCode.mp3`, ausentes. Upload em `crud.js` usa formato `{uri,type,name}` nativo: web precisa Blob/FormData. Há dependências nativas legadas, como react-native-camera, não necessariamente usadas.

Backend em `medLiveProjeto/BackEnd/`: Laravel ^10, PHP ^8.1, Sanctum ^3.2; entrada public/index.php; rotas routes/api.php, modelo Paciente, controller Api/PacienteController. Requer banco e storage configurados; não há serviço confirmado. Rotas de perfil por ID só exigem autenticação, sem verificação explícita de propriedade no controller: revisão de autorização necessária antes de publicação pública. Não hospedar backend acadêmico com dados reais nesta OS. Modo fictício completo e alternativa ao mapa requerem decisão, pois alteram integração/backend e não devem esconder perda de funcionalidades.

## Estado inicial e plano

Nenhuma instalação, execução ou build havia sido comprovada no início. Scripts web nos manifestos não constituem evidência de funcionamento. Validações serão registradas separadamente.

1. Termo: manter SDK/React/RN, corrigir estilos e proteção de fim, teclado web, limitar viewport e exportar standalone; testar jogo até fim e reinício.
2. Agenda: instalar isoladamente, exportar e testar cadastro/CRUD/persistência, corrigir eventos web sem mudar regras; identificar demo e isolar storage web.
3. ZooKids: áudio web por gesto, links universais e ação web para sair; isolar storage e testar login/territórios/modais.
4. MedLive template: instalar/exportar sem inventar funções; validar tabs e identificar natureza do template.
5. Horóscopo: restaurar assets originais antes da publicação; migrar Picker com versão compatível SDK 52, mantendo mobile. Sem assets não gerar demo visual substituta.
6. medLive completo: pausar alterações estruturais. Solicitar decisão sobre backend de demo/proxy seguro de Places ou dados fictícios identificados, recuperar áudios e escolher implementação web do mapa com finalidade equivalente. Esforço estimado: vários dias incluindo fluxos de perfil/upload/mapa e testes; não uma simples configuração de build.

Build por diretório com `expo export --platform web`, mantendo dependências independentes e sem importar no portfólio. Preferir hospedagem independente por origem; subrotas exigem baseUrl e política de fallback específicas. Referências oficiais: [exportação e subcaminhos](https://docs.expo.dev/guides/publishing-websites/), [Expo CLI](https://docs.expo.dev/more/expo-cli/). Não atualizar SDKs indiscriminadamente.

## Dependências declaradas (inventário exato)

### `termo`

Entrada: `index.js`.

```json
{
  "dependencies": {
    "@expo/metro-runtime": "~5.0.5",
    "@react-navigation/native": "^7.1.18",
    "@react-navigation/native-stack": "^7.3.27",
    "expo": "~53.0.23",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.5",
    "react-native-web": "^0.20.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

### `Agenda`

Entrada: `index.js`.

```json
{
  "dependencies": {
    "@expo/metro-runtime": "~5.0.4",
    "@react-native-async-storage/async-storage": "2.1.2",
    "@react-navigation/native": "^7.1.9",
    "@react-navigation/native-stack": "^7.3.13",
    "expo": "53.0.10",
    "expo-av": "15.1.5",
    "expo-status-bar": "~2.2.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.3",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "^4.11.1",
    "react-native-web": "^0.20.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

### `ZooKids`

Entrada: `index.js`.

```json
{
  "dependencies": {
    "@expo/metro-runtime": "~5.0.4",
    "@react-native-async-storage/async-storage": "^2.1.2",
    "@react-navigation/native": "^7.1.4",
    "@react-navigation/native-stack": "^7.3.8",
    "expo": "53.0.9",
    "expo-audio": "~0.4.5",
    "expo-av": "~15.1.4",
    "expo-font": "~13.3.1",
    "expo-status-bar": "~2.2.3",
    "expo-updates": "~0.28.13",
    "expo-video": "~2.1.9",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.2",
    "react-native-animatable": "^1.4.0",
    "react-native-gesture-handler": "^2.25.0",
    "react-native-reanimated": "^3.17.5",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.10.0",
    "react-native-web": "^0.20.0"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@react-native-community/cli": "latest"
  }
}
```

### `horoscupo`

Entrada: `index.js`.

```json
{
  "dependencies": {
    "expo": "~52.0.37",
    "expo-status-bar": "~2.0.1",
    "react": "18.3.1",
    "react-native": "0.76.7",
    "react-dom": "18.3.1",
    "react-native-web": "~0.19.13",
    "@expo/metro-runtime": "~4.0.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0"
  }
}
```

### `MedLive`

Entrada: `expo-router/entry`.

```json
{
  "dependencies": {
    "@expo/vector-icons": "^14.1.0",
    "@react-navigation/bottom-tabs": "^7.3.10",
    "@react-navigation/elements": "^2.3.8",
    "@react-navigation/native": "^7.1.6",
    "expo": "~53.0.22",
    "expo-blur": "~14.1.5",
    "expo-constants": "~17.1.7",
    "expo-font": "~13.3.2",
    "expo-haptics": "~14.1.4",
    "expo-image": "~2.4.0",
    "expo-linking": "~7.1.7",
    "expo-router": "~5.1.5",
    "expo-splash-screen": "~0.30.10",
    "expo-status-bar": "~2.2.3",
    "expo-symbols": "~0.4.5",
    "expo-system-ui": "~5.0.11",
    "expo-web-browser": "~14.2.0",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "react-native": "0.79.6",
    "react-native-gesture-handler": "~2.24.0",
    "react-native-reanimated": "~3.17.4",
    "react-native-safe-area-context": "5.4.0",
    "react-native-screens": "~4.11.1",
    "react-native-web": "~0.20.0",
    "react-native-webview": "13.13.5"
  },
  "devDependencies": {
    "@babel/core": "^7.25.2",
    "@types/react": "~19.0.10",
    "typescript": "~5.8.3",
    "eslint": "^9.25.0",
    "eslint-config-expo": "~9.2.0"
  }
}
```

### `medLiveProjeto/medLive`

Entrada: `index.js`.

```json
{
  "dependencies": {
    "@expo/metro-runtime": "~6.1.2",
    "@react-native-async-storage/async-storage": "2.2.0",
    "@react-native-community/netinfo": "^11.4.1",
    "@react-native-picker/picker": "^2.11.1",
    "@react-navigation/bottom-tabs": "^7.4.6",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.25",
    "axios": "^1.11.0",
    "dotenv": "^17.2.1",
    "expo": "54.0.21",
    "expo-av": "~16.0.7",
    "expo-camera": "~17.0.8",
    "expo-font": "~14.0.8",
    "expo-image-manipulator": "~14.0.7",
    "expo-image-picker": "~17.0.8",
    "expo-linear-gradient": "~15.0.7",
    "expo-location": "^19.0.7",
    "expo-media-library": "~18.2.0",
    "expo-status-bar": "~3.0.8",
    "mime": "^4.1.0",
    "react": "^19.1.0",
    "react-async-hook": "^4.0.0",
    "react-dom": "^19.1.0",
    "react-native": "0.81.5",
    "react-native-animatable": "^1.4.0",
    "react-native-camera": "^4.2.1",
    "react-native-country-picker-modal": "^2.0.0",
    "react-native-dropdown-picker": "^5.4.6",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-image-picker": "^8.2.1",
    "react-native-keyboard-aware-scroll-view": "^0.9.5",
    "react-native-maps": "1.20.1",
    "react-native-reanimated": "~4.1.1",
    "react-native-reanimated-carousel": "^4.0.3",
    "react-native-safe-area-context": "^5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-vector-icons": "^10.3.0",
    "react-native-web": "^0.21.0"
  },
  "devDependencies": {
    "@babel/core": "^7.28.4"
  }
}
```


## Evidências descobertas na execução

O diagnóstico inicial foi mantido acima como fotografia anterior à migração. Durante os builds constatou-se que `ZooKids/assets/img/t2/avesPantanalR.png` existe, mas está corrompida (tipo não reconhecido), impedindo o build original web e Android. O template MedLive tinha tarball transitivo indisponível e apresentou divergência de hidratação em refresh. As correções e os estados finais estão em OS-005-MIGRACAO.md e OS-005-RELATORIO-FINAL.md. O usuário autorizou na sessão o modo fictício e mapa web do MedLive completo.
