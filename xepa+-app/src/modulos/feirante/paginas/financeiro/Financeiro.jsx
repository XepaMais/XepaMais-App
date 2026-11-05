import { useState } from 'react';
import '@/modulos/feirante/paginas/financeiro/financeiro.css';
import useFinanceiro from '@/modulos/feirante/hooks/useFinanceiro';
import Renda from '@/modulos/feirante/paginas/financeiro/componentes/Renda.jsx';
import Semanal from '@/modulos/feirante/paginas/financeiro/componentes/Semanal.jsx';
import Resumo from '@/modulos/feirante/paginas/financeiro/componentes/Resumo.jsx';
import Capital from '@/modulos/feirante/paginas/financeiro/componentes/Capital.jsx';
import Lancamento from '@/modulos/feirante/paginas/financeiro/componentes/Lancamento.jsx';
import HistoricoRendas from '@/modulos/feirante/paginas/financeiro/componentes/HistoricoRendas.jsx';
import PopUpExcluir from '@/modulos/feirante/componentes/PopUpExcluir.jsx';

function Financeiro() {
  // null = fechado; { lancamento } = aberto para adicionar (vazio) ou editar
  const [modal, setModal] = useState(null);
  const [rendaParaExcluir, setRendaParaExcluir] = useState(null);
  const {
    lancamentos,
    salvarLancamento,
    excluirLancamento,
    custosDaSemana,
    doDia,
    daSemana,
    doMes,
    total,
  } = useFinanceiro();

  function salvar(lancamento) {
    salvarLancamento(lancamento);
    setModal(null);
  }

  return (
    <div className="pagina">
      <main className="conteudo">
        <section className="titulo">
          <div>
            <h1>Veja seus lucros!</h1>
            <p>Acompanhe suas rendas, custos e resultados.</p>
          </div>
          <div className="botoes">
            <button onClick={() => setModal({})}>+ Adicionar renda</button>
          </div>
        </section>

        <Renda
          hoje={total(doDia, 'renda')}
          semana={total(daSemana, 'renda')}
          mes={total(doMes, 'renda')}
        />

        <HistoricoRendas
          lancamentos={lancamentos}
          onEditar={(lancamento) => setModal({ lancamento })}
          onExcluir={setRendaParaExcluir}
        />

        <section className="painel">
          <Semanal lancamentos={daSemana} />
          <Resumo receita={total(daSemana, 'renda')} custos={custosDaSemana} />
        </section>

        <Capital receita={total(doMes, 'renda')} />
      </main>

      {rendaParaExcluir && (
        <PopUpExcluir
          titulo="Excluir renda"
          nome={rendaParaExcluir.descricao}
          onFechar={() => setRendaParaExcluir(null)}
          onConfirmar={() => {
            excluirLancamento(rendaParaExcluir.id);
            setRendaParaExcluir(null);
          }}
        />
      )}

      {modal && (
        <Lancamento
          lancamento={modal.lancamento}
          aoFechar={() => setModal(null)}
          aoSalvar={salvar}
        />
      )}
    </div>
  );
}

export default Financeiro;
