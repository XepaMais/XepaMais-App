import { useEffect, useRef } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Bloco.css';

/*
 * Bloco de duas metades: painel colorido com texto + vídeo até a borda.
 * cor: 'lima' | 'laranja' | 'amarelo'   invertido: vídeo à esquerda
 * corRotulo: cor do subtítulo (ex.: '#FF5200')
 * Prefixo "sn-" para não herdar estilos de outras páginas (ex.: .painel do financeiro).
 */
export default function Painel({
  id,
  rotulo,
  corRotulo,
  titulo,
  cor,
  video,
  poster,
  descricaoVideo,
  invertido,
  children,
}) {
  const videoRef = useRef(null);

  // O vídeo só toca quando está na tela e quando a pessoa não pediu menos movimento
  useEffect(() => {
    const elemento = videoRef.current;
    if (!elemento) return undefined;

    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzir || !('IntersectionObserver' in window)) {
      if (!reduzir) elemento.play().catch(() => {});
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          elemento.play().catch(() => {});
        } else {
          elemento.pause();
        }
      },
      { threshold: 0.25 },
    );

    observer.observe(elemento);
    return () => observer.disconnect();
  }, []);

  const classes = ['sn-painel', `sn-painel--${cor}`, invertido ? 'sn-painel--invertido' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} aria-labelledby={id}>
      <div className="sn-painel__texto">
        <div className="sn-painel__conteudo">
          <p className="sn-eyebrow" style={corRotulo ? { color: corRotulo } : undefined}>
            {rotulo}
          </p>
          <h2 id={id} className="sn-titulo">
            {titulo}
          </h2>
          {children}
        </div>
      </div>

      <div className="sn-painel__midia">
        <video
          ref={videoRef}
          src={video}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={descricaoVideo}
        />
      </div>
    </section>
  );
}
