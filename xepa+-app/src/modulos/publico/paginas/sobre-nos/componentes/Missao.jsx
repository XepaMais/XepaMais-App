import Painel from '@/modulos/publico/paginas/sobre-nos/componentes/Painel.jsx';
import { VIDEOS } from '@/modulos/publico/paginas/sobre-nos/componentes/videosSobreNos.js';

function Missao() {
  return (
    <Painel
      id="sn-missao"
      rotulo="Missão"
      titulo="Dar um novo destino ao que sobra da feira"
      cor="lima"
      video={VIDEOS.missao.video}
      poster={VIDEOS.missao.poster}
      descricaoVideo="Banca de feira com frutas e verduras"
    >
      <p className="sn-texto">
        Reduzir o desperdício de frutas, verduras e legumes das <strong>feiras livres</strong>,
        conectando feirantes a consumidores e tornando esses alimentos mais acessíveis.
      </p>
    </Painel>
  );
}

export default Missao;
