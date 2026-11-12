import Painel from '@/modulos/publico/paginas/sobre-nos/componentes/Painel.jsx';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import { VIDEOS } from '@/modulos/publico/paginas/sobre-nos/componentes/videosSobreNos.js';

function Visao() {
  return (
    <Painel
      id="sn-visao"
      titulo={
        <>
          Nossa <Rabisco cor="#18552f">visão</Rabisco>
        </>
      }
      destaque="Ser referência no aproveitamento pós-feira"
      cor="laranja"
      video={VIDEOS.visao.video}
      poster={VIDEOS.visao.poster}
      descricaoVideo="Frutas expostas em uma banca de mercado"
      invertido
    >
      <p className="sn-p">
        Construir um modelo <strong>sustentável, acessível e eficiente</strong>, que gere valor
        para consumidores, feirantes e parceiros.
      </p>
    </Painel>
  );
}

export default Visao;
