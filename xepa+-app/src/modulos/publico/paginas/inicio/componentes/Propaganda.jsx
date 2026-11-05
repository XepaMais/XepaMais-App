import fotoFeirante from '@/assets/imagens/pagina-inicial/feirante.png';
import '@/modulos/publico/paginas/inicio/estilos/Propaganda.css';

function IconeCesta() {
  return (
    <svg
      className="propaganda-icone"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 11-1 9" />
      <path d="m19 11-4-7" />
      <path d="M2 11h20" />
      <path d="m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4" />
      <path d="M4.5 15.5h15" />
      <path d="m5 11 4-7" />
      <path d="m9 11 1 9" />
    </svg>
  );
}

function IconeLocalizacao() {
  return (
    <svg className="propaganda-icone" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
      <circle className="propaganda-icone-furo" cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconeEtiqueta() {
  return (
    <svg className="propaganda-icone" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle className="propaganda-icone-furo" cx="7.5" cy="7.5" r="1.5" />
    </svg>
  );
}

const BENEFICIOS = [
  { id: 'precos', Icone: IconeCesta, texto: 'Divulgue seus preços promocionais' },
  { id: 'regiao', Icone: IconeLocalizacao, texto: 'Seja encontrado por clientes da região' },
  { id: 'sobras', Icone: IconeEtiqueta, texto: 'Dê mais saída aos produtos que sobraram' },
];

export default function Propaganda({ onDivulgar }) {
  return (
    <section className="propaganda" aria-labelledby="propaganda-titulo">
      <div className="propaganda-container">
        <div className="propaganda-fundo">
          <figure className="propaganda-foto">
            <img src={fotoFeirante} alt="Feirante sorrindo segurando uma cesta de morangos" />
          </figure>

          <div className="propaganda-card">
            <h2 id="propaganda-titulo" className="propaganda-titulo">
              <span>Sobrou na Banca?</span>
              <span>Vira Oportunidade!</span>
            </h2>

            <p className="propaganda-destaque">
              Dê visibilidade à sua xepa, atraia clientes em busca de economia e venda mais antes de
              encerrar a feira.
            </p>

            <ul className="propaganda-lista">
              {BENEFICIOS.map((beneficio) => (
                <li key={beneficio.id}>
                  <beneficio.Icone />
                  <span>{beneficio.texto}</span>
                </li>
              ))}
            </ul>

            <button type="button" className="propaganda-botao" onClick={onDivulgar}>
              Divulgue seu trabalho
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
