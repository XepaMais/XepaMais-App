import { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import { formatarData } from '@/compartilhado/servicos/datas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import {
  FILTROS_VAZIOS,
  ROTULOS_TIPO,
  calcularTotais,
  carregarHistoricoFinanceiro,
  descreverPeriodo,
  filtrarHistorico,
} from '@/modulos/feirante/servicos/historicoFinanceiro';
import BarraPesquisa from '@/compartilhado/componentes/barra-pesquisa/BarraPesquisa';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './estilos/Planilhas.module.css';

// Lista as categorias dos registros, sem repetir e em ordem alfabética.
function listarCategorias(registros) {
  const categorias = [];

  for (const registro of registros) {
    if (!categorias.includes(registro.categoria)) {
      categorias.push(registro.categoria);
    }
  }

  return categorias.sort();
}

function Planilhas() {
  const { perfil } = usePerfil('feirante');
  const [registros] = useState(carregarHistoricoFinanceiro);
  const [filtros, setFiltros] = useState(FILTROS_VAZIOS);

  const categorias = listarCategorias(registros);
  const filtrados = filtrarHistorico(registros, filtros);
  const totais = calcularTotais(filtrados);

  function alterarFiltro(evento) {
    setFiltros({ ...filtros, [evento.target.name]: evento.target.value });
  }

  // A biblioteca de PDF só é carregada quando o feirante pede o arquivo.
  async function baixarPdf() {
    const { baixarPdfHistorico } =
      await import('@/modulos/feirante/servicos/pdfHistoricoFinanceiro');

    baixarPdfHistorico({
      nomeFeirante: perfil.nome,
      periodo: descreverPeriodo(filtros),
      registros: filtrados,
      totais,
    });
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Planilhas</h1>
          <p>Histórico completo das suas rendas, compras e despesas.</p>
        </div>
        <button
          type="button"
          className={base.botaoPrincipal}
          onClick={baixarPdf}
          disabled={filtrados.length === 0}
        >
          <Download size={18} aria-hidden="true" />
          Baixar PDF
        </button>
      </header>

      <form className={styles.filtros} onSubmit={(evento) => evento.preventDefault()}>
        <div className={base.campo}>
          <label htmlFor="inicio">Período inicial</label>
          <input
            id="inicio"
            name="inicio"
            type="date"
            value={filtros.inicio}
            onChange={alterarFiltro}
          />
        </div>

        <div className={base.campo}>
          <label htmlFor="fim">Período final</label>
          <input id="fim" name="fim" type="date" value={filtros.fim} onChange={alterarFiltro} />
        </div>

        <div className={base.campo}>
          <label htmlFor="tipo">Movimentação</label>
          <select id="tipo" name="tipo" value={filtros.tipo} onChange={alterarFiltro}>
            <option value="todos">Todos</option>
            <option value="lucro">Lucros</option>
            <option value="gasto">Despesas</option>
          </select>
        </div>

        <div className={base.campo}>
          <label htmlFor="categoria">Categoria</label>
          <select
            id="categoria"
            name="categoria"
            value={filtros.categoria}
            onChange={alterarFiltro}
          >
            <option value="">Todas</option>
            {categorias.map((categoria) => (
              <option key={categoria} value={categoria}>
                {categoria}
              </option>
            ))}
          </select>
        </div>

        <BarraPesquisa
          semFormulario
          className={styles.campoBusca}
          valor={filtros.busca}
          aoMudar={(texto) => setFiltros({ ...filtros, busca: texto })}
          placeholder="Ex.: alface"
          rotulo="Pesquisar descrição"
          mostrarRotulo
        />

        <button
          type="button"
          className={base.botaoSecundario}
          onClick={() => setFiltros(FILTROS_VAZIOS)}
        >
          Limpar filtros
        </button>
      </form>

      <section
        className={`${base.indicadores} ${styles.indicadores}`}
        aria-label="Totais do período"
      >
        <div className={base.indicador}>
          <span>Total de lucros</span>
          <strong>{formatarMoeda(totais.lucros)}</strong>
        </div>
        <div className={base.indicador}>
          <span>Total de despesas</span>
          <strong>{formatarMoeda(totais.gastos)}</strong>
        </div>
        <div className={base.indicador}>
          <span>Saldo do período</span>
          <strong>{formatarMoeda(totais.saldo)}</strong>
        </div>
      </section>

      {filtrados.length === 0 ? (
        <section className={base.vazio}>
          <FileSpreadsheet size={44} aria-hidden="true" />
          <h2>Nenhum registro encontrado</h2>
          <p>
            {registros.length === 0
              ? 'Registre rendas e despesas para vê-los aqui.'
              : 'Altere ou limpe os filtros para ver outros registros.'}
          </p>
        </section>
      ) : (
        <div className={styles.tabelaBorda}>
          <table className={styles.tabela}>
            <thead>
              <tr>
                <th scope="col">Data</th>
                <th scope="col">Descrição</th>
                <th scope="col">Categoria</th>
                <th scope="col">Tipo</th>
                <th scope="col">Feira</th>
                <th scope="col" className={styles.valor}>
                  Valor
                </th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((registro) => (
                <tr key={registro.id}>
                  <td>{formatarData(registro.data)}</td>
                  <td>{registro.descricao}</td>
                  <td>{registro.categoria}</td>
                  <td>
                    <span className={registro.tipo === 'lucro' ? styles.lucro : styles.gasto}>
                      {ROTULOS_TIPO[registro.tipo]}
                    </span>
                  </td>
                  <td>{registro.feira || '-'}</td>
                  <td className={styles.valor}>{formatarMoeda(registro.valor)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Planilhas;
