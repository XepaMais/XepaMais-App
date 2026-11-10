import '@/modulos/publico/paginas/inicio/estilos/About.css';
import { useNavigate } from 'react-router-dom';
import imagemFeira from '@/assets/imagens/pagina-inicial/group-14.png';
import imagemAlimentos from '@/assets/imagens/pagina-inicial/group-15.png';

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="secao-sobre" id="sobre">
      <div className="conteudo-sobre">

        <h2>Um projeto contra o desperdício nas feiras</h2>

        <p className="sobre-texto">
          Somos estudantes que se uniram para dar um novo destino à <strong>xepa</strong>: os
          alimentos que sobram no fim da feira e ainda estão ótimos para o consumo. Conectamos
          feirantes e consumidores para que eles cheguem à mesa, e não ao lixo.
        </p>

        <button type="button" className="botao-sobre" onClick={() => navigate('/sobrenos')}>
          Conheça nossa história
        </button>
      </div>

      <div className="colagem-sobre">
        <img
          className="foto-sobre foto-sobre--feira"
          src={imagemFeira}
          alt="Feira que inspirou o projeto Xepa+"
        />

        <img
          className="foto-sobre foto-sobre--alimentos"
          src={imagemAlimentos}
          alt="Verduras e legumes frescos"
        />
      </div>
    </section>
  );
}
