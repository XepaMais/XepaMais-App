import { useEffect, useState } from 'react';
import {
  carregarLancamentosFinanceiros,
  salvarLancamentosFinanceiros,
} from '@/modulos/feirante/servicos/lancamentosFinanceiros';
import { carregarGastos, somarGastosDaSemana } from '@/modulos/feirante/servicos/gastosFeirante';
import { dataDeHoje, estaNaSemanaAtual, estaNoMesAtual } from '@/compartilhado/servicos/datas';

// Soma os lançamentos de um tipo: 'renda' ou 'compra'.
function total(lista, tipoLancamento) {
  let soma = 0;

  for (const item of lista) {
    if (item.tipo === tipoLancamento) {
      soma += Number(item.valor);
    }
  }

  return soma;
}

// O horário evita que a data mude de dia por causa do fuso.
function lerData(item) {
  return new Date(item.data + 'T12:00:00');
}

export default function useFinanceiro() {
  const [lancamentos, setLancamentos] = useState(carregarLancamentosFinanceiros);

  useEffect(() => {
    salvarLancamentosFinanceiros(lancamentos);
  }, [lancamentos]);

  const hoje = dataDeHoje();
  const doDia = lancamentos.filter((item) => item.data === hoje);
  const daSemana = lancamentos.filter((item) => estaNaSemanaAtual(lerData(item)));
  const doMes = lancamentos.filter((item) => estaNoMesAtual(lerData(item)));

  // Custos da semana: gastos cadastrados na página de Gastos + compras antigas já registradas.
  const custosDaSemana = somarGastosDaSemana(carregarGastos()) + total(daSemana, 'compra');

  // Adiciona a renda nova ou substitui a que está sendo editada.
  function salvarLancamento(lancamento) {
    const jaExiste = lancamentos.some((item) => item.id === lancamento.id);

    if (jaExiste) {
      setLancamentos(lancamentos.map((item) => (item.id === lancamento.id ? lancamento : item)));
    } else {
      setLancamentos([...lancamentos, lancamento]);
    }
  }

  function excluirLancamento(id) {
    setLancamentos(lancamentos.filter((item) => item.id !== id));
  }

  return {
    lancamentos,
    salvarLancamento,
    excluirLancamento,
    custosDaSemana,
    doDia,
    daSemana,
    doMes,
    total,
  };
}
