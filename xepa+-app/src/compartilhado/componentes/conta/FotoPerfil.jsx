import styles from './FotoPerfil.module.css';

// Mostra a foto do perfil ou, sem foto, a inicial do nome.
function FotoPerfil({ nome, foto, tamanho = 36 }) {
  const inicial = nome.trim().charAt(0).toUpperCase();

  return (
    <span
      className={styles.foto}
      style={{ width: tamanho, height: tamanho, fontSize: tamanho * 0.45 }}
      aria-hidden="true"
    >
      {foto ? <img src={foto} alt="" /> : inicial}
    </span>
  );
}

export default FotoPerfil;
