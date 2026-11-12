import '@/modulos/publico/paginas/sobre-nos/estilos/Quemsomos.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import feirante from '@/assets/imagens/sobre-nos/Feirante.jpg';

function QuemSomos() {
  return (
    <section className="sn-intro" aria-labelledby="sn-intro-titulo">
      <div className="sn-intro__grade">
        <div className="sn-intro__texto" data-revelar>
          <h2 id="sn-intro-titulo" className="sn-h2">
            Um projeto contra o <Rabisco>desperdício</Rabisco> nas feiras de São Paulo
          </h2>

          <p className="sn-p">
            Todo fim de feira, frutas, verduras e legumes ainda bons para o consumo acabam no lixo.
            Essa sobra tem nome: é a <strong>xepa</strong>.
          </p>

          <p className="sn-p">
            O <strong>Xepa+</strong> O Xepa+ nasceu para transformar essa realidade. A plataforma conecta feirantes e consumidores, permitindo que os feirantes divulguem os produtos que sobraram em suas bancas com preços especiais, enquanto os consumidores encontram feiras próximas, economizam dinheiro e levam alimentos frescos para casa.
          </p>

          <p className="sn-p">
            Assim, o feirante vende mais, as famílias gastam menos e a comida chega à mesa, e não
            ao lixo.
          </p>

          <div>
            <a className="sn-botao-login" href="#time">
              Conheça o time
            </a>
          </div>
        </div>

        <figure className="sn-intro__foto" data-revelar="direita" style={{ '--atraso': '0.15s' }}>
          <img src={feirante} alt="Agricultor segurando um maço de folhas de couve na plantação" />
        </figure>
      </div>
    </section>
  );
}

export default QuemSomos;
