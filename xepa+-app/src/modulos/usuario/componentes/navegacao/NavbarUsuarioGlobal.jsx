import { useLocation } from 'react-router-dom';
import NavbarC from './NavbarC';

function NavbarUsuarioGlobal() {
  const { pathname } = useLocation();

  const caminhosUsuario = [
    '/homeU',
    '/demo/consumidor',
    '/mapa',
    '/cozinha',
    '/impacto',
    '/carrinho',
    '/perfil',
    '/chat-consumidor',
    '/Verduras',
    '/HistoricoChatUsuario',
    '/pagamento',
    '/historico-pedidos',
    '/dispositivos',
  ];

  if (!caminhosUsuario.includes(pathname)) {
    return null;
  }

  return <NavbarC />;
}

export default NavbarUsuarioGlobal;
