import { PLANOS } from '@/compartilhado/dados/planos';

// Guarda só a escolha do plano. Nenhuma cobrança é feita.
const CHAVE_PLANO = 'planoFeirante';

export const EVENTO_PLANO = 'plano-atualizado';

// O que cada plano libera, além das páginas que todos os feirantes usam.
const RECURSOS_DO_PLANO = {
  gratis: [],
  crescer: ['financeiro', 'ia'],
  pro: ['financeiro', 'planilhas', 'ia'],
};

export function carregarPlanoSelecionado() {
  return localStorage.getItem(CHAVE_PLANO);
}

export function salvarPlanoSelecionado(idPlano) {
  localStorage.setItem(CHAVE_PLANO, idPlano);
  window.dispatchEvent(new Event(EVENTO_PLANO));
}

export function planoLiberaRecurso(idPlano, recurso) {
  // Sem plano escolhido não há o que limitar, pois ainda não existe login real.
  if (!idPlano) {
    return true;
  }

  return RECURSOS_DO_PLANO[idPlano].includes(recurso);
}

// Comissão do Xepa+ (ex.: 0.15 = 15%). Sem plano escolhido, vale a do plano Grátis.
export function taxaDoPlano(idPlano = carregarPlanoSelecionado()) {
  const plano = PLANOS.find((item) => item.id === idPlano) || PLANOS[0];

  return plano.taxa;
}
