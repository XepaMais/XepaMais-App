import Painel from '@/modulos/publico/paginas/sobre-nos/componentes/Painel.jsx';
import { VIDEOS } from '@/modulos/publico/paginas/sobre-nos/componentes/videosSobreNos.js';

function Visao() {
  return (
    <Painel
      id="sn-visao"
      rotulo="Visão"
      corRotulo="#FF5200"
      titulo="Ser referência no aproveitamento pós-feira"
      cor="laranja"
      video={VIDEOS.visao.video}
      poster={VIDEOS.visao.poster}
      descricaoVideo="Frutas expostas em uma banca de mercado"
      invertido
    >
      <p className="sn-texto">
        Construir um modelo <strong>sustentável, acessível e eficiente</strong>, que gere valor
        para consumidores, feirantes e parceiros.
      </p>
    </Painel>
  );
}

export default Visao;
