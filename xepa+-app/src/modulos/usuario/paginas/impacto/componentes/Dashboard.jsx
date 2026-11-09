import { useEffect, useState } from 'react';
import xepa from '@/assets/imagens/pagina-inicial/xepa.png';
import logoImpacto from '@/assets/imagens/pagina-inicial/logo-copy.png';
import styles from '@/modulos/usuario/paginas/impacto/estilos/Impacto.module.css';
import chartStyles from '@/modulos/usuario/paginas/impacto/estilos/GraficoImpacto.module.css';
import { calcularImpacto, formatarKg } from '@/compartilhado/servicos/impacto';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';

const linhasGrade = [0, 1, 2, 3, 4, 5];

// Topo do eixo Y: arredonda o maior valor para cima (mínimo 5 kg).
function calcularTopoEixo(semanas) {
  const maior = Math.max(...semanas.map((semana) => semana.kg));
  return Math.max(5, Math.ceil(maior));
}

function useImpacto() {
  const [impacto, setImpacto] = useState(calcularImpacto);

  useEffect(() => {
    // Atualiza se um pedido for feito em outra aba.
    const atualizar = () => setImpacto(calcularImpacto());
    window.addEventListener('storage', atualizar);
    return () => window.removeEventListener('storage', atualizar);
  }, []);

  return impacto;
}

export function Dashboard() {
  const { kgSalvos, economia, xepasResgatadas, refeicoes, semanas } = useImpacto();

  const topoEixo = calcularTopoEixo(semanas);
  const valoresEixo = linhasGrade.map((linha) => formatarKg((topoEixo * (5 - linha)) / 5));
  const maiorSemana = Math.max(...semanas.map((semana) => semana.kg));
  const barras = semanas.map((semana) => ({
    ...semana,
    valor: formatarKg(semana.kg),
    altura: (semana.kg / topoEixo) * 100,
    destaque: maiorSemana > 0 && semana.kg === maiorSemana,
  }));
  const descricaoGrafico = `Alimentos salvos por semana: ${barras
    .map((semana) => `${semana.valor} kg`)
    .join('; ')}.`;

  return (
    <main className={styles.conteudoPrincipal}>
      <div className={styles.linhaSuperior}>
        <section className={`${styles.card} ${styles.cardPeso}`} aria-label="Alimentos salvos">
          <div className={styles.textoPeso}>
            <span className={styles.rotulo}>Você já salvou</span>
            <p className={styles.numeroDestaque}>
              {formatarKg(kgSalvos)}<span className={styles.unidade}>kg</span>
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
            <strong className={styles.valorDestaqueLaranja}>
              {formatarMoeda(economia)}
            </strong>
            <span className={styles.rotuloCard}>economizados</span>
          </section>
          <section className={`${styles.card} ${styles.cardInfo}`} aria-label="Xepas resgatadas">
            <strong className={styles.valorDestaqueLaranja}>{xepasResgatadas}</strong>
            <span className={styles.rotuloCard}>xepas resgatadas</span>
          </section>
        </div>
      </div>

      <section className={chartStyles.cardGrafico} aria-labelledby="titulo-grafico">
        <div className={chartStyles.cabecalhoGrafico}>
          <h2 id="titulo-grafico" className={chartStyles.tituloGrafico}>
            ÚLTIMAS 6 SEMANAS (KG)
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
          aria-label={descricaoGrafico}
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
            {barras.map((semana) => (
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
          Você salvou o equivalente a <strong>~{refeicoes} {refeicoes === 1 ? 'refeição' : 'refeições'}</strong> que iriam parar no lixo.
          <span className={styles.estimativa}>*Estimativa: 1 refeição = 500 g de alimento.</span>
        </p>
      </aside>
    </main>
  );
}

export default Dashboard;
