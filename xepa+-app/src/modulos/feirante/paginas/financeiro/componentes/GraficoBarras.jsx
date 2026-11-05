import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import Styles from '@/modulos/feirante/paginas/financeiro/componentes/estilos/semanal.module.css';

// A barra mais alta representa o maior valor da lista.
function encontrarMaiorValor(itens) {
  let maior = 1;

  for (const item of itens) {
    if (item.valor > maior) {
      maior = item.valor;
    }
  }

  return maior;
}

// Gráfico único da área financeira: itens = [{ rotulo, valor }]
function GraficoBarras({ itens }) {
  if (itens.length === 0) {
    return <p className={Styles.semDados}>Nenhum gasto registrado neste mês.</p>;
  }

  const maior = encontrarMaiorValor(itens);

  return (
    <div className={Styles.dias}>
      {itens.map((item, indice) => (
        <div className={Styles.dia} key={item.rotulo}>
          <span className={Styles.nomeDia}>{item.rotulo}</span>

          <div className={Styles.areaBarra}>
            <div
              className={`${Styles.barra} ${indice % 2 === 0 ? Styles.barraLimao : ''}`}
              style={{ height: `${(item.valor / maior) * 100}%` }}
            />
          </div>

          <strong>{formatarMoeda(item.valor).replaceAll('\u00a0', ' ')}</strong>
        </div>
      ))}
    </div>
  );
}

export default GraficoBarras;
