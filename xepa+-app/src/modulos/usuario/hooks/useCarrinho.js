import { useEffect, useState } from 'react';
import {
  carregarCarrinho,
  contarItens,
  montarItensCarrinho,
  EVENTO_CARRINHO,
} from '@/modulos/usuario/servicos/carrinho';

// Mantém o cabeçalho, os cards e a página do carrinho sempre iguais.
export default function useCarrinho() {
  const [itens, setItens] = useState(carregarCarrinho);

  useEffect(() => {
    function atualizar() {
      setItens(carregarCarrinho());
    }

    window.addEventListener(EVENTO_CARRINHO, atualizar);
    return () => window.removeEventListener(EVENTO_CARRINHO, atualizar);
  }, []);

  const itensDetalhados = montarItensCarrinho(itens);

  return {
    itens: itensDetalhados,
    estaNoCarrinho: (id) => itensDetalhados.some((item) => item.id === id),
    totalItens: contarItens(itensDetalhados),
  };
}
