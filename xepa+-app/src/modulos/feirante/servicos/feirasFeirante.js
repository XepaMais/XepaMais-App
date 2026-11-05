// Feiras do feirante. Sem backend, ficam neste navegador.
const CHAVE_FEIRAS = 'feirasFeirante';

// Feiras de exemplo que o projeto já usava.
const feirasIniciais = [
  {
    id: 1,
    nome: 'Rocinha do tio',
    endereco: 'Rua Tito',
    dias: ['Ter', 'Qui'],
    funcionarios: ['Gabriel', 'Hadson'],
  },
  {
    id: 2,
    nome: 'BemBom',
    endereco: 'Rua Borboletas Psicodélicas',
    dias: ['Sex', 'Sáb'],
    funcionarios: ['Jamilly', 'Henrique'],
  },
  {
    id: 3,
    nome: 'Fazendinha',
    endereco: 'Rua Encontros e Despedidas',
    dias: ['Seg', 'Qua'],
    funcionarios: ['Murilo', 'Igor'],
  },
];

export function carregarFeiras() {
  return JSON.parse(localStorage.getItem(CHAVE_FEIRAS)) || feirasIniciais;
}

export function salvarFeiras(feiras) {
  localStorage.setItem(CHAVE_FEIRAS, JSON.stringify(feiras));
}
