import '@/modulos/publico/paginas/inicio/estilos/About.css';
import { useNavigate } from 'react-router-dom';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import PlayerGlobo from '@/modulos/publico/paginas/inicio/componentes/PlayerGlobo.jsx';

// Reportagem do SP2 (TV Globo): "Xepa de feira é saída para encontrar promoções"
const VIDEO_XEPA_ID = '13584285';
const VIDEO_XEPA_LINK = 'https://globoplay.globo.com/v/13584285/';

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="secao-sobre" id="sobre">
      <div className="sobre-container">
        <div className="sobre-conteudo">
          <h2 className="sobre-titulo" data-revelar>
            Um projeto contra o <Rabisco>desperdício</Rabisco> nas feiras
          </h2>

          <p className="sobre-texto" data-revelar style={{ '--atraso': '0.08s' }}>
            Somos estudantes que se uniram para dar um novo destino à <strong>xepa</strong>: os
            alimentos que sobram no fim da feira e ainda estão ótimos para o consumo.
          </p>

          <p className="sobre-texto" data-revelar style={{ '--atraso': '0.16s' }}>
            Conectamos feirantes e consumidores para que esses alimentos cheguem à mesa, e não ao
            lixo.
          </p>

          <div data-revelar style={{ '--atraso': '0.24s' }}>
            <button type="button" className="botao-sobre" onClick={() => navigate('/sobrenos')}>
              Conheça nossa história
            </button>
          </div>
        </div>

        <figure className="sobre-video" data-revelar="direita" style={{ '--atraso': '0.15s' }}>
          <div className="sobre-video__moldura">
            <PlayerGlobo idVideo={VIDEO_XEPA_ID} linkOriginal={VIDEO_XEPA_LINK} />
          </div>
          <figcaption>
            SP2, TV Globo: “Xepa de feira é saída para encontrar promoções”.{' '}
            <a href={VIDEO_XEPA_LINK} target="_blank" rel="noreferrer">
              Ver no Globoplay
            </a>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
