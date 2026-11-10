import { dataEmTexto } from '@/compartilhado/servicos/datas';

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

// Chamada quando o consumidor confirma o pagamento: a venda entra nos lucros do feirante.
export function registrarVendaNoFinanceiro(pedido) {
  const lancamentos = carregarLancamentosFinanceiros();

  // Evita lançar o mesmo pedido duas vezes.
  if (lancamentos.some((item) => item.pedido === pedido.numero)) return;

  const produtos = pedido.itens.map((item) => `${item.quantidade}x ${item.nome}`).join(', ');

  salvarLancamentosFinanceiros([
    ...lancamentos,
    {
      id: Date.now(),
      tipo: 'renda',
      descricao: `Pedido nº ${pedido.numero} - ${produtos}`,
      valor: Number(pedido.total),
      data: dataEmTexto(new Date(pedido.data)),
      categoria: 'Venda de xepa pelo Xepa+',
      feira: pedido.itens[0]?.retirada || '',
      pedido: pedido.numero,
    },
  ]);
}
