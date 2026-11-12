import '@/modulos/publico/paginas/inicio/estilos/PlanosFeirante.css';
import { PLANOS } from '@/compartilhado/dados/planos';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

export default function PlanosFeirante({ onComprar }) {
  return (
    <section className="planos-feirante" aria-labelledby="planos-titulo">
      <div className="planos-conteudo">
        <h2 id="planos-titulo" className="planos-titulo" data-revelar>
          Feirante, veja nossos <Rabisco cor="#f76019">Planos</Rabisco>
        </h2>

        <p className="planos-subtitulo" data-revelar style={{ '--atraso': '0.08s' }}>
          Os planos são exclusivos para <strong>feirantes</strong> que querem divulgar sua banca.
          Para os consumidores, o Xepa+ é gratuito: não é preciso assinar nenhum plano.
        </p>

        <div className="planos-lista">
          {PLANOS.map((plano, indice) => (
            <article
              key={plano.id}
              className={`plano-card plano-card--${plano.id}`}
              data-revelar
              style={{ '--atraso': `${0.1 + indice * 0.12}s` }}
            >
              <h3 className="plano-nome">Plano {plano.nome}</h3>

              <div className="plano-corpo">
                <p className="plano-preco">
                  {plano.preco}
                  {plano.periodo && <span className="plano-periodo">{plano.periodo}</span>}
                </p>
                <p className="plano-descricao">{plano.descricao}</p>

                <ul className="plano-beneficios">
                  {plano.beneficios.map((beneficio) => (
                    <li key={beneficio}>{beneficio}</li>
                  ))}
                </ul>

                <button type="button" className="plano-botao" onClick={onComprar}>
                  Comprar Plano
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
