import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import IconeFiltro from './IconeFiltro.jsx';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import { estaNoPeriodo, PERIODOS } from '@/modulos/feirante/servicos/periodos';
import Styles from '../estilos/resumoGasto.module.css';

// Diferença entre dois valores: "maior" coloca o maior primeiro; "menor", o menor primeiro.
function compararValores(valorA, valorB, ordem) {
  if (ordem === 'maior') {
    return valorB - valorA;
  }

  return valorA - valorB;
}

// Ordena por quantidade primeiro e, em caso de empate, por preço unitário.
function compararGastos(a, b, filtros) {
  if (filtros.ordemQuantidade && a.quantidade !== b.quantidade) {
    return compararValores(a.quantidade, b.quantidade, filtros.ordemQuantidade);
  }

  if (filtros.ordemPreco && a.valorUnitario !== b.valorUnitario) {
    return compararValores(a.valorUnitario, b.valorUnitario, filtros.ordemPreco);
  }

  return 0;
}

function HistoricoGastos({ gastos, filtros, onEditar, onExcluir, onFiltrar }) {
  const [periodo, setPeriodo] = useState('diario');
  const [busca, setBusca] = useState('');

  const termo = busca.trim().toLocaleLowerCase('pt-BR');

  function passaNosFiltros(gasto) {
    if (!estaNoPeriodo(gasto.data, periodo)) return false;
    if (filtros.categoria && gasto.categoria !== filtros.categoria) return false;

    return gasto.descricao.toLocaleLowerCase('pt-BR').includes(termo);
  }

  const gastosFiltrados = gastos.filter(passaNosFiltros);
  gastosFiltrados.sort((a, b) => compararGastos(a, b, filtros));

  const temFiltroAtivo = termo !== '' || filtros.categoria !== '';

  return (
    <section className={Styles.containerHistorico} aria-label="Histórico de despesas">
      <form className={Styles.busca} role="search" onSubmit={(event) => event.preventDefault()}>
        <div className={Styles.grupoBusca}>
          <button type="submit" className={Styles.botaoBusca}>
            Busca
          </button>
          <label className={Styles.campoBusca}>
            <span className={Styles.visualmenteOculto}>Buscar despesa</span>
            <input
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar despesa"
            />
            <IconeFiltro className={Styles.iconeFiltro} />
          </label>
        </div>

        <button type="button" className={Styles.botaoFiltrar} onClick={onFiltrar}>
          Filtrar
        </button>
      </form>

      <div className={Styles.filtros}>
        {PERIODOS.map((opcao) => (
          <button
            key={opcao.id}
            type="button"
            aria-pressed={periodo === opcao.id}
            className={periodo === opcao.id ? Styles.filtroAtivo : Styles.filtro}
            onClick={() => setPeriodo(opcao.id)}
          >
            {opcao.rotulo}
          </button>
        ))}
      </div>

      <div className={Styles.lista}>
        {gastosFiltrados.map((gasto) => (
          <article className={Styles.cartaoGasto} key={gasto.id}>
            <div className={`${Styles.dado} ${Styles.dadoDescricao}`}>
              <h3>Com oque?</h3>
              <p>{gasto.descricao}</p>
              {gasto.feira && <small className={Styles.feira}>Feira: {gasto.feira}</small>}
            </div>
            <div className={Styles.dado}>
              <h3>Quantidade</h3>
              <p>{gasto.quantidade}</p>
            </div>
            <div className={Styles.dado}>
              <h3>Valor Unitário</h3>
              <p>{formatarMoeda(gasto.valorUnitario)}</p>
            </div>
            <div className={Styles.dado}>
              <h3>Valor total</h3>
              <p>{formatarMoeda(gasto.quantidade * gasto.valorUnitario)}</p>
            </div>

            <div className={Styles.acoesCartao}>
              <button
                type="button"
                className={Styles.botaoEditar}
                aria-label={`Editar ${gasto.descricao}`}
                onClick={() => onEditar(gasto)}
              >
                <Pencil size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={Styles.botaoExcluir}
                aria-label={`Excluir ${gasto.descricao}`}
                onClick={() => onExcluir(gasto)}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}

        {gastosFiltrados.length === 0 && (
          <p className={Styles.semResultados}>
            {temFiltroAtivo
              ? 'Nenhuma despesa encontrada com esses filtros.'
              : 'Nenhuma despesa neste período.'}
          </p>
        )}
      </div>
    </section>
  );
}

export default HistoricoGastos;
