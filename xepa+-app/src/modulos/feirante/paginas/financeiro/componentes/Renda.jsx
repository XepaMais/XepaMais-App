import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import Styles from '@/modulos/feirante/paginas/financeiro/componentes/estilos/renda.module.css';

// Exemplo: "Novembro de 2026".
function mesAtualFormatado() {
  const texto = new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

// Três cards do topo: usados em Lucros (Renda) e em Gastos (Gasto).
function Renda({ rotulo = 'Renda', legendaHoje = 'Feira de hoje', hoje, semana, mes }) {
  return (
    <section className={Styles.rendas}>
      <article className={Styles.card}>
        <h2>{rotulo} de Hoje</h2>
        <p>{legendaHoje}</p>
        <strong>{formatarMoeda(hoje)}</strong>
      </article>

      <article className={Styles.card}>
        <h2>{rotulo} da Semana</h2>
        <p>Esta semana</p>
        <strong>{formatarMoeda(semana)}</strong>
      </article>

      <article className={`${Styles.card} ${Styles.destaque}`}>
        <h2>{rotulo} do Mês</h2>
        <p>{mesAtualFormatado()}</p>
        <strong>{formatarMoeda(mes)}</strong>
      </article>
    </section>
  );
}

export default Renda;
