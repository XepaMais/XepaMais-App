import { useState } from 'react';
import { ChevronsDown } from 'lucide-react';
import { CATEGORIAS_GASTO } from '@/modulos/feirante/servicos/gastosFeirante';
import Modal from '@/compartilhado/componentes/modal/Modal';
import styles from '@/compartilhado/componentes/modal/Modal.module.css';

const ordensQuantidade = [
  { valor: 'maior', rotulo: 'Maior quantidade' },
  { valor: 'menor', rotulo: 'Menor quantidade' },
];

const ordensPreco = [
  { valor: 'maior', rotulo: 'Maior preço' },
  { valor: 'menor', rotulo: 'Menor preço' },
];

const filtrosVazios = { categoria: '', ordemQuantidade: '', ordemPreco: '' };

function CampoSelect({ id, rotulo, valor, onChange, placeholder, opcoes }) {
  return (
    <div className={styles.campo}>
      <label htmlFor={id}>{rotulo}</label>
      <div className={styles.campoSelect}>
        <select
          id={id}
          value={valor}
          onChange={onChange}
          className={valor ? undefined : styles.vazio}
        >
          {/* Escolher esta opção de novo remove o filtro */}
          <option value="">{placeholder}</option>
          {opcoes.map((opcao) => (
            <option key={opcao.valor} value={opcao.valor}>
              {opcao.rotulo}
            </option>
          ))}
        </select>
        <ChevronsDown className={styles.iconeSelect} strokeWidth={2.5} aria-hidden="true" />
      </div>
    </div>
  );
}

function FormularioFiltro({ filtros, onFechar, onAplicar }) {
  const [rascunho, setRascunho] = useState(filtros);

  function alterar(campo, valor) {
    setRascunho({ ...rascunho, [campo]: valor });
  }

  function aplicar(evento) {
    evento.preventDefault();
    onAplicar(rascunho);
  }

  return (
    <Modal titulo="Filtro das despesas" aoFechar={onFechar}>
      <form className={styles.form} onSubmit={aplicar}>
        <h3 className={styles.subtitulo}>Ordenar por</h3>

        <CampoSelect
          id="filtroCategoria"
          rotulo="Categoria"
          valor={rascunho.categoria}
          onChange={(evento) => alterar('categoria', evento.target.value)}
          placeholder="Selecione a categoria"
          opcoes={CATEGORIAS_GASTO}
        />
        <CampoSelect
          id="filtroQuantidade"
          rotulo="Por quantidade"
          valor={rascunho.ordemQuantidade}
          onChange={(evento) => alterar('ordemQuantidade', evento.target.value)}
          placeholder="Selecione a ordem"
          opcoes={ordensQuantidade}
        />
        <CampoSelect
          id="filtroPreco"
          rotulo="Valor preço"
          valor={rascunho.ordemPreco}
          onChange={(evento) => alterar('ordemPreco', evento.target.value)}
          placeholder="Selecione a ordem"
          opcoes={ordensPreco}
        />

        <div className={styles.acoes}>
          <button
            type="button"
            className={styles.secundario}
            onClick={() => onAplicar(filtrosVazios)}
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

function PopUpFiltroGastos({ aberto, filtros, onFechar, onAplicar }) {
  if (!aberto) return null;

  return <FormularioFiltro filtros={filtros} onFechar={onFechar} onAplicar={onAplicar} />;
}

export default PopUpFiltroGastos;
