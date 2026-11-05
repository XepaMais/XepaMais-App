// Carrinho do consumidor. Guarda só o id e a quantidade; o resto vem da xepa.
import { carregarXepasDisponiveis } from '@/compartilhado/servicos/xepas';

const CHAVE_CARRINHO = 'carrinhoXepa';

export const EVENTO_CARRINHO = 'carrinho-atualizado';

export function carregarCarrinho() {
  return JSON.parse(localStorage.getItem(CHAVE_CARRINHO)) || [];
}

function salvarCarrinho(itens) {
  localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(itens));
  window.dispatchEvent(new Event(EVENTO_CARRINHO));
}

export function adicionarAoCarrinho(id) {
  const itens = carregarCarrinho();
  const jaEstaNoCarrinho = itens.some((item) => item.id === id);

  if (!jaEstaNoCarrinho) {
    salvarCarrinho([...itens, { id, quantidade: 1 }]);
  }
}

export function removerDoCarrinho(id) {
  salvarCarrinho(carregarCarrinho().filter((item) => item.id !== id));
}

export function alterarQuantidade(id, quantidade) {
  const itens = carregarCarrinho().map((item) => {
    if (item.id === id) {
      return { ...item, quantidade };
    }

    return item;
  });

  salvarCarrinho(itens);
}

export function limparCarrinho() {
  salvarCarrinho([]);
}

// Junta o carrinho com os dados da xepa. Ignora o que esgotou, venceu ou saiu do ar.
export function montarItensCarrinho(itens) {
  const xepas = carregarXepasDisponiveis();
  const itensDetalhados = [];

  for (const item of itens) {
    const xepa = xepas.find((atual) => atual.id === item.id);

    if (xepa) {
      itensDetalhados.push({
        ...xepa,
        disponivel: xepa.quantidade,
        quantidade: Math.min(item.quantidade, xepa.quantidade),
      });
    }
  }

  return itensDetalhados;
}

export function calcularTotal(itens) {
  let total = 0;

  for (const item of itens) {
    total += item.preco * item.quantidade;
  }

  return total;
}

export function contarItens(itens) {
  let quantidade = 0;

  for (const item of itens) {
    quantidade += item.quantidade;
  }

  return quantidade;
}
