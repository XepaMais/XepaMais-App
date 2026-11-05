import { dataEmTexto, inicioDaSemana } from '@/compartilhado/servicos/datas';
import Styles from '@/modulos/feirante/paginas/financeiro/componentes/estilos/semanal.module.css';
import GraficoBarras from '@/modulos/feirante/paginas/financeiro/componentes/GraficoBarras.jsx';

const DIAS = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

function somarRendasDoDia(lancamentos, data) {
  const dataProcurada = dataEmTexto(data);
  let soma = 0;

  for (const item of lancamentos) {
    if (item.data === dataProcurada && item.tipo === 'renda') {
      soma += Number(item.valor);
    }
  }

  return soma;
}

function Semanal({ lancamentos }) {
  const itens = DIAS.map((dia, indice) => {
    const data = inicioDaSemana();
    data.setDate(data.getDate() + indice);

    return { rotulo: dia, valor: somarRendasDoDia(lancamentos, data) };
  });

  return (
    <section className={Styles.grafico}>
      <h2>Renda da Semana</h2>
      <GraficoBarras itens={itens} />
    </section>
  );
}

export default Semanal;
