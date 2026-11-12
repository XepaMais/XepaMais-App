import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
// Vídeo: agricultores colhendo na horta (Pexels, licença gratuita)
import videoAgricultor from '@/assets/videos/agricultor-colheita.mp4';
import '@/modulos/publico/paginas/inicio/estilos/Propaganda.css';

const BENEFICIOS = [
  'Divulgue os preços promocionais da sua xepa',
  'Seja encontrado por clientes da região',
  'Dê mais saída aos produtos que sobraram',
];

export default function Propaganda({ onDivulgar }) {
  return (
    <section className="propaganda" aria-labelledby="propaganda-titulo">
      {/* metade esquerda: vídeo ocupando toda a altura da seção */}
      <div className="propaganda-video">
        <video
          src={videoAgricultor}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Agricultores colhendo verduras na horta"
        />
      </div>

      <div className="propaganda-conteudo">
        <h2 id="propaganda-titulo" className="propaganda-titulo" data-revelar>
          Sobrou na banca?
          <br />
          Vira <Rabisco cor="#f76019">oportunidade!</Rabisco>
        </h2>

        <p className="propaganda-texto" data-revelar style={{ '--atraso': '0.1s' }}>
          Do campo até a sua banca, cada alimento dá trabalho. Dê visibilidade à sua xepa, atraia
          clientes em busca de economia e venda mais antes de encerrar a feira.
        </p>

        <ul className="propaganda-lista">
          {BENEFICIOS.map((beneficio, indice) => (
            <li key={beneficio} data-revelar style={{ '--atraso': `${0.2 + indice * 0.1}s` }}>
              {beneficio}
            </li>
          ))}
        </ul>

        <div className="propaganda-acoes" data-revelar style={{ '--atraso': '0.5s' }}>
          <button type="button" className="propaganda-botao" onClick={onDivulgar}>
            Divulgue seu trabalho
          </button>
          <span className="propaganda-nota">Comece pelo plano grátis</span>
        </div>
      </div>
    </section>
  );
}
