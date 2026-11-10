import { useEffect, useRef, useState } from 'react';
import { Apple, Carrot, LeafyGreen, Sprout } from 'lucide-react';
import '@/modulos/publico/paginas/inicio/estilos/Benefits.css';

import caixaXepa from '@/assets/imagens/pagina-inicial/caixa-xepa.png';

// A ordem define a posição: no computador, 1 e 3 ficam à esquerda da caixa e 2 e 4 à direita;
// no celular, as quatro formam uma grade 2 x 2 abaixo dela.
const categorias = [
  { nome: 'Legumes', Icone: Carrot, cor: 'laranja' },
  { nome: 'Verduras', Icone: LeafyGreen, cor: 'verde' },
  { nome: 'Frutas', Icone: Apple, cor: 'verde' },
  { nome: 'Temperos', Icone: Sprout, cor: 'laranja' },
];

export default function Benefits() {
  const secaoRef = useRef(null);
  // 'parado': sem animação (movimento reduzido) | 'aguardando': escondido até a seção aparecer
  // | 'visivel': anima
  const [etapa, setEtapa] = useState(() => {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return reduzir || !('IntersectionObserver' in window) ? 'parado' : 'aguardando';
  });

  // A animação roda uma vez só, quando a seção chega à tela
  useEffect(() => {
    if (etapa !== 'aguardando') return undefined;

    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setEtapa('visivel');
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(secaoRef.current);
    return () => observer.disconnect();
  }, [etapa]);

  const classes = [
    'secao-beneficios',
    etapa !== 'parado' ? 'secao-beneficios--animada' : '',
    etapa === 'visivel' ? 'secao-beneficios--visivel' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <section className={classes} id="beneficios" ref={secaoRef} aria-labelledby="beneficios-titulo">
      <header className="cabecalho-beneficios">
        <h2 id="beneficios-titulo">O que você pode comprar</h2>

        <p>
          Com o Xepa+, você encontra alimentos frescos, economiza nas compras e ajuda a reduzir o
          desperdício nas feiras.
        </p>

        <a href="#sobre" className="botao-beneficios">
          Saiba mais
        </a>
      </header>

      <div className="ilustracao-beneficios">
        <img
          className="cesta-beneficios"
          src={caixaXepa}
          alt="Caixa do Xepa+ com legumes, verduras, frutas e temperos"
        />

        {categorias.map(({ nome, Icone, cor }, indice) => (
          <div
            key={nome}
            className={`categoria-beneficio categoria-beneficio--${cor}`}
            style={{ '--ordem': indice, gridArea: `c${indice + 1}` }}
          >
            <span className="categoria-beneficio__icone" aria-hidden="true">
              <Icone size={22} strokeWidth={2.2} />
            </span>
            <strong className="categoria-beneficio__nome">{nome}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
