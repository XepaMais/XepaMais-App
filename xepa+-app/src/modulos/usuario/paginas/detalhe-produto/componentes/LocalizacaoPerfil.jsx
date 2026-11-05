import { useNavigate } from 'react-router-dom';
import styles from '@/modulos/usuario/paginas/detalhe-produto/estilos/LocalizacaoPerfil.module.css';

function LocalizacaoPerfil({ xepa }) {
  const navegar = useNavigate();
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

      {/* PERFIL */}
      <section className={`${styles.card} ${styles.perfil}`}>
        <h2>Perfil do feirante</h2>
        <p className={styles.sub}>Conheça quem preparou sua xepa</p>

        <div className={styles.pessoa}>
          <div className={styles.avatar}></div>
          <strong>{xepa.feirante || 'Feirante'}</strong>
        </div>

        {xepa.barraca && (
          <div className={styles.sobre}>
            <span className={styles.rotulo}>BARRACA</span>
            <h3>{xepa.barraca}</h3>
          </div>
        )}

        <div className={styles.rodape}>
          {xepa.horario && (
            <div>
              <span className={styles.rotuloSimples}>Horário de atendimento</span>
              <strong>{xepa.horario}</strong>
            </div>
          )}
          <button type="button" onClick={() => navegar('/HistoricoChatUsuario')}>
            Falar com o feirante
          </button>
        </div>
      </section>
    </div>
  );
}

export default LocalizacaoPerfil;
