import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import Styles from '@/modulos/feirante/paginas/financeiro/componentes/estilos/resumo.module.css';

function Resumo({ receita, custos }) {
  const margem = receita - custos;

  return (
    <section className={Styles.resumo}>
      <h2 className="titulo-cartao">Resumo da Semana</h2>

      <div className={Styles.linha}>
        <span>Receita Bruta</span>
        <strong>{formatarMoeda(receita)}</strong>
      </div>

      <div className={Styles.linha}>
        <span>Custo dos Produtos</span>
        <strong>- {formatarMoeda(custos)}</strong>
      </div>

      <div className={Styles.total}>
        <span>Margem após produtos</span>

        <strong>{formatarMoeda(margem)}</strong>
      </div>
    </section>
  );
}

export default Resumo;
