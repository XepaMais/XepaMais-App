import PerfilFeirante from '@/modulos/usuario/paginas/detalhe-produto/componentes/PerfilFeirante.jsx';
import styles from '@/modulos/usuario/paginas/detalhe-produto/estilos/LocalizacaoPerfil.module.css';

function LocalizacaoPerfil({ xepa }) {
  let endereco = `${xepa.local}, `;
  if (xepa.cep) {
    endereco += `${xepa.cep}, `;
  }

  const enderecoMapa = encodeURIComponent(`${endereco}Brasil`);

  return (
    <div className={styles.cards}>
      {/* LOCALIZAÇÃO */}
      <section className={styles.card}>
        <h2>Localização da feira</h2>
        <p className={styles.sub}>Onde retirar esta xepa</p>

        <div className={styles.mapa}>
          <span className={styles.selo}>LOCALIZAÇÃO APROXIMADA</span>
          <iframe
            src={`https://www.google.com/maps?q=${enderecoMapa}&output=embed`}
            title={`Mapa de ${xepa.local}`}
            loading="lazy"
            allowFullScreen
          />
        </div>

        <div className={styles.infoFeira}>
          <span className={styles.nomeFeira}>
            <i /> {xepa.feira || 'Local de retirada'}
          </span>
        </div>
        <p className={`${styles.cinza} ${styles.endereco}`}>
          {xepa.local}
          {xepa.cep && ` · CEP ${xepa.cep}`}
        </p>
      </section>

      <PerfilFeirante xepa={xepa} />
    </div>
  );
}

export default LocalizacaoPerfil;
