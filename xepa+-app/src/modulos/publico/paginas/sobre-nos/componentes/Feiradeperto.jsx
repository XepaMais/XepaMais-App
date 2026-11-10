import { useRef, useState } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Feiradeperto.css';
import videoFeira from '@/assets/videos/sobre-nos/feiramadru.mp4';

function FeiraDePerto() {
  const [tocando, setTocando] = useState(false);
  const videoRef = useRef(null);

  function reproduzir() {
    setTocando(true);
    videoRef.current.play();
  }

  return (
    <section className="secao" aria-labelledby="sn-feira">
      <div className="sn-cabecalho">
        <p className="sn-eyebrow">Na prática</p>
        <h2 id="sn-feira" className="sn-titulo">
          Conheça a feira de perto
        </h2>
        <p className="sn-texto">
          É no fim da feira que a xepa acontece. Dê o play e veja de perto o dia a dia que inspira o
          Xepa+.
        </p>
      </div>

      <div className="video">
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
            className="video__play"
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
