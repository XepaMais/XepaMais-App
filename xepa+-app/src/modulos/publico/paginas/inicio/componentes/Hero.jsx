import '@/modulos/publico/paginas/inicio/estilos/Hero.css';
import mamao from '@/assets/imagens/pagina-inicial/mamao-home.png';
import abacaxi from '@/assets/imagens/pagina-inicial/abacaxi-home.png';
import melancia from '@/assets/imagens/pagina-inicial/melancia-home.png';
import kiwi from '@/assets/imagens/pagina-inicial/kiwi-home.png';
import goiaba from '@/assets/imagens/pagina-inicial/goiaba-home.png';
import uva from '@/assets/imagens/pagina-inicial/uva-home.png';

const frutas = [
  { classe: 'fruta-inicio--mamao', imagem: mamao },
  { classe: 'fruta-inicio--abacaxi', imagem: abacaxi },
  { classe: 'fruta-inicio--melancia', imagem: melancia },
  { classe: 'fruta-inicio--kiwi', imagem: kiwi },
  { classe: 'fruta-inicio--goiaba', imagem: goiaba },
  { classe: 'fruta-inicio--uva', imagem: uva },
];

// Palavras que passam na faixa. Adicione ou remova quantas quiser.
const palavras = [
  'Venha ver',
  'Xepa+',
  'Menos desperdício',
  'Feira fresquinha',
  'Preço justo',
  'Mais alimento',
  'Mais futuro',
];

// Cada grupo repete a lista para a faixa nunca ficar com buraco em telas largas.
const palavrasDoGrupo = palavras.concat(palavras);

export default function Hero() {
  return (
    <>
      <section className="secao-inicio" id="inicio">
        <div className="frutas-inicio" aria-hidden="true">
          {frutas.map((fruta) => (
            <img
              key={fruta.classe}
              className={`fruta-inicio ${fruta.classe}`}
              src={fruta.imagem}
              alt=""
            />
          ))}
        </div>

        <div className="conteudo-inicio">
          <h1 className="titulo-inicio">
            Menos desperdício,
            <br />
            mais alimento, mais futuro
          </h1>

          <p className="lead-inicio">
            O Xepa+ conecta feirantes e consumidores para que o alimento fresquinho chegue à mesa
            das pessoas, e não ao lixo.
          </p>
        </div>
      </section>

      {/* Faixa em carrossel: o 2º grupo é uma cópia só para o loop ficar contínuo */}
      <div className="faixa-xepa">
        <div className="faixa-xepa__trilha">
          <ul className="faixa-xepa__grupo">
            {palavrasDoGrupo.map((palavra, indice) => (
              <li key={indice} className="faixa-xepa__item">
                {palavra}
              </li>
            ))}
          </ul>

          <ul className="faixa-xepa__grupo" aria-hidden="true">
            {palavrasDoGrupo.map((palavra, indice) => (
              <li key={indice} className="faixa-xepa__item">
                {palavra}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
