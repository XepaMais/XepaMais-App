// Junta os registros que já existem (rendas, compras e gastos) em uma única lista.
import { dataEmTexto, formatarData } from '@/compartilhado/servicos/datas';
import { carregarLancamentosFinanceiros } from './lancamentosFinanceiros.js';
import { carregarGastos, CATEGORIAS_GASTO } from './gastosFeirante.js';

export const FILTROS_VAZIOS = {
  inicio: '',
  fim: '',
  tipo: 'todos',
  categoria: '',
  busca: '',
};

export const ROTULOS_TIPO = { lucro: 'Lucro', gasto: 'Gasto' };

function rotuloCategoriaGasto(valor) {
  const categoria = CATEGORIAS_GASTO.find((item) => item.valor === valor);

  return categoria ? categoria.rotulo : 'Outros gastos';
}

function categoriaDoLancamento(item) {
  if (item.categoria) return item.categoria;

  return item.tipo === 'renda' ? 'Renda' : 'Outros';
}

export function carregarHistoricoFinanceiro() {
  const lancamentos = carregarLancamentosFinanceiros().map((item) => ({
    id: `lancamento-${item.id}`,
    data: item.data,
    descricao: item.descricao,
    categoria: categoriaDoLancamento(item),
    tipo: item.tipo === 'renda' ? 'lucro' : 'gasto',
    valor: Number(item.valor),
    feira: item.feira || '',
  }));

  const gastos = carregarGastos().map((item) => ({
    id: `gasto-${item.id}`,
    data: dataEmTexto(new Date(item.data)),
    descricao: item.descricao,
    categoria: rotuloCategoriaGasto(item.categoria),
    tipo: 'gasto',
    valor: item.quantidade * item.valorUnitario,
    feira: item.feira || '',
  }));

  return [...lancamentos, ...gastos].sort((a, b) => b.data.localeCompare(a.data));
}

function passaNosFiltros(registro, filtros) {
  const busca = filtros.busca.trim().toLocaleLowerCase('pt-BR');
  const descricao = registro.descricao.toLocaleLowerCase('pt-BR');

  if (filtros.inicio && registro.data < filtros.inicio) return false;
  if (filtros.fim && registro.data > filtros.fim) return false;
  if (filtros.tipo !== 'todos' && registro.tipo !== filtros.tipo) return false;
  if (filtros.categoria && registro.categoria !== filtros.categoria) return false;

  return descricao.includes(busca);
}

export function filtrarHistorico(registros, filtros) {
  return registros.filter((registro) => passaNosFiltros(registro, filtros));
}

export function calcularTotais(registros) {
  let lucros = 0;
  let gastos = 0;

  for (const registro of registros) {
    if (registro.tipo === 'lucro') lucros += registro.valor;
    if (registro.tipo === 'gasto') gastos += registro.valor;
  }

  return { lucros, gastos, saldo: lucros - gastos };
}

export function descreverPeriodo(filtros) {
  const { inicio, fim } = filtros;

  if (inicio && fim) return `${formatarData(inicio)} a ${formatarData(fim)}`;
  if (inicio) return `A partir de ${formatarData(inicio)}`;
  if (fim) return `Até ${formatarData(fim)}`;

  return 'Todo o período';
}
