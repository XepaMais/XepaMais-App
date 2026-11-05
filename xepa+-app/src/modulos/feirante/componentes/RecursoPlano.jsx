import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import usePlano from '@/modulos/feirante/hooks/usePlano';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './RecursoPlano.module.css';

const MENSAGENS = {
  financeiro: {
    titulo: 'Gestão financeira não incluída no seu plano',
    texto: 'Faça upgrade para o plano Crescer ou Pro para acompanhar lucros e gastos.',
  },
  planilhas: {
    titulo: 'Planilhas não incluídas no seu plano',
    texto: 'Faça upgrade para o plano Pro para ver o histórico completo e baixar o PDF.',
  },
  ia: {
    titulo: 'Xep.AI não incluída no seu plano',
    texto: 'Faça upgrade para o plano Crescer ou Pro para conversar com a Xepinha.',
  },
};

// Sem acesso, o conteúdo aparece desfocado e sem funcionar, apenas para visualização.
// "compacto" é a versão menor do aviso, usada nos cards da Home.
function RecursoPlano({ recurso, compacto, children }) {
  const { temAcesso } = usePlano();

  if (temAcesso(recurso)) {
    return children;
  }

  return (
    <div className={compacto ? styles.bloqueioCompacto : styles.bloqueio}>
      {/* inert impede clicar, digitar ou chegar ao conteúdo pelo teclado */}
      <div className={styles.previa} inert>
        {children}
      </div>

      <section className={styles.aviso}>
        <Lock size={compacto ? 28 : 44} aria-hidden="true" />
        <h2>{MENSAGENS[recurso].titulo}</h2>
        {!compacto && <p>{MENSAGENS[recurso].texto}</p>}
        <Link to="/planos" className={base.botaoPrincipal}>
          Ver planos
        </Link>
      </section>
    </div>
  );
}

export default RecursoPlano;
