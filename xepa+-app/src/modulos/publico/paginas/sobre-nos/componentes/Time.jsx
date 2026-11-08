import { useCallback, useEffect, useRef, useState } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Time.css';
import fotoMatheus from '@/assets/imagens/sobre-nos/matheus.jpeg';
import fotoFernanda from '@/assets/imagens/sobre-nos/fernanda.jpeg';
import fotoHenrique from '@/assets/imagens/sobre-nos/henrique.jpeg';
import fotoIgor from '@/assets/imagens/sobre-nos/igor.jpeg';
import fotoJamilly from '@/assets/imagens/sobre-nos/jamilly.jpeg';
import fotoGabriel from '@/assets/imagens/sobre-nos/gabriel.jpeg';
import fotoHadson from '@/assets/imagens/sobre-nos/hadson.jpeg';
import decoracaoCesta from '@/assets/imagens/sobre-nos/decoracao-cesta.png';

const CORES = ['verde', 'laranja', 'amarelo'];

const DESCRICAO_PADRAO =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis.';

const TIME = [
  {
    nome: 'Gabriel Carneiro',
    tags: ['Product Owner', 'Marketing'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoGabriel,
    linkedin: 'https://www.linkedin.com/in/gabriel-carneiro-5459b6303/',
    github: 'https://github.com/carneirogabri',
  },
  {
    nome: 'Jamilly Moreira',
    tags: ['Scrum Master', 'Vendas'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoJamilly,
    linkedin: 'https://www.linkedin.com/in/jamillymoreira/',
    github: 'https://github.com/milly-m-dev',
  },
  {
    nome: 'Fernanda Ribeiro',
    tags: ['Documentarista', 'Financeiro'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoFernanda,
    linkedin: 'https://www.linkedin.com/in/f3f3h/',
    github: 'https://github.com/f3f3h',
  },
  {
    nome: 'Hadson de Jesus',
    tags: ['Desenvolvedor', 'Vendas'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoHadson,
    linkedin: 'https://www.linkedin.com/in/hadson-ferreira-068088271/',
    github: 'https://github.com/fhadson',
  },
  {
    nome: 'Henrique Mazza',
    tags: ['Desenvolvedor', 'IA'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoHenrique,
    linkedin: 'https://www.linkedin.com/in/henriquemazzavalle/',
    github: 'https://github.com/HenriqueMazza',
  },
  {
    nome: 'Igor Aguiar',
    tags: ['Desenvolvedor', 'Dados'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoIgor,
    linkedin: 'https://www.linkedin.com/in/igor-aguiar-ab193132b/',
    github: 'https://github.com/Igordevice',
  },
  {
    nome: 'Matheus Barros',
    tags: ['Desenvolvedor', 'Dados'],
    descricao: DESCRICAO_PADRAO,
    foto: fotoMatheus,
    linkedin: 'https://www.linkedin.com/in/matheus-barros-13b652330/',
    github: 'https://github.com/MatheusSouzaBarros',
  },
  {
    nome: 'Murilo Verissimo',
    tags: ['Desenvolvedor', 'Marketing'],
    descricao: DESCRICAO_PADRAO,
    foto: null,
    linkedin: 'https://www.linkedin.com/in/murilo-verissimo-44a958372/',
    github: 'https://github.com/verissimoMuh',
  },
];

function iniciais(nome) {
  return nome
    .split(' ')
    .slice(0, 2)
    .map((parte) => parte[0])
    .join('')
    .toUpperCase();
}

function partesDoNome(nome) {
  const [primeiro, ...resto] = nome.split(' ');
  return [primeiro, resto.join(' ')];
}

function Carrossel() {
  const trilho = useRef(null);
  const [pagina, setPagina] = useState(0);
  const [paginas, setPaginas] = useState(1);

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
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elemento.scrollTo({
      left: indice * elemento.clientWidth,
      behavior: reduzir ? 'auto' : 'smooth',
    });
  }

  const pontos = Array.from({ length: paginas }, (_, indice) => indice);

  return (
    <div className="time">
      <ul className="time__trilho" ref={trilho} onScroll={atualizar}>
        {TIME.map((membro, indice) => (
          <li key={membro.nome} className={`card-time card-time--${CORES[indice % CORES.length]}`}>
            <img className="card-time__decoracao" src={decoracaoCesta} alt="" aria-hidden="true" />

            <div className="card-time__topo">
              <div className="card-time__tags">
                {membro.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <h3 className="card-time__nome">
                {partesDoNome(membro.nome).map((parte) => (
                  <span key={parte}>{parte}</span>
                ))}
              </h3>
              <p className="card-time__descricao">{membro.descricao}</p>
            </div>

            <div className="card-time__foto">
              {membro.foto ? (
                <img src={membro.foto} alt={`Foto de ${membro.nome}`} loading="lazy" />
              ) : (
                <span className="card-time__sem-foto" aria-hidden="true">
                  {iniciais(membro.nome)}
                </span>
              )}

              <div className="card-time__links">
                <a
                  className="btn-linkedin"
                  href={membro.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`LinkedIn de ${membro.nome}`}
                >
                  LinkedIn
                </a>
                <a
                  className="btn-github"
                  href={membro.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`GitHub de ${membro.nome}`}
                >
                  GitHub
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {paginas > 1 && (
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
      )}
    </div>
  );
}

export default function Time() {
  return (
    <section className="secao secao-time">
      <h2 className="secao-time__titulo">Conheça nosso time !</h2>
      <p className="secao-time__texto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris. Duis aute irure dolor in reprehenderit in.
      </p>
      <Carrossel />
    </section>
  );
}