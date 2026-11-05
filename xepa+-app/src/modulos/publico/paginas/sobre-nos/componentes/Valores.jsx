import '@/modulos/publico/paginas/sobre-nos/estilos/Bloco.css';
import fotoValores from '@/assets/imagens/sobre-nos/feira-rio-de-janeiro.jpg';

function Valores() {
  return (
    <section className="bloco bloco--invertido">
      <div className="bloco__texto">
        <h2>Valores</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate
          velit esse cillum. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
      <div className="bloco__midia">
        <img src={fotoValores} alt="Feira do Rio de Janeiro" />
      </div>
    </section>
  );
}

export default Valores;
