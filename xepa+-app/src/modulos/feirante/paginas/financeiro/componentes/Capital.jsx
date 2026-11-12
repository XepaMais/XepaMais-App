import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import Styles from '@/modulos/feirante/paginas/financeiro/componentes/estilos/capital.module.css';

function Capital({ receita }) {
  const custos = receita * 0.65;
  const reserva = receita * 0.2;

  return (
    <section className={Styles.capital}>
      <h2 className="titulo-cartao">Capital de Giro</h2>
      <p className={Styles.aviso}>Simulação · não é conselho financeiro</p>

      <div className={Styles.valores}>
        <div className={Styles.linha}>
          <span>Receita mensal - dados registrados</span>
          <strong>{formatarMoeda(receita)}</strong>
        </div>

        <div className={Styles.linha}>
          <span>Orçamento mensal de custos (65%)</span>
          <strong>{formatarMoeda(custos)}</strong>
        </div>

        <div className={Styles.reserva}>
          <span>Reserva simulada: 20% da receita</span>
          <strong>{formatarMoeda(reserva)}</strong>
        </div>
      </div>

      <p className={Styles.rodape}>
        Reserva simulada para manter a banca e financiar compras futuras.
      </p>
    </section>
  );
}

export default Capital;
