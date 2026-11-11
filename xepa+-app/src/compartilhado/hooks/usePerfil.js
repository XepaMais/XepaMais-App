import { useEffect, useState } from 'react';
import { carregarPerfil, salvarPerfil, EVENTO_PERFIL } from '@/compartilhado/servicos/perfil';

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
