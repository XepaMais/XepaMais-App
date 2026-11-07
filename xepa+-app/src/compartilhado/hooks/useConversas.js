import { useEffect, useState } from 'react';
import { carregarConversas, EVENTO_CONVERSAS } from '@/compartilhado/servicos/conversas';

// Mantém a lista de conversas atualizada. O evento "storage" sincroniza outras abas
// do mesmo navegador (ex.: feirante numa aba e consumidor na outra).
export default function useConversas() {
  const [conversas, setConversas] = useState(carregarConversas);

  useEffect(() => {
    function atualizar() {
      setConversas(carregarConversas());
    }

    window.addEventListener(EVENTO_CONVERSAS, atualizar);
    window.addEventListener('storage', atualizar);

    return () => {
      window.removeEventListener(EVENTO_CONVERSAS, atualizar);
      window.removeEventListener('storage', atualizar);
    };
  }, []);

  return conversas;
}
