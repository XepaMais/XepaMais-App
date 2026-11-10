import { useEffect } from 'react';
import Header from '@/modulos/publico/paginas/sobre-nos/componentes/Header.jsx';
import Apresentacao from '@/modulos/publico/paginas/sobre-nos/componentes/Apresentacao.jsx';
import QuemSomos from '@/modulos/publico/paginas/sobre-nos/componentes/Quemsomos.jsx';
import Missao from '@/modulos/publico/paginas/sobre-nos/componentes/Missao.jsx';
import Visao from '@/modulos/publico/paginas/sobre-nos/componentes/Visao.jsx';
import Valores from '@/modulos/publico/paginas/sobre-nos/componentes/Valores.jsx';
import Dados from '@/modulos/publico/paginas/sobre-nos/componentes/Dados.jsx';
import FeiraDePerto from '@/modulos/publico/paginas/sobre-nos/componentes/Feiradeperto.jsx';
import Time from '@/modulos/publico/paginas/sobre-nos/componentes/Time.jsx';
import Agradecimento from '@/modulos/publico/paginas/sobre-nos/componentes/Agradecimento.jsx';
import '@/modulos/publico/paginas/sobre-nos/estilos/Sobrenos.css';

function SobreNos() {
  // Ao entrar na página, sempre começa do topo (o React Router mantém a rolagem anterior).
  // Como html e body têm overflow-x: hidden (globais.css), quem rola é o <body>, não a janela,
  // então zeramos os três.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Header />

      <main className="sobre">
        <Apresentacao />
        <QuemSomos />
        <Missao />
        <Visao />
        <Valores />
        <Dados />
        <FeiraDePerto />
        <Time />
        <Agradecimento />
      </main>
    </>
  );
}

export default SobreNos;
