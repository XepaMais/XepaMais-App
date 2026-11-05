import { useEffect, useState } from 'react';
import {
  carregarPlanoSelecionado,
  planoLiberaRecurso,
  EVENTO_PLANO,
} from '@/modulos/feirante/servicos/planoFeirante';

// Mantém o menu e as páginas iguais ao plano escolhido, mesmo quando ele muda.
export default function usePlano() {
  const [plano, setPlano] = useState(carregarPlanoSelecionado);

  useEffect(() => {
    function atualizar() {
      setPlano(carregarPlanoSelecionado());
    }

    window.addEventListener(EVENTO_PLANO, atualizar);
    return () => window.removeEventListener(EVENTO_PLANO, atualizar);
  }, []);

  return {
    plano,
    temAcesso: (recurso) => planoLiberaRecurso(plano, recurso),
  };
}
