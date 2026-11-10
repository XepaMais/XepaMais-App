import { useEffect, useState } from 'react';
import { carregarConversas, EVENTO_CONVERSAS } from '@/compartilhado/servicos/conversas';

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
