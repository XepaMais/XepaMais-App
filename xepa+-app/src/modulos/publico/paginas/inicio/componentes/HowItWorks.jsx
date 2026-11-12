import { useEffect, useRef, useState } from 'react';
import '@/modulos/publico/paginas/inicio/estilos/HowItWorks.css';

import estrela1 from '@/assets/imagens/pagina-inicial/estrela-1.png';
import estrela2 from '@/assets/imagens/pagina-inicial/estrela-2.png';
import estrela3 from '@/assets/imagens/pagina-inicial/estrela-3.png';
import mamao from '@/assets/imagens/pagina-inicial/mamao-funciona.png';
import pessego from '@/assets/imagens/pagina-inicial/pessego-funciona.png';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

const etapas = [
  {
    numero: '1',
    imagem: estrela1,
    titulo: 'Crie sua conta',
    descricao: 'Cadastre-se para encontrar alimentos e feiras perto de você.',
  },
  {
    numero: '2',
    imagem: estrela2,
    titulo: 'Veja a feira perto de você',
    descricao: 'Encontre feirantes próximos e descubra os alimentos disponíveis.',
  },
  {
    numero: '3',
    imagem: estrela3,
    titulo: 'Compre e retire sua xepa',
    descricao: 'Escolha seus produtos e retire sua compra na feira.',
  },
];

export default function HowItWorks() {
  const secaoRef = useRef(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        if (entradas[0].isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(secaoRef.current);

    return () => observer.disconnect();
  }, []);

  // Cada passo aparece só quando chega à área visível da tela.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add('etapa-funcionamento--visivel');
            observer.unobserve(entrada.target);
          }
        }
      },
      { threshold: 0.6, rootMargin: '0px 0px -15% 0px' },
    );

    const etapasDaTela = secaoRef.current.querySelectorAll('.etapa-funcionamento');

    for (const etapa of etapasDaTela) {
      observer.observe(etapa);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={secaoRef}
      className={
        visivel ? 'secao-funcionamento secao-funcionamento--visivel' : 'secao-funcionamento'
      }
      id="como-funciona"
    >
      <img
        className="fruta-funcionamento fruta-funcionamento--direita"
        src={mamao}
        alt=""
        aria-hidden="true"
      />

      <img
        className="fruta-funcionamento fruta-funcionamento--esquerda"
        src={pessego}
        alt=""
        aria-hidden="true"
      />

      <div className="conteudo-funcionamento">
        <h2 data-revelar>
          Mas como isso <Rabisco>funciona</Rabisco>?
        </h2>

        <div className="lista-etapas">
          {etapas.map((etapa) => (
            <article className="etapa-funcionamento" key={etapa.numero}>
              <div className="icone-etapa">
                <img src={etapa.imagem} alt="" />
                <span>{etapa.numero}</span>
              </div>

              <div className="texto-etapa">
                <h3>{etapa.titulo}</h3>
                <p>{etapa.descricao}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
