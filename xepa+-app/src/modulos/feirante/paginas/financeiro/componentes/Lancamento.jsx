import { useState } from 'react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import Styles from '@/compartilhado/componentes/modal/Modal.module.css';
import { dataDeHoje } from '@/compartilhado/servicos/datas';
import { ORIGENS_RENDA } from '@/modulos/feirante/servicos/lancamentosFinanceiros';
import CampoFeira from '@/modulos/feirante/componentes/CampoFeira.jsx';

// O formulário só existe enquanto o popup está aberto, então basta iniciar o estado com a renda.
// Ao adicionar, não existe renda: por isso cada campo começa com um valor padrão.
function Lancamento({ lancamento, aoFechar, aoSalvar }) {
  const [origem, setOrigem] = useState(
    lancamento && lancamento.categoria ? lancamento.categoria : '',
  );
  const [descricao, setDescricao] = useState(lancamento ? lancamento.descricao : '');
  const [valor, setValor] = useState(lancamento ? String(lancamento.valor) : '');
  const [data, setData] = useState(lancamento ? lancamento.data : dataDeHoje());
  const [feira, setFeira] = useState(lancamento && lancamento.feira ? lancamento.feira : '');

  function salvar(evento) {
    evento.preventDefault();

    if (!descricao.trim() || Number(valor) <= 0 || !data) return;

    aoSalvar({
      id: lancamento ? lancamento.id : Date.now(),
      tipo: 'renda',
      descricao: descricao.trim(),
      valor: Number(valor),
      data,
      categoria: origem,
      feira,
    });
  }

  return (
    <Modal titulo={lancamento ? 'Editar renda' : 'Adicionar renda'} aoFechar={aoFechar}>
      <form className={Styles.form} onSubmit={salvar}>
        <div className={Styles.campo}>
          <label htmlFor="origem">Como você ganhou essa renda?</label>
          <select
            id="origem"
            value={origem}
            onChange={(evento) => setOrigem(evento.target.value)}
            required
          >
            <option value="" disabled>
              Selecione uma opção
            </option>
            {ORIGENS_RENDA.map((opcao) => (
              <option key={opcao}>{opcao}</option>
            ))}
          </select>
        </div>

        <div className={Styles.campo}>
          <label htmlFor="descricao">Descrição</label>
          <input
            id="descricao"
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            placeholder="Digite a descrição"
            required
          />
        </div>

        <CampoFeira id="feiraRenda" valor={feira} onChange={setFeira} />

        <div className={Styles.grade}>
          <div className={Styles.campo}>
            <label htmlFor="valor">Valor</label>
            <input
              id="valor"
              type="number"
              min="0.01"
              step="0.01"
              value={valor}
              onChange={(evento) => setValor(evento.target.value)}
              placeholder="0,00"
              required
            />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="data">Data</label>
            <input
              id="data"
              type="date"
              value={data}
              onChange={(evento) => setData(evento.target.value)}
              required
            />
          </div>
        </div>

        <div className={Styles.acoes}>
          <button type="button" className={Styles.secundario} onClick={aoFechar}>
            Cancelar
          </button>
          <button type="submit" className={Styles.principal}>
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default Lancamento;
