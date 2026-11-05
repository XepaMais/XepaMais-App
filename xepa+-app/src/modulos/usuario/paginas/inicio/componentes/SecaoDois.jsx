import { useNavigate } from 'react-router-dom';
import styles from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

const imagemFeira = 'https://conteudo.solutudo.com.br/wp-content/uploads/2022/04/feiratatuape.jpg';

export function SecaoDois() {
  const navigate = useNavigate();

  return (
    <section className={styles.secaoContainer}>
      <div className={styles.cardBanner}>
        <div className={styles.conteudoEsquerda}>
          <h2 className={styles.tituloBanner}>
            Confira as feiras <br /> perto da sua casa!
          </h2>
          <p className={styles.subtitulo}>
            Xepas fresquinhas dos feirantes perto de você, antes da feira fechar!
          </p>
          <button type="button" className={styles.botaoVer} onClick={() => navigate('/mapa')}>
            Ver feiras no mapa
          </button>
        </div>

        <div className={styles.conteudoDireita}>
          <img src={imagemFeira} alt="Imagem da feira" className={styles.imagemFeira} />
        </div>
      </div>
    </section>
  );
}
