const basePath = process.env.EXPO_BASE_URL || '/demos/zookids';
export default {
  prefixes: [window.location.origin + basePath],
  config: { path: basePath.replace(/^\//, ''), screens: {"Splach": "", "Inicio": "inicio", "Cadastrar": "cadastro", "Entrar": "login", "Home": "home", "Terri1": "territorios/1", "Terri2": "territorios/2", "Terri3": "territorios/3", "Terri4": "territorios/4", "Terri5": "territorios/5", "Terri6": "territorios/6"} },
};
