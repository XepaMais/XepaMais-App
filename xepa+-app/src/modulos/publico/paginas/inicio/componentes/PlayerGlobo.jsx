import { useEffect, useRef, useState } from 'react';

// Player oficial da Globo para incorporar vídeos do Globoplay/g1 em outros sites.
// (O Globoplay não deixa abrir a página do vídeo dentro de um iframe.)
const SCRIPT_PLAYER_GLOBO =
  'https://s3.glbimg.com/v1/AUTH_e1b09a2d222b4900a437a46914be81e5/api/stable/web/api.min.js';

let carregamento = null;

// Carrega o script uma única vez, mesmo que o componente apareça mais de uma vez.
function carregarScriptGlobo() {
  if (window.WM?.Player) return Promise.resolve();
  if (carregamento) return carregamento;

  carregamento = new Promise((resolver, rejeitar) => {
    const script = document.createElement('script');
    script.src = SCRIPT_PLAYER_GLOBO;
    script.async = true;
    script.onload = resolver;
    script.onerror = () => {
      carregamento = null;
      rejeitar(new Error('Não foi possível carregar o player da Globo'));
    };
    document.head.appendChild(script);
  });

  return carregamento;
}

export default function PlayerGlobo({ idVideo, linkOriginal }) {
  const containerRef = useRef(null);
  const [falhou, setFalhou] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    let player = null;
    let cancelado = false;

    carregarScriptGlobo()
      .then(() => {
        if (cancelado || !container) return;
        player = new window.WM.Player({
          videosIDs: String(idVideo),
          width: '100%',
          height: '100%',
          autoPlay: false,
        });
        player.attachTo(container);
      })
      .catch(() => {
        if (!cancelado) setFalhou(true);
      });

    return () => {
      cancelado = true;
      try {
        player?.destroy();
      } catch {
        // o player já pode ter sido removido
      }
      if (container) container.innerHTML = '';
    };
  }, [idVideo]);

  if (falhou) {
    return (
      <a className="player-globo__reserva" href={linkOriginal} target="_blank" rel="noreferrer">
        Assistir no Globoplay
      </a>
    );
  }

  return <div className="player-globo" ref={containerRef} />;
}
