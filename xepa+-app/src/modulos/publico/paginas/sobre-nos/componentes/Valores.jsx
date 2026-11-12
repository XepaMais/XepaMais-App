import Painel from '@/modulos/publico/paginas/sobre-nos/componentes/Painel.jsx';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import { VIDEOS } from '@/modulos/publico/paginas/sobre-nos/componentes/videosSobreNos.js';

const VALORES = [
  { nome: 'Sustentabilidade', texto: 'Alimento bom não vira lixo.' },
  { nome: 'Acessibilidade', texto: 'Comida de qualidade a preço justo.' },
  { nome: 'Compromisso social', texto: 'Cuidado com quem vive da feira e com quem depende dela.' },
];

function Valores() {
  return (
    <Painel
      id="sn-valores"
      titulo={
        <>
          Nossos <Rabisco>valores</Rabisco>
        </>
      }
      destaque="O que guia cada decisão"
      cor="creme"
      video={VIDEOS.valores.video}
      poster={VIDEOS.valores.poster}
      descricaoVideo="Pessoas escolhendo frutas e verduras em uma feira ao ar livre"
    >
      <ul className="sn-valores">
        {VALORES.map((valor) => (
          <li key={valor.nome} className="sn-p">
            <strong>{valor.nome}:</strong> {valor.texto}
          </li>
        ))}
      </ul>
    </Painel>
  );
}

export default Valores;
