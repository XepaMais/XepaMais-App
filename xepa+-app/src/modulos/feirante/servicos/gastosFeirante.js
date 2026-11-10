// Gastos do feirante. Sem backend, ficam neste navegador.
import { estaNaSemanaAtual, estaNoMesAtual } from '@/compartilhado/servicos/datas';

const CHAVE_GASTOS = 'gastosFeirante';

export const CATEGORIAS_GASTO = [
  { valor: 'mercadoria', rotulo: 'Mercadoria', cor: '#104B2D' },
  { valor: 'ajudantes', rotulo: 'Ajudantes/funcionários', cor: '#27693A' },
  { valor: 'transporte', rotulo: 'Transporte', cor: '#3A8855' },
  { valor: 'combustivel', rotulo: 'Combustível', cor: '#9CBB06' },
  { valor: 'embalagens', rotulo: 'Embalagens e sacolas', cor: '#F5B400' },
  { valor: 'barraca', rotulo: 'Barraca e equipamentos', cor: '#FF8C00' },
  { valor: 'manutencao', rotulo: 'Manutenção', cor: '#FF5200' },
  { valor: 'taxas', rotulo: 'Taxas e licenças', cor: '#733000' },
  { valor: 'alimentacao', rotulo: 'Alimentação', cor: '#B84A00' },
  { valor: 'outros', rotulo: 'Outros gastos', cor: '#161414' },
];

// Dados de exemplo (Depois vou trocar pelos dados da API, so pra n esquecer)
const gastosIniciais = [
  {
    id: 1,
    descricao: 'Compra de alface',
    quantidade: 10,
    valorUnitario: 3,
    categoria: 'mercadoria',
    data: new Date(),
  },
  {
    id: 2,
    descricao: 'Ajudante 1 dia',
    quantidade: 1,
    valorUnitario: 80,
    categoria: 'ajudantes',
    data: new Date(),
  },
];

export function carregarGastos() {
  return JSON.parse(localStorage.getItem(CHAVE_GASTOS)) || gastosIniciais;
}

export function salvarGastos(gastos) {
  localStorage.setItem(CHAVE_GASTOS, JSON.stringify(gastos));
}

function somarGastos(gastos) {
  let soma = 0;

  for (const gasto of gastos) {
    soma += gasto.quantidade * gasto.valorUnitario;
  }

  return soma;
}

function filtrarGastosDoMes(gastos) {
  return gastos.filter((gasto) => estaNoMesAtual(new Date(gasto.data)));
}

export function somarGastosDaSemana(gastos) {
  return somarGastos(gastos.filter((gasto) => estaNaSemanaAtual(new Date(gasto.data))));
}

// Soma os gastos do mês atual por categoria. Só entram no gráfico as categorias usadas.
export function gastosDoMesPorCategoria(gastos) {
  const gastosDoMes = filtrarGastosDoMes(gastos);
  const resultado = [];

  for (const categoria of CATEGORIAS_GASTO) {
    const gastosDaCategoria = gastosDoMes.filter((gasto) => gasto.categoria === categoria.valor);
    const valor = somarGastos(gastosDaCategoria);

    if (valor > 0) {
      resultado.push({ rotulo: categoria.rotulo, cor: categoria.cor, valor });
    }
  }

  return resultado;
}

export function calcularTotaisDeGastos(gastos) {
  const hoje = new Date().toDateString();
  const gastosDeHoje = gastos.filter((gasto) => new Date(gasto.data).toDateString() === hoje);

  return {
    hoje: somarGastos(gastosDeHoje),
    semana: somarGastosDaSemana(gastos),
    mes: somarGastos(filtrarGastosDoMes(gastos)),
  };
}
