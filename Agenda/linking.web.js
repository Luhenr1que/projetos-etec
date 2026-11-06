const basePath = process.env.EXPO_BASE_URL || '/demos/agenda';
export default {
  prefixes: [window.location.origin + basePath],
  config: { path: basePath.replace(/^\//, ''), screens: {"Splach": "", "Inicio": "inicio", "Cadastro": "cadastro", "Home": "home"} },
};
