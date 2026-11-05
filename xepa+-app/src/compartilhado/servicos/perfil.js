// Ainda não existe backend de contas: os dados ficam salvos neste navegador.
const CHAVES = {
  usuario: 'perfilUsuario',
  feirante: 'perfilFeirante',
};

// Nomes que o projeto já usava nas áreas de demonstração.
const PERFIS_INICIAIS = {
  usuario: { nome: 'Henrique Mazza', email: '', telefone: '' },
  feirante: { nome: 'Fabiane', barraca: '', email: '', telefone: '' },
};

export const EVENTO_PERFIL = 'perfil-atualizado';

export function carregarPerfil(tipo) {
  const salvo = JSON.parse(localStorage.getItem(CHAVES[tipo]));
  return { ...PERFIS_INICIAIS[tipo], ...salvo };
}

export function salvarPerfil(tipo, dados) {
  localStorage.setItem(CHAVES[tipo], JSON.stringify(dados));
  window.dispatchEvent(new Event(EVENTO_PERFIL));
}
