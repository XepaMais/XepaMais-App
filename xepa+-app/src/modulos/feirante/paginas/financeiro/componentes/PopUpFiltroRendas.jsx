import { useState } from 'react';
import { ChevronsDown } from 'lucide-react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import styles from '@/compartilhado/componentes/modal/Modal.module.css';
import {
  FILTROS_RENDA_VAZIOS,
  ORIGENS_RENDA,
} from '@/modulos/feirante/servicos/lancamentosFinanceiros';

function PopUpFiltroRendas({ filtros, onFechar, onAplicar }) {
  const [rascunho, setRascunho] = useState(filtros);

  function aplicar(evento) {
    evento.preventDefault();
    onAplicar(rascunho);
  }

  return (
    <Modal titulo="Filtro das rendas" aoFechar={onFechar}>
      <form className={styles.form} onSubmit={aplicar}>
        <div className={styles.campo}>
          <label htmlFor="filtroOrigem">Origem da renda</label>
          <div className={styles.campoSelect}>
            <select
              id="filtroOrigem"
              value={rascunho.origem}
              className={rascunho.origem ? undefined : styles.vazio}
              onChange={(evento) => setRascunho({ ...rascunho, origem: evento.target.value })}
            >
              <option value="">Todas as origens</option>
              {ORIGENS_RENDA.map((origem) => (
                <option key={origem}>{origem}</option>
              ))}
            </select>
            <ChevronsDown className={styles.iconeSelect} strokeWidth={2.5} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.campo}>
          <label htmlFor="filtroValor">Ordenar por valor</label>
          <div className={styles.campoSelect}>
            <select
              id="filtroValor"
              value={rascunho.ordemValor}
              className={rascunho.ordemValor ? undefined : styles.vazio}
              onChange={(evento) => setRascunho({ ...rascunho, ordemValor: evento.target.value })}
            >
              <option value="">Mais recentes primeiro</option>
              <option value="maior">Maior valor</option>
              <option value="menor">Menor valor</option>
            </select>
            <ChevronsDown className={styles.iconeSelect} strokeWidth={2.5} aria-hidden="true" />
          </div>
        </div>

        <div className={styles.acoes}>
          <button
            type="button"
            className={styles.secundario}
            onClick={() => onAplicar(FILTROS_RENDA_VAZIOS)}
          >
            Limpar filtros
          </button>
          <button type="submit" className={styles.principal}>
            Filtrar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PopUpFiltroRendas;
