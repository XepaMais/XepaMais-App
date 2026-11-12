import { useEffect, useRef } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Bloco.css';

/*
 * Seção de largura total, igual à propaganda do feirante na Home:
 * metade com vídeo (até a borda) e metade com texto.
 * cor: 'verde' | 'laranja' | 'creme'   invertido: vídeo à direita
 * titulo: pode ter <Rabisco> na palavra de destaque
 * destaque: frase curta logo abaixo do título
 * Prefixo "sn-" para não herdar estilos de outras páginas (ex.: .painel do financeiro).
 */
export default function Painel({
  id,
  titulo,
  destaque,
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

      {/* o bloco de texto entra inteiro, de uma vez: nada passa por cima de nada */}
      <div className="sn-painel__texto" data-revelar>
        <h2 id={id} className="sn-painel__titulo">
          {titulo}
        </h2>

        {destaque && (
          <p className="sn-painel__destaque">
            {destaque}
          </p>
        )}

        <div className="sn-painel__corpo">
          {children}
        </div>
      </div>
    </section>
  );
}
