import { useLocation } from 'react-router-dom';
import NavbarF from './NavbarF';
import CabecalhoFinanceiro from './CabecalhoFinanceiro';
import { CAMINHOS_FINANCEIRO } from './caminhosFinanceiro';
import { CAMINHOS_FEIRANTE } from './caminhosFeirante';

function NavbarFeiranteGlobal() {
  const { pathname } = useLocation();

  if (!CAMINHOS_FEIRANTE.includes(pathname)) {
    return null;
  }

  return (
    <>
      <NavbarF />
      {CAMINHOS_FINANCEIRO.includes(pathname) && <CabecalhoFinanceiro />}
    </>
  );
}

export default NavbarFeiranteGlobal;
