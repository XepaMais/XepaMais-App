import '@/modulos/publico/paginas/sobre-nos/estilos/Bloco.css';
import fotoMissao from '@/assets/imagens/sobre-nos/feira-1.jpg';

function Missao() {
  return (
    <section className="bloco">
      <div className="bloco__midia">
        <img src={fotoMissao} alt="Feira livre" />
      </div>
      <div className="bloco__texto">
        <h2>Missão</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
    </section>
  );
}

export default Missao;
