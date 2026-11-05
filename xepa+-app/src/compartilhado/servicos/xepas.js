// Xepas cadastradas pelo feirante e exibidas ao consumidor.
// Sem backend, ficam neste navegador: feirante e consumidor precisam usar o mesmo.
import { dataDeHoje } from '@/compartilhado/servicos/datas';

const CHAVE_XEPAS = 'produtosFeirante';

export const CATEGORIAS_XEPA = ['Verduras e legumes', 'Frutas', 'Tempero', 'Completa'];

// Xepas salvas antes de as categorias mudarem.
const CATEGORIAS_ANTIGAS = {
  Verduras: 'Verduras e legumes',
  Legumes: 'Verduras e legumes',
  Outros: 'Completa',
};

export function carregarXepas() {
  const xepas = JSON.parse(localStorage.getItem(CHAVE_XEPAS)) || [];

  return xepas.map((xepa) => ({
    ...xepa,
    categoria: CATEGORIAS_ANTIGAS[xepa.categoria] || xepa.categoria,
  }));
}

export function salvarXepas(xepas) {
  localStorage.setItem(CHAVE_XEPAS, JSON.stringify(xepas));
}

// Para o consumidor: só o que ainda tem estoque e não venceu.
export function carregarXepasDisponiveis() {
  const hoje = dataDeHoje();

  return carregarXepas().filter((xepa) => xepa.quantidade > 0 && xepa.validade >= hoje);
}

export function buscarXepa(id) {
  return carregarXepas().find((xepa) => String(xepa.id) === String(id));
}

// Desconta do estoque o que foi comprado.
export function baixarEstoque(itens) {
  const xepas = carregarXepas().map((xepa) => {
    const comprado = itens.find((item) => item.id === xepa.id);

    if (comprado) {
      return { ...xepa, quantidade: Math.max(0, xepa.quantidade - comprado.quantidade) };
    }

    return xepa;
  });

  salvarXepas(xepas);
}
