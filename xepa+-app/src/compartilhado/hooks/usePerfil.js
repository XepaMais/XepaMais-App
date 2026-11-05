import { useEffect, useState } from 'react';
import { carregarPerfil, salvarPerfil, EVENTO_PERFIL } from '@/compartilhado/servicos/perfil';

// Mantém o nome do cabeçalho e das saudações igual ao perfil salvo.
export default function usePerfil(tipo) {
  const [perfil, setPerfil] = useState(() => carregarPerfil(tipo));

  useEffect(() => {
    function atualizar() {
      setPerfil(carregarPerfil(tipo));
    }

    window.addEventListener(EVENTO_PERFIL, atualizar);
    return () => window.removeEventListener(EVENTO_PERFIL, atualizar);
  }, [tipo]);

  return {
    perfil,
    primeiroNome: perfil.nome.trim().split(' ')[0],
    salvar: (dados) => salvarPerfil(tipo, dados),
  };
}
