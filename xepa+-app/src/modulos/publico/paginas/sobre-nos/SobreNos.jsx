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
// Peças reaproveitadas da Home: faixa em carrossel e animações ao rolar
import FaixaXepa from '@/modulos/publico/paginas/inicio/componentes/FaixaXepa.jsx';
import useRevelarAoRolar from '@/modulos/publico/paginas/inicio/ganchos/useRevelarAoRolar.js';
import '@/modulos/publico/paginas/inicio/estilos/Animacoes.css';
import '@/modulos/publico/paginas/sobre-nos/estilos/Sobrenos.css';

const PALAVRAS_TOPO = [
  'Quem somos',
  'Xepa+',
  'Menos desperdício',
  'Feira fresquinha',
  'Mais alimento',
  'Mais futuro',
];

const PALAVRAS_DADOS = [
  'Alimento bom não vira lixo',
  'Xepa+',
  'Preço justo',
  'Feira livre',
  'Menos desperdício',
  'Mais comida na mesa',
];

function SobreNos() {
  // Ao entrar na página, sempre começa do topo (o React Router mantém a rolagem anterior).
  // Como html e body têm overflow-x: hidden (globais.css), quem rola é o <body>, não a janela,
  // então zeramos os três.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  // Liga as animações de entrada (data-revelar), como na Home
  useRevelarAoRolar();

  return (
    <>
      <Header />

      <main className="sobre">
        <Apresentacao />
        <FaixaXepa palavras={PALAVRAS_TOPO} />
        <QuemSomos />
        <Missao />
        <Visao />
        <Valores />
        <FaixaXepa palavras={PALAVRAS_DADOS} cor="laranja" />
        <Dados />
        <FeiraDePerto />
        <Time />
        <Agradecimento />
      </main>
    </>
  );
}

export default SobreNos;
