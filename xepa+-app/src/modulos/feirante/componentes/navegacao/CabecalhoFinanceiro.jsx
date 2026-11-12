import { NavLink } from 'react-router-dom';
import { Lock } from 'lucide-react';
import usePlano from '@/modulos/feirante/hooks/usePlano';
import Styles from './cabecalhoFinanceiro.module.css';

const ABAS = [
  { texto: 'Lucros', destino: '/financeiro', recurso: 'financeiro' },
  { texto: 'Despesas', destino: '/adicionar-gasto', recurso: 'financeiro' },
  { texto: 'Planilhas', destino: '/planilhas', recurso: 'planilhas' },
];

// Segundo cabeçalho, exibido logo abaixo do cabeçalho do feirante na área financeira.
function CabecalhoFinanceiro() {
  const { temAcesso } = usePlano();

  function classe({ isActive }) {
    return isActive ? Styles.abaAtiva : Styles.aba;
  }

  return (
    <div className={Styles.faixa}>
      <nav className={Styles.abas} aria-label="Área financeira">
        {ABAS.map((aba) => (
          <NavLink key={aba.destino} to={aba.destino} end className={classe}>
            {aba.texto}
            {!temAcesso(aba.recurso) && (
              <Lock
                size={14}
                className={Styles.iconeBloqueio}
                aria-label="bloqueado no seu plano"
              />
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default CabecalhoFinanceiro;
