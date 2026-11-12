import { useEffect } from 'react';

/**
 * Faz os elementos com o atributo `data-revelar` aparecerem com animação
 * quando entram na tela. Use `style={{ '--atraso': '0.2s' }}` para escalonar.
 * Tipos: data-revelar="" (sobe), "esquerda", "direita" ou "zoom".
 */
export default function useRevelarAoRolar() {
  useEffect(() => {
    const elementos = document.querySelectorAll('[data-revelar]');
    const semAnimacao = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (semAnimacao || !('IntersectionObserver' in window)) {
      elementos.forEach((elemento) => elemento.classList.add('esta-visivel'));
      return undefined;
    }

    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('esta-visivel');
            observador.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
    );

    elementos.forEach((elemento) => observador.observe(elemento));

    return () => observador.disconnect();
  }, []);
}
