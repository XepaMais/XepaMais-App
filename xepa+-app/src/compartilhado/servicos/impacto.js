// Impacto do consumidor, calculado a partir dos pedidos que ele já fez.
// As xepas não têm peso nem preço "cheio" cadastrados, então usamos estimativas.

import { carregarPedidos } from '@/compartilhado/servicos/pedidos';
import { buscarXepa } from '@/compartilhado/servicos/xepas';

// Peso médio estimado de uma xepa, por categoria (em kg).
const PESO_POR_CATEGORIA = {
  'Verduras e legumes': 2,
  Frutas: 2,
  Tempero: 0.3,
  Completa: 3,
};
const PESO_PADRAO = 2;

// Estimativa: a xepa sai pela metade do preço normal da feira.
const DESCONTO_MEDIO = 0.5;

// 1 refeição = 500 g de alimento.
const KG_POR_REFEICAO = 0.5;

const QUANTIDADE_SEMANAS = 6;
const DIA_EM_MS = 24 * 60 * 60 * 1000;

function pesoDoItem(item) {
  const categoria = item.categoria || buscarXepa(item.id)?.categoria;
  const peso = PESO_POR_CATEGORIA[categoria] ?? PESO_PADRAO;

  return peso * (item.quantidade || 1);
}

function pesoDoPedido(pedido) {
  return pedido.itens.reduce((soma, item) => soma + pesoDoItem(item), 0);
}

function quantidadeDoPedido(pedido) {
  return pedido.itens.reduce((soma, item) => soma + (item.quantidade || 1), 0);
}

// Kg salvos em cada uma das últimas 6 semanas (a última é a semana atual).

function calcularSemanas(pedidos) {
  const fimDeHoje = new Date();
  fimDeHoje.setHours(23, 59, 59, 999);

  const semanas = Array.from({ length: QUANTIDADE_SEMANAS }, (_, indice) => ({
    id: indice + 1,
    nome: `Sem ${indice + 1}`,
    kg: 0,
  }));

  for (const pedido of pedidos) {
    const diasAtras = Math.floor((fimDeHoje - new Date(pedido.data)) / DIA_EM_MS);
    const semanasAtras = Math.floor(diasAtras / 7);

    if (semanasAtras >= 0 && semanasAtras < QUANTIDADE_SEMANAS) {
      semanas[QUANTIDADE_SEMANAS - 1 - semanasAtras].kg += pesoDoPedido(pedido);
    }
  }

  return semanas;
}

export function calcularImpacto() {
  const pedidos = carregarPedidos();

  const kgSalvos = pedidos.reduce((soma, pedido) => soma + pesoDoPedido(pedido), 0);
  const totalPago = pedidos.reduce((soma, pedido) => soma + (pedido.total || 0), 0);
  const economia = totalPago / (1 - DESCONTO_MEDIO) - totalPago;
  const xepasResgatadas = pedidos.reduce((soma, pedido) => soma + quantidadeDoPedido(pedido), 0);
  const refeicoes = Math.round(kgSalvos / KG_POR_REFEICAO);

  return {
    kgSalvos,
    economia,
    xepasResgatadas,
    refeicoes,
    semanas: calcularSemanas(pedidos),
  };
}

export function formatarKg(valor) {
  return valor.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}
