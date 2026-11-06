export const lookupAddress = async cep => (await fetch(`https://viacep.com.br/ws/${cep}/json/`)).json();
