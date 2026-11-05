import { useLocation } from 'react-router-dom';
import NavbarF from './NavbarF';
import CabecalhoFinanceiro from './CabecalhoFinanceiro';
import { CAMINHOS_FINANCEIRO } from './caminhosFinanceiro';

function NavbarFeiranteGlobal() {
  const { pathname } = useLocation();

  const caminhosFeirante = [
    '/homeF',
    '/demo/feirante',
    '/adicionar-produto',
    '/adicionar-feira',
    ...CAMINHOS_FINANCEIRO,
    '/HistoricoChat',
    '/chat-ia',
    '/chat-feirante',
    '/perfil-feirante',
    '/historico-vendas',
    '/historico-produtos',
    '/dispositivos-feirante',
    '/planos',
  ];

  if (!caminhosFeirante.includes(pathname)) {
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
