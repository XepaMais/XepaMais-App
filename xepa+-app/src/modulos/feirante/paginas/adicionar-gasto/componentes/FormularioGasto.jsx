import { useEffect, useRef, useState } from 'react';
import { ChevronsDown } from 'lucide-react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import base from '@/compartilhado/componentes/modal/Modal.module.css';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import { CATEGORIAS_GASTO } from '@/modulos/feirante/servicos/gastosFeirante';
import CampoFeira from '@/modulos/feirante/componentes/CampoFeira.jsx';

function FormularioGasto({ modo, gasto, onFechar, onSalvar }) {
  const estaEditando = modo === 'editar';

  // O formulário só existe enquanto o popup está aberto, então basta iniciar o estado com o gasto.
  // Ao adicionar, não existe gasto: por isso cada campo começa com um valor padrão.
  const [descricao, setDescricao] = useState(gasto ? gasto.descricao : '');
  const [quantidade, setQuantidade] = useState(gasto ? String(gasto.quantidade) : '');
  const [valorUnitario, setValorUnitario] = useState(gasto ? String(gasto.valorUnitario) : '');
  const [categoria, setCategoria] = useState(
    gasto && gasto.categoria ? gasto.categoria : 'mercadoria',
  );
  const [feira, setFeira] = useState(gasto && gasto.feira ? gasto.feira : '');

  const formRef = useRef(null);
  const primeiroCampo = useRef(null);

  let valorTotal = '';
  if (quantidade !== '' && valorUnitario !== '') {
    valorTotal = formatarMoeda(Number(quantidade) * Number(valorUnitario));
  }

  useEffect(() => {
    primeiroCampo.current.focus();
  }, []);

  function montarDados() {
    return {
      descricao: descricao.trim(),
      quantidade: Number(quantidade),
      valorUnitario: Number(valorUnitario),
      categoria,
      feira,
    };
  }

  function salvar(evento) {
    evento.preventDefault();
    onSalvar(montarDados(), false);
  }

  // Salva o gasto atual e deixa o formulário limpo para o próximo
  function cadastrarOutro() {
    if (!formRef.current.reportValidity()) return;
    onSalvar(montarDados(), true);
    setDescricao('');
    setQuantidade('');
    setValorUnitario('');
    primeiroCampo.current.focus();
  }

  return (
    <Modal titulo={estaEditando ? 'Editar Gasto' : 'Adicionar Gasto'} aoFechar={onFechar}>
      <form className={base.form} ref={formRef} onSubmit={salvar}>
        <div className={base.campo}>
          <label htmlFor="descricaoGasto">Com oque você gastou?</label>
          <input
            id="descricaoGasto"
            name="descricao"
            ref={primeiroCampo}
            value={descricao}
            onChange={(evento) => setDescricao(evento.target.value)}
            placeholder="Compra de alface"
            required
          />
        </div>

        <div className={base.campo}>
          <label htmlFor="categoriaGasto">Categoria</label>
          <div className={base.campoSelect}>
            <select
              id="categoriaGasto"
              name="categoria"
              value={categoria}
              onChange={(evento) => setCategoria(evento.target.value)}
            >
              {CATEGORIAS_GASTO.map((opcao) => (
                <option key={opcao.valor} value={opcao.valor}>
                  {opcao.rotulo}
                </option>
              ))}
            </select>
            <ChevronsDown className={base.iconeSelect} strokeWidth={2.5} aria-hidden="true" />
          </div>
        </div>

        <CampoFeira id="feiraGasto" valor={feira} onChange={setFeira} />

        <div className={base.grade}>
          <div className={base.campo}>
            <label htmlFor="quantidadeGasto">Quantidade</label>
            <input
              id="quantidadeGasto"
              name="quantidade"
              type="number"
              inputMode="decimal"
              min="0.01"
              step="any"
              value={quantidade}
              onChange={(evento) => setQuantidade(evento.target.value)}
              placeholder="10"
              required
            />
          </div>

          <div className={base.campo}>
            <label htmlFor="valorUnitarioGasto">Valor unitário</label>
            <input
              id="valorUnitarioGasto"
              name="valorUnitario"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={valorUnitario}
              onChange={(evento) => setValorUnitario(evento.target.value)}
              placeholder="R$ 3,00"
              required
            />
          </div>
        </div>

        <div className={base.campo}>
          <label htmlFor="valorTotalGasto">Valor total</label>
          <input
            id="valorTotalGasto"
            name="valorTotal"
            value={valorTotal}
            placeholder="R$ 30,00"
            readOnly
            aria-live="polite"
          />
        </div>

        <div className={base.acoes}>
          <button type="button" className={base.secundario} onClick={onFechar}>
            Cancelar
          </button>
          {!estaEditando && (
            <button type="button" className={base.secundario} onClick={cadastrarOutro}>
              Cadastrar outro gasto
            </button>
          )}
          <button type="submit" className={base.principal}>
            {estaEditando ? 'Salvar' : 'Registrar Gasto'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default FormularioGasto;
