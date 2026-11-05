const CHAVE_LANCAMENTOS = 'lancamentosFinanceiros';

export const ORIGENS_RENDA = [
  'Venda na feira',
  'Venda de xepa pelo Xepa+',
  'Encomenda',
  'Entrega em domicílio',
  'Venda para comércio',
  'Outros',
];

export const FILTROS_RENDA_VAZIOS = { origem: '', ordemValor: '' };

export function carregarLancamentosFinanceiros() {
  return JSON.parse(localStorage.getItem(CHAVE_LANCAMENTOS)) || [];
}

export function salvarLancamentosFinanceiros(lancamentos) {
  localStorage.setItem(CHAVE_LANCAMENTOS, JSON.stringify(lancamentos));
}
