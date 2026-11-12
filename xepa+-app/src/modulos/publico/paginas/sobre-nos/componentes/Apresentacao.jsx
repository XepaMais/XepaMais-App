import '@/modulos/publico/paginas/sobre-nos/estilos/Apresentacao.css';
import mamao from '@/assets/imagens/pagina-inicial/mamao-home.png';
import mamaoMetade from '@/assets/imagens/pagina-inicial/mamao-funciona.png';
import melancia from '@/assets/imagens/pagina-inicial/melancia-home.png';
import goiaba from '@/assets/imagens/pagina-inicial/goiaba-home.png';
import uva from '@/assets/imagens/pagina-inicial/uva-home.png';
import kiwi from '@/assets/imagens/pagina-inicial/kiwi-home.png';
import abacaxi from '@/assets/imagens/pagina-inicial/abacaxi-home.png';
import pessego from '@/assets/imagens/pagina-inicial/pessego-funciona.png';
import laranja from '@/assets/imagens/pagina-inicial/laranja-funciona.png';


const FILEIRA_DE_TRAS = [
  { img: kiwi, x: 7.1, t: 15.5, b: 4, r: 0 },
  { img: abacaxi, x: 21.4, t: 15.5, b: 5, r: -12 },
  { img: pessego, x: 35.7, t: 15.5, b: 4, r: 15 },
  { img: mamaoMetade, x: 50, t: 17, b: 3, r: 0 },
  { img: pessego, x: 64.3, t: 15.5, b: 4, r: -15, espelhar: true },
  { img: abacaxi, x: 78.6, t: 15.5, b: 5, r: 12 },
  { img: kiwi, x: 92.9, t: 15.5, b: 4, r: 0 },
];

const FILEIRA_DA_FRENTE = [
  { img: uva, x: 0, t: 17, b: -6, r: 0 },
  { img: laranja, x: 14.3, t: 18.5, b: -6.5, r: 10 },
  { img: melancia, x: 28.6, t: 17, b: -6, r: -8 },
  { img: mamao, x: 42.9, t: 17, b: -6, r: 6 },
  { img: goiaba, x: 57.1, t: 17, b: -6, r: -6 },
  { img: melancia, x: 71.4, t: 17, b: -6, r: 8 },
  { img: laranja, x: 85.7, t: 18.5, b: -6.5, r: -10, espelhar: true },
  { img: uva, x: 100, t: 17, b: -6, r: 0 },
];

function Fruta({ fruta, indice, frente }) {
  return (
    <img
      className={frente ? 'sn-fruta sn-fruta--frente' : 'sn-fruta'}
      src={fruta.img}
      alt=""
      style={{
        '--x': `${fruta.x}%`,
        '--t': fruta.t,
        '--b': fruta.b,
        '--r': `${fruta.r}deg`,
        '--espelho': fruta.espelhar ? -1 : 1,
        '--atraso': `${0.15 + indice * 0.07}s`,
      }}
    />
  );
}

export default function Apresentacao() {
  return (
    <section className="sn-hero" aria-labelledby="sn-hero-titulo">
      <div className="sn-hero__conteudo">
        {/* cada palavra ganha uma faixa verde, como no título da Home */}
        <h1 id="sn-hero-titulo" className="sn-hero__titulo">
          <span className="sn-hero__linha">Sobre</span>
          <span className="sn-hero__linha">nós</span>
        </h1>
        <p className="sn-hero__texto">
          Conectamos feirantes e consumidores para que o alimento da feira chegue à mesa, e não ao
          lixo.
        </p>
      </div>

      <div className="sn-hero__frutas" aria-hidden="true">
        {FILEIRA_DE_TRAS.map((fruta, indice) => (
          <Fruta key={`tras-${indice}`} fruta={fruta} indice={indice} />
        ))}
        {FILEIRA_DA_FRENTE.map((fruta, indice) => (
          <Fruta key={`frente-${indice}`} fruta={fruta} indice={indice} frente />
        ))}
      </div>
    </section>
  );
}
