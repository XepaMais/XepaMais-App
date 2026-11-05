import '@/modulos/publico/paginas/inicio/estilos/About.css';
import { useNavigate } from 'react-router-dom';
import imagemFeira from '@/assets/imagens/pagina-inicial/group-14.png';
import imagemAlimentos from '@/assets/imagens/pagina-inicial/group-15.png';

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="secao-sobre" id="sobre">
      <div className="conteudo-sobre">
        <h2>
          Conheça quem
          <br />
          nos inspirou
        </h2>

        <p>
          Sunti in culpa qui officia deserunt mollit anim id est laborum. Nemo enim ipsam voluptatem
          quia voluptas sit aspernatur aut odit aut fugit. Neque porro quisquam est, qui dolorem
          ipsum quia dolor sit amet.
        </p>

        <button type="button" className="botao-sobre" onClick={() => navigate('/Sobrenos')}>
          Saiba mais
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
