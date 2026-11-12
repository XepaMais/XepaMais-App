import '@/modulos/publico/paginas/sobre-nos/estilos/Agradecimento.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import fotoPais from '@/assets/imagens/sobre-nos/pais.jpg';

function Agradecimentos() {
  return (
    <section className="sn-agradecimento" aria-labelledby="sn-agradecimentos">
      {/* texto de um lado, foto grande do outro */}
      <div className="sn-agradecimento__grade">
        <div className="sn-agradecimento__texto" data-revelar>
          <h2 id="sn-agradecimentos" className="sn-h2">
            Nosso <Rabisco cor="#f76019">obrigado</Rabisco>
          </h2>
          <p className="sn-p">
            Às nossas famílias, aos professores e orientadores e aos feirantes que abriram suas
            bancas para a gente. Este projeto também é de vocês.
          </p>
        </div>

        <img
          className="sn-agradecimento__foto"
          data-revelar="direita"
          style={{ '--atraso': '0.15s' }}
          src={fotoPais}
          alt="Foto dos pais de integrantes do time"
        />
      </div>
    </section>
  );
}

export default Agradecimentos;
