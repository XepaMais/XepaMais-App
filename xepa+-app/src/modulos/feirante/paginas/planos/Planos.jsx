import { useState } from 'react';
import { Check } from 'lucide-react';
import { PLANOS } from '@/compartilhado/dados/planos';
import {
  carregarPlanoSelecionado,
  salvarPlanoSelecionado,
} from '@/modulos/feirante/servicos/planoFeirante';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './estilos/Planos.module.css';

function Planos() {
  const [selecionado, setSelecionado] = useState(carregarPlanoSelecionado);

  function selecionar(idPlano) {
    salvarPlanoSelecionado(idPlano);
    setSelecionado(idPlano);
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Planos</h1>
          <p>Escolha o plano ideal para a sua barraca.</p>
        </div>
      </header>

      <p className={base.aviso}>
        A contratação ainda não está integrada a um meio de pagamento: selecionar um plano guarda
        sua escolha neste navegador e libera os recursos dele, sem nenhuma cobrança.
      </p>

      <div className={styles.grade}>
        {PLANOS.map((plano) => {
          const escolhido = selecionado === plano.id;

          return (
            <article
              key={plano.id}
              className={`${styles.plano} ${styles[plano.id]} ${escolhido ? styles.escolhido : ''}`}
            >
              {plano.id === 'pro' && <span className={styles.selo}>Mais completo</span>}

              <h2>{plano.nome}</h2>
              <p className={styles.preco}>
                {plano.preco}
                {plano.periodo && <small>{plano.periodo}</small>}
              </p>
              <p className={styles.descricao}>{plano.descricao}</p>

              <ul>
                {plano.beneficios.map((beneficio) => (
                  <li key={beneficio}>
                    <Check size={18} aria-hidden="true" />
                    {beneficio}
                  </li>
                ))}
              </ul>

              <button
                type="button"
                className={escolhido ? base.botaoSecundario : base.botaoPrincipal}
                aria-pressed={escolhido}
                onClick={() => selecionar(plano.id)}
              >
                {escolhido ? 'Plano selecionado' : `Selecionar ${plano.nome}`}
              </button>
            </article>
          );
        })}
      </div>
    </main>
  );
}

export default Planos;
