import '@/modulos/publico/paginas/sobre-nos/estilos/Quemsomos.css';
import feirante from '@/assets/imagens/sobre-nos/Feirante.jpg';
import estrela from '@/assets/imagens/pagina-inicial/estrela-1.png';

function QuemSomos() {
  return (
    <section className="sn-intro" aria-labelledby="sn-intro-titulo">
      <div className="sn-intro__visual">
        <div className="sn-intro__arco">
          <img
            className="sn-intro__foto"
            src={feirante}
            alt="Agricultor segurando um maço de folhas de couve na plantação"
          />
        </div>
        <img className="sn-intro__estrela" src={estrela} alt="" aria-hidden="true" />
      </div>

      <div className="sn-intro__texto">
        <p className="sn-eyebrow">Quem somos</p>
        <h2 id="sn-intro-titulo" className="sn-titulo">
          Um projeto contra o desperdício nas feiras de São Paulo
        </h2>
        <p className="sn-texto">
          Somos estudantes que se uniram para dar um novo destino à <strong>xepa</strong>: os
          alimentos que sobram no fim da feira e que ainda estão ótimos para o consumo.
        </p>
        <a className="sn-botao" href="#time">
          Conheça o time
        </a>
      </div>
    </section>
  );
}

export default QuemSomos;
