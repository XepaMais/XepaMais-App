// Saques via Pix dos lucros do Xepa+. É só uma simulação: nenhum dinheiro é transferido.
import { carregarLancamentosFinanceiros } from './lancamentosFinanceiros.js';

const CHAVE_SAQUES = 'saquesFeirante';
const ORIGEM_XEPA = 'Venda de xepa pelo Xepa+';

export const TIPOS_CHAVE_PIX = [
  { valor: 'cpf', rotulo: 'CPF', exemplo: '000.000.000-00' },
  { valor: 'cnpj', rotulo: 'CNPJ', exemplo: '00.000.000/0000-00' },
  { valor: 'email', rotulo: 'E-mail', exemplo: 'nome@email.com' },
  { valor: 'celular', rotulo: 'Celular', exemplo: '(11) 90000-0000' },
  { valor: 'aleatoria', rotulo: 'Chave aleatória', exemplo: 'Cole a chave aqui' },
];

export function carregarSaques() {
  return JSON.parse(localStorage.getItem(CHAVE_SAQUES)) || [];
}

function salvarSaques(saques) {
  localStorage.setItem(CHAVE_SAQUES, JSON.stringify(saques));
}

function somar(lista) {
  return lista.reduce((soma, item) => soma + Number(item.valor), 0);
}

// Só o que foi vendido pelo app fica no Xepa+; o valor já vem sem a taxa do plano.
export function calcularSaldo(saques = carregarSaques()) {
  const vendasXepa = carregarLancamentosFinanceiros().filter(
    (item) => item.tipo === 'renda' && item.categoria === ORIGEM_XEPA,
  );
  const recebido = somar(vendasXepa);
  const sacado = somar(saques);

  // Arredonda para centavos para não sobrar 0,0000001.
  return {
    recebido,
    sacado,
    disponivel: Math.round((recebido - sacado) * 100) / 100,
  };
}

// Devolve uma mensagem de erro ou '' quando a chave parece válida.
export function validarChavePix(tipo, chave) {
  const texto = chave.trim();
  const numeros = texto.replace(/\D/g, '');

  if (!texto) return 'Informe a chave Pix.';
  if (tipo === 'cpf' && numeros.length !== 11) return 'O CPF precisa ter 11 números.';
  if (tipo === 'cnpj' && numeros.length !== 14) return 'O CNPJ precisa ter 14 números.';
  if (tipo === 'celular' && (numeros.length < 10 || numeros.length > 11)) {
    return 'Informe o celular com DDD.';
  }
  if (tipo === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) return 'E-mail inválido.';
  if (tipo === 'aleatoria' && texto.length < 20) return 'A chave aleatória parece incompleta.';

  return '';
}

export function registrarSaque({ valor, tipoChave, chave }) {
  const saques = carregarSaques();
  const saque = {
    id: Date.now(),
    valor,
    tipoChave,
    chave: chave.trim(),
    data: new Date().toISOString(),
  };

  salvarSaques([saque, ...saques]);
  return saque;
}
