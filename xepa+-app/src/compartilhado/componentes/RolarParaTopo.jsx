import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Ao trocar de página, volta para o início da tela.
// Links com âncora (ex.: /#mapa) continuam indo direto para a seção.
export default function RolarParaTopo() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return;
    // No projeto quem rola é o <body> (não a janela), então zeramos os dois
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname, hash]);

  return null;
}
