import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import styles from '@/compartilhado/componentes/modal/Modal.module.css';

// Campo opcional dos formulários de renda e de gasto.
function CampoFeira({ id, valor, onChange }) {
  const opcoes = carregarFeiras().map((feira) => feira.nome);

  // Mantém a feira salva como opção, mesmo que ela tenha sido renomeada ou removida.
  if (valor && !opcoes.includes(valor)) {
    opcoes.unshift(valor);
  }

  return (
    <div className={styles.campo}>
      <label htmlFor={id}>Feira (opcional)</label>
      <select id={id} value={valor} onChange={(evento) => onChange(evento.target.value)}>
        <option value="">Sem feira</option>
        {opcoes.map((nome) => (
          <option key={nome} value={nome}>
            {nome}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CampoFeira;
