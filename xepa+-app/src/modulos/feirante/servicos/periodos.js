// Períodos usados nas listas de lucros e de gastos.
import { estaNoMesAtual } from '@/compartilhado/servicos/datas';

const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

export const PERIODOS = [
  { id: 'diario', rotulo: 'Diário' },
  { id: 'semanal', rotulo: 'Semanal' },
  { id: 'mensal', rotulo: 'Mensal' },
];

// Quantos dias se passaram desde a data (0 = hoje).
function diasDesde(data) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  const dia = new Date(data);
  dia.setHours(0, 0, 0, 0);

  return Math.round((hoje - dia) / MILISSEGUNDOS_POR_DIA);
}

export function estaNoPeriodo(data, periodo) {
  if (periodo === 'diario') {
    return diasDesde(data) === 0;
  }

  if (periodo === 'semanal') {
    return diasDesde(data) >= 0 && diasDesde(data) < 7;
  }

  return estaNoMesAtual(new Date(data));
}
