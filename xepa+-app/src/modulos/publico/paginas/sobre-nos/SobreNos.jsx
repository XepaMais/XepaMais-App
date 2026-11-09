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
