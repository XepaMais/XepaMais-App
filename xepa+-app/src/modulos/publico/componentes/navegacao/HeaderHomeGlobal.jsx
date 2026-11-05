import { useLocation } from 'react-router-dom';
import Header from '@/modulos/publico/paginas/inicio/componentes/Header';

function HeaderHomeGlobal() {
  const { pathname } = useLocation();

  const caminhosHome = ['/mapa-home', '/cozinha-home'];

  if (!caminhosHome.includes(pathname)) {
    return null;
  }

  return <Header />;
}

export default HeaderHomeGlobal;
