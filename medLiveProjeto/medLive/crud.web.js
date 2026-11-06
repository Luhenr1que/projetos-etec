import React, { createContext, useContext, useMemo } from 'react';
export const API_URL = '';
export const STORAGE_URL = '';
const ApiContext = createContext();
const initialProfile = () => ({ idPaciente: 1, nomePaciente: 'Visitante Fictício', emailPaciente: 'demo@example.test', telefonePaciente: '00000000000', dataNascimento: '2000-01-01', logradouro: 'Rua Fictícia', numero: '1', cep: '00000-000', bairro: 'Bairro Exemplo', cidade: 'Cidade Exemplo', estado: 'SP', peso: '70', altura: '1.75', tipoSanguineo: 'O+', fotoPerfil: null });
let profile = initialProfile();
let credentials = { email: 'demo@example.test', senha: 'demo1234' };
let authenticated = false;
export const useApi = () => {
  const value = useContext(ApiContext);
  if (!value) throw new Error('useApi deve ser usado dentro de ApiProvider');
  return value;
};
export function ApiProvider({ children }) {
  const api = useMemo(() => ({
    cadastrarPaciente: async form => {
      const fields = Object.fromEntries(form.entries());
      if (!fields.emailPaciente?.endsWith('.test')) throw new Error('Na demo, use um e-mail fictício terminado em .test.');
      credentials = { email: fields.emailPaciente, senha: fields.senhaPaciente };
      delete fields.senhaPaciente;
      profile = { ...initialProfile(), ...fields, idPaciente: 1 };
      return { success: true, paciente: { ...profile } };
    },
    loginPaciente: async input => {
      if (input.email !== credentials.email || input.senha !== credentials.senha) throw new Error('Demo: use demo@example.test / demo1234 ou o cadastro fictício criado nesta sessão.');
      authenticated = true;
      return { success: true, paciente: { ...profile }, token: 'demo-ficticia-sem-validade' };
    },
    logoutPaciente: async () => { authenticated = false; profile = initialProfile(); credentials = { email: 'demo@example.test', senha: 'demo1234' }; return true; },
    getPaciente: async () => ({ ...profile }),
    obterPaciente: async () => ({ ...profile }),
    getUserData: async () => ({ ...profile }),
    updatePaciente: async data => {
      profile = { ...profile, nomePaciente: data.nome, emailPaciente: data.email, telefonePaciente: data.telefone, dataNascimento: data.dataNascimento, logradouro: data.endereco, cidade: data.cidade, estado: data.estado };
      return true;
    },
    updateFotoPerfil: async uri => { profile = { ...profile, fotoPerfil: uri }; return { success: true, paciente: { ...profile } }; },
    deletarFotoPerfil: async () => { profile = { ...profile, fotoPerfil: null }; return true; },
    isAuthenticated: async () => authenticated,
    getToken: async () => authenticated ? 'demo-ficticia-sem-validade' : null,
    updateLocalUserData: async fields => { profile = { ...profile, ...fields }; return { ...profile }; },
  }), []);
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
}
