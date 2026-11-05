import { useEffect, useState } from 'react';
import '@/modulos/feirante/paginas/financeiro/financeiro.css';
import Renda from '@/modulos/feirante/paginas/financeiro/componentes/Renda.jsx';
import GraficoBarras from '@/modulos/feirante/paginas/financeiro/componentes/GraficoBarras.jsx';
import {
  carregarGastos,
  salvarGastos,
  calcularTotaisDeGastos,
  gastosDoMesPorCategoria,
} from '@/modulos/feirante/servicos/gastosFeirante';
import Styles from '@/modulos/feirante/paginas/adicionar-gasto/estilos/graficoGastos.module.css';
import HistoricoGastos from '@/modulos/feirante/paginas/adicionar-gasto/componentes/resumoGasto.jsx';
import PopUpAdicionarGasto from '@/modulos/feirante/paginas/adicionar-gasto/componentes/PopUpAdicionarGasto.jsx';
import PopUpEditarGasto from '@/modulos/feirante/paginas/adicionar-gasto/componentes/PopUpEditarGasto.jsx';
import PopUpFiltroGastos from '@/modulos/feirante/paginas/adicionar-gasto/componentes/PopUpFiltroGastos.jsx';
import PopUpExcluir from '@/modulos/feirante/componentes/PopUpExcluir.jsx';

const filtrosVazios = { categoria: '', ordemQuantidade: '', ordemPreco: '' };

// O próximo id é sempre uma unidade maior que o maior id da lista.
function criarId(gastos) {
  let maiorId = 0;

  for (const gasto of gastos) {
    if (gasto.id > maiorId) {
      maiorId = gasto.id;
    }
  }

  return maiorId + 1;
}

function AddGasto() {
  const [gastos, setGastos] = useState(carregarGastos);
  const [filtros, setFiltros] = useState(filtrosVazios);
  const [modal, setModal] = useState(null);
  const tipoModal = modal ? modal.tipo : null;

  useEffect(() => {
    salvarGastos(gastos);
  }, [gastos]);

  const totais = calcularTotaisDeGastos(gastos);

  // Em "Cadastrar outro gasto", manterAberto é true e o pop-up continua na tela.
  function adicionarGasto(dados, manterAberto) {
    const novoGasto = { id: criarId(gastos), data: new Date(), ...dados };
    setGastos([novoGasto, ...gastos]);

    if (!manterAberto) {
      setModal(null);
    }
  }

  function editarGasto(dados) {
    const novosGastos = gastos.map((gasto) => {
      if (gasto.id === modal.gasto.id) {
        return { ...gasto, ...dados };
      }

      return gasto;
    });

    setGastos(novosGastos);
    setModal(null);
  }

  function excluirGasto() {
    setGastos(gastos.filter((gasto) => gasto.id !== modal.gasto.id));
    setModal(null);
  }

  function aplicarFiltros(novosFiltros) {
    setFiltros(novosFiltros);
    setModal(null);
  }

  return (
    <div className="pagina">
      <main className="conteudo">
        <section className="titulo">
          <div>
            <h1>Quanto você gastou?</h1>
            <p>
              Cadastre e gerencie o histórico de gastos e tenha maior controle sobre sua receita!
            </p>
          </div>
          <div className="botoes">
            <button onClick={() => setModal({ tipo: 'adicionar' })}>+ Adicionar Gasto</button>
          </div>
        </section>

        <Renda
          rotulo="Gasto"
          legendaHoje="Gastos de hoje"
          hoje={totais.hoje}
          semana={totais.semana}
          mes={totais.mes}
        />

        <HistoricoGastos
          gastos={gastos}
          filtros={filtros}
          onEditar={(gasto) => setModal({ tipo: 'editar', gasto })}
          onExcluir={(gasto) => setModal({ tipo: 'excluir', gasto })}
          onFiltrar={() => setModal({ tipo: 'filtrar' })}
        />

        <section className={Styles.cartao} aria-labelledby="tituloGraficoGastos">
          <h2 id="tituloGraficoGastos">Gastos do mês por categoria</h2>
          <GraficoBarras itens={gastosDoMesPorCategoria(gastos)} />
        </section>
      </main>

      <PopUpAdicionarGasto
        aberto={tipoModal === 'adicionar'}
        onFechar={() => setModal(null)}
        onSalvar={adicionarGasto}
      />
      <PopUpEditarGasto
        aberto={tipoModal === 'editar'}
        gasto={modal && modal.gasto}
        onFechar={() => setModal(null)}
        onSalvar={editarGasto}
      />
      {tipoModal === 'excluir' && (
        <PopUpExcluir
          titulo="Excluir gasto"
          nome={modal.gasto.descricao}
          onFechar={() => setModal(null)}
          onConfirmar={excluirGasto}
        />
      )}
      <PopUpFiltroGastos
        aberto={tipoModal === 'filtrar'}
        filtros={filtros}
        onFechar={() => setModal(null)}
        onAplicar={aplicarFiltros}
      />
    </div>
  );
}

export default AddGasto;
