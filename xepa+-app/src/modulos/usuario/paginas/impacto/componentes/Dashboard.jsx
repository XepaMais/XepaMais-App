import xepa from '@/assets/imagens/pagina-inicial/xepa.png';
import logoImpacto from '@/assets/imagens/pagina-inicial/logo-copy.png';
import styles from '@/modulos/usuario/paginas/impacto/estilos/Impacto.module.css';
import chartStyles from '@/modulos/usuario/paginas/impacto/estilos/GraficoImpacto.module.css';

const semanas = [
  { id: 1, nome: 'Sem 1', valor: '2,1', altura: 42 },
  { id: 2, nome: 'Sem 2', valor: '3,0', altura: 60 },
  { id: 3, nome: 'Sem 3', valor: '1,4', altura: 28 },
  { id: 4, nome: 'Sem 4', valor: '4,6', altura: 92, destaque: true },
  { id: 5, nome: 'Sem 5', valor: '3,9', altura: 78 },
  { id: 6, nome: 'Sem 6', valor: '3,4', altura: 68 },
];

const linhasGrade = [0, 1, 2, 3, 4, 5];
const valoresEixo = [5, 4, 3, 2, 1, 0];

export function Dashboard() {
  return (
    <main className={styles.conteudoPrincipal}>
      <div className={styles.linhaSuperior}>
        <section className={`${styles.card} ${styles.cardPeso}`} aria-label="Alimentos salvos">
          <div className={styles.textoPeso}>
            <span className={styles.rotulo}>Você já salvou</span>
            <p className={styles.numeroDestaque}>
              18,4<span className={styles.unidade}>kg</span>
            </p>
            <span className={styles.legendaCard}>de alimentos</span>
          </div>
          <img
            src={xepa}
            alt="Caixa com frutas, verduras e legumes"
            className={styles.imagemXepa}
          />
        </section>

        <div className={styles.colunaDireita}>
          <section className={`${styles.card} ${styles.cardInfo}`} aria-label="Economia">
            <strong className={styles.valorDestaqueLaranja}>R$ 142</strong>
            <span className={styles.rotuloCard}>economizados</span>
          </section>
          <section className={`${styles.card} ${styles.cardInfo}`} aria-label="Xepas resgatadas">
            <strong className={styles.valorDestaqueLaranja}>11</strong>
            <span className={styles.rotuloCard}>xepas resgatadas</span>
          </section>
        </div>
      </div>

      <section className={chartStyles.cardGrafico} aria-labelledby="titulo-grafico">
        <div className={chartStyles.cabecalhoGrafico}>
          <h2 id="titulo-grafico" className={chartStyles.tituloGrafico}>
            ÚLTIMAS 6 SEMANAS
          </h2>
          <div className={chartStyles.legendaGrafico} aria-label="Legenda do gráfico">
            <span className={chartStyles.itemLegenda}>
              <span className={chartStyles.marcadorLegenda} aria-hidden="true" /> Semana
            </span>
            <span className={chartStyles.itemLegenda}>
              <span
                className={`${chartStyles.marcadorLegenda} ${chartStyles.marcadorDestaque}`}
                aria-hidden="true"
              />
              Melhor semana
            </span>
          </div>
        </div>

        <div
          className={chartStyles.areaGrafico}
          role="img"
          aria-label="Alimentos salvos por semana: 2,1; 3; 1,4; 4,6; 3,9 e 3,4 quilos."
        >
          <div className={chartStyles.eixoY} aria-hidden="true">
            {valoresEixo.map((valor) => (
              <span key={valor}>{valor}</span>
            ))}
          </div>
          <div className={chartStyles.gradeGrafico} aria-hidden="true">
            {linhasGrade.map((linha) => (
              <span key={linha} className={chartStyles.linhaGrade} />
            ))}
          </div>
          <div className={chartStyles.barras} aria-hidden="true">
            {semanas.map((semana) => (
              <div className={chartStyles.colunaSemana} key={semana.id}>
                <span
                  className={`${chartStyles.valorBarra} ${semana.destaque ? chartStyles.valorBarraDestaque : ''}`}
                  style={{ '--altura': `${semana.altura}%` }}
                >
                  {semana.valor} kg
                </span>
                <span
                  className={`${chartStyles.barra} ${semana.destaque ? chartStyles.barraDestaque : ''}`}
                  style={{ height: `${semana.altura}%` }}
                />
              </div>
            ))}
          </div>
          <div className={chartStyles.rotulosSemanas} aria-hidden="true">
            {semanas.map((semana) => (
              <span key={semana.id}>{semana.nome}</span>
            ))}
          </div>
        </div>
      </section>

      <aside className={styles.faixaImpacto}>
        <img src={logoImpacto} alt="" className={styles.logoImpacto} />
        <p className={styles.textoImpacto}>
          Você salvou o equivalente a <strong>~37 refeições</strong> que iriam parar no lixo.
          <span className={styles.estimativa}>*Estimativa: 1 refeição = 500 g de alimento.</span>
        </p>
      </aside>
    </main>
  );
}

export default Dashboard;
