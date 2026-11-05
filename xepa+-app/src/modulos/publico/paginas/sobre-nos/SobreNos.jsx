import Header from '@/modulos/publico/paginas/sobre-nos/componentes/Header.jsx';
import QuemSomos from '@/modulos/publico/paginas/sobre-nos/componentes/Quemsomos.jsx';
import Missao from '@/modulos/publico/paginas/sobre-nos/componentes/Missao.jsx';
import Valores from '@/modulos/publico/paginas/sobre-nos/componentes/Valores.jsx';
import FeiraDePerto from '@/modulos/publico/paginas/sobre-nos/componentes/Feiradeperto.jsx';
import Time from '@/modulos/publico/paginas/sobre-nos/componentes/Time.jsx';
import Agradecimento from '@/modulos/publico/paginas/sobre-nos/componentes/Agradecimento.jsx';
import '@/modulos/publico/paginas/sobre-nos/estilos/Sobrenos.css';

function SobreNos() {
  return (
    <>
      <Header />

      <main className="sobre">
        <QuemSomos />
        <Missao />
        <Valores />
        <FeiraDePerto />
        <Time />
        <Agradecimento />
      </main>
    </>
  );
}

export default SobreNos;
