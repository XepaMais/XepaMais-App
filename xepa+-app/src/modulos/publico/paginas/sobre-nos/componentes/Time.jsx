import { useCallback, useEffect, useRef, useState } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Time.css';
import fotoMatheus from '@/assets/imagens/sobre-nos/matheus.jpeg';
import fotoFernanda from '@/assets/imagens/sobre-nos/fernanda.jpeg';
import fotoHenrique from '@/assets/imagens/sobre-nos/henrique.jpeg';
import fotoIgor from '@/assets/imagens/sobre-nos/igor.jpeg';
import fotoJamilly from '@/assets/imagens/sobre-nos/jamilly.jpeg';
import fotoGabriel from '@/assets/imagens/sobre-nos/gabriel.jpeg';
import fotoHadson from '@/assets/imagens/sobre-nos/hadson.jpeg';

const CORES = ['verde', 'laranja', 'amarelo'];

// Ordem: PO, Scrum Master, documentarista e, depois, desenvolvedores em ordem alfabética.
const TIME = [
  {
    nome: 'Gabriel Carneiro',
    tags: ['Product Owner', 'Marketing'],
    foto: fotoGabriel,
    linkedin: 'https://www.linkedin.com/in/gabriel-carneiro-5459b6303/',
    github: 'https://github.com/carneirogabri',
  },
  {
    nome: 'Jamilly Moreira',
    tags: ['Scrum Master', 'Vendas'],
    foto: fotoJamilly,
    linkedin: 'https://www.linkedin.com/in/jamillymoreira/',
    github: 'https://github.com/milly-m-dev',
  },
  {
    nome: 'Fernanda Ribeiro',
    tags: ['Documentarista', 'Financeiro'],
    foto: fotoFernanda,
    linkedin: 'https://www.linkedin.com/in/f3f3h/',
    github: 'https://github.com/f3f3h',
  },
  {
    nome: 'Hadson de Jesus',
    tags: ['Desenvolvedor', 'Vendas'],
    foto: fotoHadson,
    linkedin: 'https://www.linkedin.com/in/hadson-ferreira-068088271/',
    github: 'https://github.com/fhadson',
  },
  {
    nome: 'Henrique Mazza',
    tags: ['Desenvolvedor', 'IA'],
    foto: fotoHenrique,
    linkedin: 'https://www.linkedin.com/in/henriquemazzavalle/',
    github: 'https://github.com/HenriqueMazza',
  },
  {
    nome: 'Igor Aguiar',
    tags: ['Desenvolvedor', 'Dados'],
    foto: fotoIgor,
    linkedin: 'https://www.linkedin.com/in/igor-aguiar-ab193132b/',
    github: 'https://github.com/Igordevice',
  },
  {
    nome: 'Matheus Barros',
    tags: ['Desenvolvedor', 'Dados'],
    foto: fotoMatheus,
    linkedin: 'https://www.linkedin.com/in/matheus-barros-13b652330/',
    github: 'https://github.com/MatheusSouzaBarros',
  },
  {
    nome: 'Murilo Verissimo',
    tags: ['Desenvolvedor', 'Marketing'],
    foto: null,
    linkedin: 'https://www.linkedin.com/in/murilo-verissimo-44a958372/',
    github: 'https://github.com/verissimoMuh',
  },
];

function Carrossel() {
  const trilho = useRef(null);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);

  // O useCallback mantém a mesma função entre as renderizações, pois ela é usada no useEffect.
  const atualizar = useCallback(() => {
    const elemento = trilho.current;

    if (!elemento) return;

    setPaginas(Math.max(1, Math.ceil((elemento.scrollWidth - 1) / elemento.clientWidth)));
    setPagina(Math.round(elemento.scrollLeft / elemento.clientWidth));
  }, []);

  useEffect(() => {
    atualizar();
    window.addEventListener('resize', atualizar);
    return () => window.removeEventListener('resize', atualizar);
  }, [atualizar]);

  function irPara(indice) {
    const elemento = trilho.current;
    // Quem pediu menos animação no sistema vê a rolagem sem efeito suave.
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elemento.scrollTo({
      left: indice * elemento.clientWidth,
      behavior: reduzir ? 'auto' : 'smooth',
    });
  }

  // Um ponto para cada grupo de cards.
  const pontos = [];
  for (let indice = 0; indice < paginas; indice++) {
    pontos.push(indice);
  }

  return (
    <div className="time">
      <ul className="time__trilho" ref={trilho} onScroll={atualizar}>
        {TIME.map((membro, indice) => (
          <li key={membro.nome} className={`card-time card-time--${CORES[indice % CORES.length]}`}>
            <div className="card-time__topo">
              <div className="card-time__tags">
                {membro.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3>{membro.nome}</h3>
            </div>
            <div className="card-time__foto">
              {membro.foto && (
                <img src={membro.foto} alt={`Foto de ${membro.nome}`} loading="lazy" />
              )}
              <div className="card-time__links">
                <a className="btn-linkedin" href={membro.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn
                </a>
                <a className="btn-github" href={membro.github} target="_blank" rel="noreferrer">
                  GitHub
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="time__pontos">
        {pontos.map((indice) => (
          <button
            key={indice}
            type="button"
            className="ponto"
            aria-label={`Ir para o grupo ${indice + 1} de ${paginas}`}
            aria-current={indice === pagina}
            onClick={() => irPara(indice)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Time() {
  return (
    <section className="secao">
      <h2>Conheça nosso time !</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum. Excepteur sint occaecat cupidatat non proident.
      </p>
      <Carrossel />
    </section>
  );
}
