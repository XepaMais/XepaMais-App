import '@/modulos/publico/paginas/inicio/estilos/PlanosFeirante.css';
import { PLANOS } from '@/compartilhado/dados/planos';

export default function PlanosFeirante({ onComprar }) {
  return (
    <section className="planos-feirante" aria-labelledby="planos-titulo">
      <div className="planos-conteudo">
        <h2 id="planos-titulo" className="planos-titulo">
          Feirante, veja nossos Planos
        </h2>

        <div className="planos-lista">
          {PLANOS.map((plano) => (
            <article key={plano.id} className={`plano-card plano-card--${plano.id}`}>
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
