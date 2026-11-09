import '@/modulos/publico/paginas/sobre-nos/estilos/Agradecimento.css';
import fotoPais from '@/assets/imagens/sobre-nos/pais.jpg';

function Agradecimentos() {
  return (
    <section className="secao" aria-labelledby="sn-agradecimentos">
      <div className="sn-cabecalho">
        <p className="sn-eyebrow">Obrigado</p>
        <h2 id="sn-agradecimentos" className="sn-titulo">
          Agradecimentos
        </h2>
        <p className="sn-texto">
          Às nossas famílias, aos professores e orientadores e aos feirantes que abriram suas bancas
          para a gente. Este projeto também é de vocês.
        </p>
      </div>
      <img className="agradecimentos" src={fotoPais} alt="Foto dos pais de integrantes do time" />
    </section>
  );
}

export default Agradecimentos;
