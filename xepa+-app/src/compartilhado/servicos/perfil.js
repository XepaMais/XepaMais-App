const CHAVES = {
  usuario: 'perfilUsuario',
  feirante: 'perfilFeirante',
};

// Nomes que o projeto já usava nas áreas de demonstração.
// Os campos seguem o cadastro. A foto fica vazia até a pessoa escolher uma.

const DADOS_PESSOAIS = { cpf: '', telefone: '', nascimento: '', email: '', foto: '' };

const PERFIS_INICIAIS = {
  usuario: { nome: 'Henrique Mazza', ...DADOS_PESSOAIS },
  feirante: {
    nome: 'Fabiane',
    ...DADOS_PESSOAIS,
    matricula: '',
    validade: '',
    cnpj: '',
    ccm: '',
    titular: '',
    barraca: '',
    grupo: '',
  },
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
