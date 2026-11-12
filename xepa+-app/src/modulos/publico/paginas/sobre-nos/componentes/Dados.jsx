import '@/modulos/publico/paginas/sobre-nos/estilos/Dados.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

const DADOS = [
  {
    numero: '33 mil',
    unidade: 'toneladas',
    texto: 'de alimentos vão para o lixo por ano nas feiras da capital paulista.',
  },
  {
    numero: '19 milhões',
    unidade: 'de brasileiros',
    texto: 'poderiam fazer 3 refeições ao dia com esse volume.',
  },
  {
    numero: '95%',
    unidade: 'dos feirantes',
    texto: 'relatam desperdício no fim da feira.',
  },
];

export default function Dados() {
  return (
    <section className="sn-dados" aria-labelledby="sn-dados-titulo">
      <div className="sn-dados__conteudo">
        <header className="sn-topo">
          <h2 id="sn-dados-titulo" className="sn-h2" data-revelar>
            O desperdício na feira é maior do que <Rabisco cor="#f76019">parece</Rabisco>
          </h2>
          <p className="sn-p" data-revelar style={{ '--atraso': '0.08s' }}>
            Além de estudar pesquisas sobre o tema, fomos a campo: conversamos com{' '}
            <strong>feirantes reais</strong> de São Paulo para entender como a xepa acontece no
            dia a dia das bancas.
          </p>
        </header>

        <ul className="sn-dados__lista">
          {DADOS.map((dado, indice) => (
            <li
              key={dado.numero}
              className="sn-dado"
              data-revelar
              style={{ '--atraso': `${0.1 + indice * 0.12}s` }}
            >
              <p className="sn-dado__numero">{dado.numero}</p>
              <p className="sn-dado__unidade">{dado.unidade}</p>
              <p className="sn-p">{dado.texto}</p>
            </li>
          ))}
        </ul>

        <p className="sn-dados__fonte">
          Fontes: estudo da Unesp sobre o desperdício de alimentos nas feiras livres de São Paulo e
          pesquisas de campo feitas pela equipe Xepa+ com feirantes reais.
        </p>
      </div>
    </section>
  );
}
