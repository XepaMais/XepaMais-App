import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import '@/modulos/publico/paginas/sobre-nos/estilos/Time.css';
import fotoMatheus from '@/assets/imagens/sobre-nos/matheus.jpeg';
import fotoFernanda from '@/assets/imagens/sobre-nos/fernanda.jpeg';
import fotoHenrique from '@/assets/imagens/sobre-nos/henrique.jpeg';
import fotoIgor from '@/assets/imagens/sobre-nos/igor.jpeg';
import fotoJamilly from '@/assets/imagens/sobre-nos/jamilly.jpeg';
import fotoGabriel from '@/assets/imagens/sobre-nos/gabriel.jpeg';
import fotoHadson from '@/assets/imagens/sobre-nos/hadson.jpeg';
import fotoMurilo from '@/assets/imagens/sobre-nos/murilo.jpg';
import decoracaoCesta from '@/assets/imagens/sobre-nos/decoracao-cesta.png';

const CORES = ['verde', 'laranja', 'amarelo'];

const TIME = [
  {
    nome: 'Gabriel Carneiro',
    tags: ['Product Owner', 'Marketing'],
    descricao:
      'Define as prioridades do produto e garante que cada funcionalidade do Xepa+ resolva um problema real de feirantes e consumidores. Também cuida da comunicação da marca.',
    foto: fotoGabriel,
    linkedin: 'https://www.linkedin.com/in/gabriel-carneiro-5459b6303/',
    github: 'https://github.com/carneirogabri',
  },
  {
    nome: 'Jamilly Moreira',
    tags: ['Scrum Master', 'Vendas'],
    descricao:
      'Organiza as sprints, remove obstáculos e mantém o time alinhado e no ritmo certo. Também ajuda a pensar como o Xepa+ chega até os feirantes.',
    foto: fotoJamilly,
    linkedin: 'https://www.linkedin.com/in/jamillymoreira/',
    github: 'https://github.com/milly-m-dev',
  },
  {
    nome: 'Fernanda Ribeiro',
    tags: ['Documentarista', 'Financeiro'],
    descricao:
      'Registra cada decisão e etapa do projeto para que tudo fique claro e bem documentado. Também acompanha os custos e a viabilidade financeira do Xepa+.',
    foto: fotoFernanda,
    linkedin: 'https://www.linkedin.com/in/f3f3h/',
    github: 'https://github.com/f3f3h',
  },
  {
    nome: 'Hadson de Jesus',
    tags: ['Desenvolvedor', 'Vendas'],
    descricao:
      'Desenvolve funcionalidades da plataforma e transforma ideias em telas que funcionam. Também contribui com a estratégia para levar o Xepa+ às feiras.',
    foto: fotoHadson,
    linkedin: 'https://www.linkedin.com/in/hadson-ferreira-068088271/',
    github: 'https://github.com/fhadson',
  },
  {
    nome: 'Henrique Mazza',
    tags: ['Desenvolvedor', 'IA'],
    descricao:
      'Desenvolve a plataforma e cuida das soluções com inteligência artificial, como o assistente que ajuda o feirante no dia a dia da banca.',
    foto: fotoHenrique,
    linkedin: 'https://www.linkedin.com/in/henriquemazzavalle/',
    github: 'https://github.com/HenriqueMazza',
  },
  {
    nome: 'Igor Aguiar',
    tags: ['Desenvolvedor', 'Dados'],
    descricao:
      'Desenvolve a plataforma e trabalha com os dados do projeto, como o banco de dados e o mapeamento das feiras da cidade.',
    foto: fotoIgor,
    linkedin: 'https://www.linkedin.com/in/igor-aguiar-ab193132b/',
    github: 'https://github.com/Igordevice',
  },
  {
    nome: 'Matheus Barros',
    tags: ['Desenvolvedor', 'Dados'],
    descricao:
      'Desenvolve a plataforma e trabalha com os dados, transformando informações de vendas e desperdício em indicadores que mostram o impacto do Xepa+.',
    foto: fotoMatheus,
    linkedin: 'https://www.linkedin.com/in/matheus-barros-13b652330/',
    github: 'https://github.com/MatheusSouzaBarros',
  },
  {
    nome: 'Murilo Verissimo',
    tags: ['Desenvolvedor', 'Marketing'],
    descricao:
      'Desenvolve a plataforma e ajuda a construir a identidade do Xepa+, pensando em como apresentar o projeto de forma simples e atrativa.',
    foto: fotoMurilo,
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

/*
 * Carrossel "infinito": a lista é repetida 3 vezes e a pessoa fica sempre na cópia do meio.
 * Quando a rolagem para perto de uma das pontas, a posição pula (sem animação) para o mesmo
 * card na cópia do meio — por isso dá para ir para o lado sem nunca chegar ao fim.
 */
const COPIAS = 3;
const ITENS = Array.from({ length: COPIAS }, (_, copia) =>
  TIME.map((membro, indice) => ({ membro, indice, copia })),
).flat();

function CardMembro({ membro, indice, clone }) {
  // As cópias são só visuais: ficam fora do leitor de tela e da navegação por teclado
  const foco = clone ? { tabIndex: -1 } : {};

  return (
    <li
      className={`card-time card-time--${CORES[indice % CORES.length]}`}
      aria-hidden={clone || undefined}
    >
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
            {...foco}
          >
            LinkedIn
          </a>
          <a
            className="btn-github"
            href={membro.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`GitHub de ${membro.nome}`}
            {...foco}
          >
            GitHub
          </a>
        </div>
      </div>
    </li>
  );
}

function Seta({ direcao }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={direcao === 'esquerda' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

function Carrossel() {
  const trilho = useRef(null);
  const espera = useRef(null);
  const [atual, setAtual] = useState(0);

  // Distância entre dois cards e largura de uma cópia inteira da lista
  const medidas = useCallback(() => {
    const elemento = trilho.current;
    const [primeiro, segundo] = elemento.children;
    const passo = segundo.offsetLeft - primeiro.offsetLeft;
    return { elemento, passo, conjunto: passo * TIME.length };
  }, []);

  // Se estiver numa das cópias das pontas, pula para o mesmo card na cópia do meio
  const recentralizar = useCallback(() => {
    const { elemento, conjunto } = medidas();
    if (elemento.scrollLeft < conjunto * 0.5) {
      elemento.scrollLeft += conjunto;
    } else if (elemento.scrollLeft >= conjunto * 1.5) {
      elemento.scrollLeft -= conjunto;
    }
  }, [medidas]);

  // Começa na cópia do meio e mantém o card atual quando a janela muda de tamanho
  useLayoutEffect(() => {
    let indiceAtual = 0;

    function posicionar() {
      const { elemento, passo, conjunto } = medidas();
      elemento.scrollLeft = conjunto + indiceAtual * passo;
    }

    function aoRedimensionar() {
      const { elemento, passo } = medidas();
      indiceAtual = ((Math.round(elemento.scrollLeft / passo) % TIME.length) + TIME.length) % TIME.length;
      posicionar();
    }

    posicionar();
    window.addEventListener('resize', aoRedimensionar);
    return () => {
      window.removeEventListener('resize', aoRedimensionar);
      clearTimeout(espera.current);
    };
  }, [medidas]);

  function aoRolar() {
    const { elemento, passo } = medidas();
    const indice = Math.round(elemento.scrollLeft / passo);
    setAtual(((indice % TIME.length) + TIME.length) % TIME.length);

    // Recentraliza só quando a rolagem termina, para não interromper o movimento
    clearTimeout(espera.current);
    espera.current = setTimeout(recentralizar, 140);
  }

  function rolar(opcoes) {
    const reduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    trilho.current.scrollTo({ ...opcoes, behavior: reduzir ? 'auto' : 'smooth' });
  }

  function andar(direcao) {
    recentralizar();
    const { elemento, passo } = medidas();
    const destino = Math.round(elemento.scrollLeft / passo) + direcao;
    rolar({ left: destino * passo });
  }

  function irPara(indice) {
    recentralizar();
    const { passo, conjunto } = medidas();
    rolar({ left: conjunto + indice * passo });
  }

  return (
    <div className="time">
      <ul className="time__trilho" ref={trilho} onScroll={aoRolar}>
        {ITENS.map(({ membro, indice, copia }) => (
          <CardMembro
            key={`${copia}-${membro.nome}`}
            membro={membro}
            indice={indice}
            clone={copia !== 1}
          />
        ))}
      </ul>

      <div className="time__controles">
        <button
          type="button"
          className="time__seta"
          aria-label="Membro anterior"
          onClick={() => andar(-1)}
        >
          <Seta direcao="esquerda" />
        </button>

        <div className="time__pontos">
          {TIME.map((membro, indice) => (
            <button
              key={membro.nome}
              type="button"
              className="ponto"
              aria-label={`Ir para ${membro.nome}`}
              aria-current={indice === atual}
              onClick={() => irPara(indice)}
            />
          ))}
        </div>

        <button
          type="button"
          className="time__seta"
          aria-label="Próximo membro"
          onClick={() => andar(1)}
        >
          <Seta direcao="direita" />
        </button>
      </div>
    </div>
  );
}

export default function Time() {
  return (
    <section className="secao secao-time" id="time" aria-labelledby="sn-time">
      <div className="sn-cabecalho">
        <p className="sn-eyebrow">Quem faz o Xepa+</p>
        <h2 id="sn-time" className="sn-titulo">
          Conheça nosso time
        </h2>
        <p className="sn-texto">
          Estudantes de diferentes áreas com um mesmo objetivo: levar o alimento da feira à mesa, e
          não ao lixo.
        </p>
      </div>
      <Carrossel />
    </section>
  );
}