import { useRef, useState } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Feiradeperto.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import videoFeira from '@/assets/videos/sobre-nos/feiramadru.mp4';

function FeiraDePerto() {
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef(null);

  function reproduzir() {
    setTocando(true);
    videoRef.current.play();
  }

  return (
    <section className="sn-feira" aria-labelledby="sn-feira">
      <header className="sn-topo">
        <h2 id="sn-feira" className="sn-h2" data-revelar>
          Conheça a feira de <Rabisco cor="#f76019">perto</Rabisco>
        </h2>
        <p className="sn-p" data-revelar style={{ '--atraso': '0.08s' }}>
          É no fim da feira que a xepa acontece. Dê o play e veja de perto o dia a dia que inspira o
          Xepa+.
        </p>
      </header>

      <div className="sn-feira__video" data-revelar="zoom" style={{ '--atraso': '0.15s' }}>
        <video
          ref={videoRef}
          src={`${videoFeira}#t=0.1`}
          preload="metadata"
          controls={tocando}
          playsInline
        />
        {!tocando && (
          <button
            type="button"
            className="sn-feira__play"
            aria-label="Reproduzir vídeo"
            onClick={reproduzir}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default FeiraDePerto;
