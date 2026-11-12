import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import BarraPesquisa from '@/compartilhado/componentes/barra-pesquisa/BarraPesquisa';
import IconeFiltro from '@/modulos/feirante/paginas/adicionar-gasto/componentes/IconeFiltro.jsx';
import PopUpFiltroRendas from '@/modulos/feirante/paginas/financeiro/componentes/PopUpFiltroRendas.jsx';
import { FILTROS_RENDA_VAZIOS } from '@/modulos/feirante/servicos/lancamentosFinanceiros';
import { estaNoPeriodo, PERIODOS } from '@/modulos/feirante/servicos/periodos';
import { formatarData } from '@/compartilhado/servicos/datas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import Styles from '@/modulos/feirante/paginas/adicionar-gasto/estilos/resumoGasto.module.css';

// Ordena pelo valor escolhido no filtro ou, sem filtro, pelas rendas mais recentes.
function compararRendas(a, b, ordemValor) {
  if (ordemValor === 'maior') return b.valor - a.valor;
  if (ordemValor === 'menor') return a.valor - b.valor;

  return b.data.localeCompare(a.data);
}

// Mesmo visual da lista da página de Gastos, com os dados de renda.
function HistoricoRendas({ lancamentos, onEditar, onExcluir }) {
  const [periodo, setPeriodo] = useState('diario');
  const [busca, setBusca] = useState('');
  const [filtros, setFiltros] = useState(FILTROS_RENDA_VAZIOS);
  const [filtroAberto, setFiltroAberto] = useState(false);

  const termo = busca.trim().toLocaleLowerCase('pt-BR');

  function passaNosFiltros(item) {
    if (item.tipo !== 'renda') return false;
    if (!estaNoPeriodo(`${item.data}T12:00:00`, periodo)) return false;
    if (filtros.origem && item.categoria !== filtros.origem) return false;

    return item.descricao.toLocaleLowerCase('pt-BR').includes(termo);
  }

  const rendas = lancamentos.filter(passaNosFiltros);
  rendas.sort((a, b) => compararRendas(a, b, filtros.ordemValor));

  const temFiltroAtivo = termo !== '' || filtros.origem !== '';

  function aplicarFiltros(novosFiltros) {
    setFiltros(novosFiltros);
    setFiltroAberto(false);
  }

  return (
    <section className={Styles.containerHistorico} aria-label="Histórico de rendas">
      <BarraPesquisa
        className={Styles.busca}
        valor={busca}
        aoMudar={setBusca}
        placeholder="Buscar renda"
        rotulo="Buscar renda"
      >
        <button
          type="button"
          className={Styles.botaoFiltrar}
          aria-label="Filtrar"
          onClick={() => setFiltroAberto(true)}
        >
          <IconeFiltro className={Styles.iconeFiltro} />
          <span className={Styles.textoFiltrar}>Filtrar</span>
        </button>
      </BarraPesquisa>

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
        {rendas.map((renda) => (
          <article className={Styles.cartaoGasto} key={renda.id}>
            <div className={`${Styles.dado} ${Styles.dadoDescricao}`}>
              <h3>Descrição</h3>
              <p>{renda.descricao}</p>
              {renda.feira && <small className={Styles.feira}>Feira: {renda.feira}</small>}
            </div>
            <div className={Styles.dado}>
              <h3>Origem</h3>
              <p>{renda.categoria || 'Não informada'}</p>
            </div>
            <div className={Styles.dado}>
              <h3>Data</h3>
              <p>{formatarData(renda.data)}</p>
            </div>
            <div className={Styles.dado}>
              <h3>Valor</h3>
              <p>{formatarMoeda(renda.valor)}</p>
            </div>

            <div className={Styles.acoesCartao}>
              <button
                type="button"
                className={Styles.botaoEditar}
                aria-label={`Editar ${renda.descricao}`}
                onClick={() => onEditar(renda)}
              >
                <Pencil size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className={Styles.botaoExcluir}
                aria-label={`Excluir ${renda.descricao}`}
                onClick={() => onExcluir(renda)}
              >
                <Trash2 size={18} aria-hidden="true" />
              </button>
            </div>
          </article>
        ))}

        {rendas.length === 0 && (
          <p className={Styles.semResultados}>
            {temFiltroAtivo
              ? 'Nenhuma renda encontrada com esses filtros.'
              : 'Nenhuma renda neste período.'}
          </p>
        )}
      </div>

      {filtroAberto && (
        <PopUpFiltroRendas
          filtros={filtros}
          onFechar={() => setFiltroAberto(false)}
          onAplicar={aplicarFiltros}
        />
      )}
    </section>
  );
}

export default HistoricoRendas;
