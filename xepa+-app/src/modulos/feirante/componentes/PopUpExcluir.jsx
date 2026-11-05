import Modal from '@/compartilhado/componentes/modal/Modal';
import styles from '@/compartilhado/componentes/modal/Modal.module.css';

// Confirmação usada ao excluir uma renda, um gasto ou uma feira.
function PopUpExcluir({
  titulo,
  nome,
  aviso = 'será excluído e sairá dos totais, dos gráficos e das planilhas.',
  onFechar,
  onConfirmar,
}) {
  return (
    <Modal titulo={titulo} aoFechar={onFechar}>
      <p className={styles.descricao}>
        "{nome}" {aviso} Essa ação não pode ser desfeita.
      </p>

      <div className={styles.acoes}>
        <button type="button" className={styles.secundario} onClick={onFechar}>
          Cancelar
        </button>
        <button type="button" className={styles.perigo} onClick={onConfirmar}>
          Excluir
        </button>
      </div>
    </Modal>
  );
}

export default PopUpExcluir;
