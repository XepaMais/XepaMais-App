import '@/modulos/publico/paginas/inicio/estilos/Benefits.css';

import cestaXepa from '@/assets/imagens/pagina-inicial/xepa.png';
import seta1 from '@/assets/imagens/pagina-inicial/seta1.png';
import seta2 from '@/assets/imagens/pagina-inicial/seta2.png';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

const categorias = [
  {
    nome: 'Legumes',
    classe: 'categoria-beneficio--legumes',
    imagem: seta1,
  },
  {
    nome: 'Verduras',
    classe: 'categoria-beneficio--verduras',
    imagem: seta2,
  },
  {
    nome: 'Frutas',
    classe: 'categoria-beneficio--frutas',
    imagem: seta2,
  },
  {
    nome: 'Temperos',
    classe: 'categoria-beneficio--temperos',
    imagem: seta1,
  },
];

export default function Benefits() {
  return (
    <section className="secao-beneficios" id="beneficios">
      <header className="cabecalho-beneficios" data-revelar>
        <h2>
          O que você vai <Rabisco>receber</Rabisco>
        </h2>

        <p>
          Com o Xepa+, você encontra alimentos frescos, economiza nas compras e ajuda a reduzir o
          desperdício nas feiras.
        </p>

        <a href="#sobre" className="botao-beneficios">
          Saiba mais
        </a>
      </header>

      <div className="ilustracao-beneficios" data-revelar="zoom" style={{ '--atraso': '0.15s' }}>
        <img className="cesta-beneficios" src={cestaXepa} alt="Cesta de alimentos do Xepa+" />

        {categorias.map((categoria) => (
          <div key={categoria.nome} className={`categoria-beneficio ${categoria.classe}`}>
            <span>{categoria.nome}</span>

            <img className="seta-beneficio" src={categoria.imagem} alt="" aria-hidden="true" />
          </div>
        ))}
      </div>
    </section>
  );
}
