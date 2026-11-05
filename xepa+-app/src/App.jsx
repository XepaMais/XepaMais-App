import { BrowserRouter, Routes } from 'react-router-dom';

import { rotasPublicas } from './aplicacao/rotas/rotas-publicas';
import { rotasAutenticacao } from './aplicacao/rotas/rotas-autenticacao';
import { rotasFeirante } from './aplicacao/rotas/rotas-feirante';
import { rotasUsuario } from './aplicacao/rotas/rotas-usuario';

import Footer from './components/footer/footer';
import UserWay from './components/UserWay';

import HeaderHomeGlobal from './modulos/publico/componentes/navegacao/HeaderHomeGlobal';
import NavbarFeiranteGlobal from './modulos/feirante/componentes/navegacao/NavbarFeiranteGlobal';
import NavbarUsuarioGlobal from './modulos/usuario/componentes/navegacao/NavbarUsuarioGlobal';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <UserWay />

        <HeaderHomeGlobal />
        <NavbarFeiranteGlobal />
        <NavbarUsuarioGlobal />
        <Routes>
          {rotasAutenticacao}
          {rotasFeirante}
          {rotasUsuario}
          {rotasPublicas}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
