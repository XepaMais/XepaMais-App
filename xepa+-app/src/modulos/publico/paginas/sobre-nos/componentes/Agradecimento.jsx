import '@/modulos/publico/paginas/sobre-nos/estilos/Agradecimento.css';
import fotoPais from '@/assets/imagens/sobre-nos/pais.jpg';

function Agradecimentos() {
  return (
    <section className="secao">
      <h2>Agradecimentos</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum. Excepteur sint occaecat cupidatat non proident.
      </p>
      <img className="agradecimentos" src={fotoPais} alt="Foto dos pais" />
    </section>
  );
}

export default Agradecimentos;
