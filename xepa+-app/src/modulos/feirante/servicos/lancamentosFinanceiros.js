import { dataEmTexto } from '@/compartilhado/servicos/datas';
import { taxaDoPlano } from './planoFeirante.js';
import { registrarTaxaDoPedido } from './gastosFeirante.js';

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

// Chamada quando o consumidor confirma o pagamento.
// A comissão do plano vai para Despesas e só o valor líquido entra nos lucros.
export function registrarVendaNoFinanceiro(pedido) {
  const lancamentos = carregarLancamentosFinanceiros();

  // Evita lançar o mesmo pedido duas vezes.
  if (lancamentos.some((item) => item.pedido === pedido.numero)) return;

  const produtos = pedido.itens.map((item) => `${item.quantidade}x ${item.nome}`).join(', ');
  const valorBruto = Number(pedido.total);
  const taxa = taxaDoPlano();
  // Arredonda para centavos para a soma bruto = líquido + taxa fechar certinho.
  const valorTaxa = Math.round(valorBruto * taxa * 100) / 100;
  const valorLiquido = Math.round((valorBruto - valorTaxa) * 100) / 100;

  registrarTaxaDoPedido(pedido, valorTaxa, Math.round(taxa * 100));

  salvarLancamentosFinanceiros([
    ...lancamentos,
    {
      id: Date.now(),
      tipo: 'renda',
      descricao: `Pedido nº ${pedido.numero} - ${produtos}`,
      valor: valorLiquido,
      valorBruto,
      taxa: valorTaxa,
      data: dataEmTexto(new Date(pedido.data)),
      categoria: 'Venda de xepa pelo Xepa+',
      feira: pedido.itens[0]?.retirada || '',
      pedido: pedido.numero,
    },
  ]);
}
