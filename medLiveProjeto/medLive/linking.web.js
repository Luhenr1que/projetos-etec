const basePath = process.env.EXPO_BASE_URL || '/demos/medlive';
export default {
  prefixes: [window.location.origin + basePath],
  config: { initialRouteName: 'Home', path: basePath.replace(/^\//, ''), screens: {"Home": "", "Login": "login", "Cadastro": "cadastro", "Cadastro2": "cadastro/endereco", "Cadastro3": "cadastro/saude", "Cadastro4": "cadastro/foto", "Meditacao": "meditacao", "Alimentacao": "receitas", "MapaMercados": "mapa"} },
};
