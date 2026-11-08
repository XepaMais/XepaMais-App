import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CardXepa } from '@/modulos/usuario/paginas/inicio/componentes/CardXepa.jsx';
import style from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

// Sem children, mostra os cards de xepa. Com children, mostra os cards recebidos (ex.: feiras).
export function CarrosselXepas({ xepas, mensagemVazia, children, classeRolagem = '' }) {
  const trilho = useRef(null);
  const [podeVoltar, setPodeVoltar] = useState(false);
  const [podeAvancar, setPodeAvancar] = useState(false);

  // As setas só aparecem quando existe algo para aquele lado.
  // O useCallback mantém a mesma função entre as renderizações, pois ela é usada no useEffect.
  const atualizarSetas = useCallback(() => {
    const elemento = trilho.current;

    if (!elemento) return;

    setPodeVoltar(elemento.scrollLeft > 1);
    setPodeAvancar(elemento.scrollLeft + elemento.clientWidth < elemento.scrollWidth - 1);
  }, []);

  useEffect(() => {
    atualizarSetas();
    window.addEventListener('resize', atualizarSetas);
    return () => window.removeEventListener('resize', atualizarSetas);
  }, [atualizarSetas, xepas]);

  function rolar(direcao) {
    const elemento = trilho.current;
    // Quem pediu menos animação no sistema vê a rolagem sem efeito suave.
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elemento.scrollBy({
      left: direcao * elemento.clientWidth,
      behavior: reduzir ? 'auto' : 'smooth',
    });
  }

  if (xepas.length === 0) {
    return <p className={style.semXepas}>{mensagemVazia}</p>;
  }

  return (
    <div className={style.areaCarrossel}>
      {podeVoltar && (
        <button
          type="button"
          className={style.setaesquerda}
          onClick={() => rolar(-1)}
          aria-label="Voltar"
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
      )}

      <div
        className={`${style.rolagem} ${classeRolagem}`}
        ref={trilho}
        onScroll={atualizarSetas}
      >
        {children || xepas.map((xepa) => <CardXepa key={xepa.id} xepa={xepa} />)}
      </div>

      {podeAvancar && (
        <button
          type="button"
          className={style.setadireita}
          onClick={() => rolar(1)}
          aria-label="Avançar"
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
