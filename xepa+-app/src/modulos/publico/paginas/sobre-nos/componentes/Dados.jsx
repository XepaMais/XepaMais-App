import '@/modulos/publico/paginas/sobre-nos/estilos/Dados.css';

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
        <div className="sn-cabecalho">
          <p className="sn-eyebrow">Por que isso importa</p>
          <h2 id="sn-dados-titulo" className="sn-titulo">
            O desperdício na feira é maior do que parece
          </h2>
        </div>

        <ul className="sn-dados__lista">
          {DADOS.map((dado) => (
            <li key={dado.numero} className="sn-dado">
              <p className="sn-dado__numero">{dado.numero}</p>
              <p className="sn-dado__unidade">{dado.unidade}</p>
              <p className="sn-texto sn-dado__texto">{dado.texto}</p>
            </li>
          ))}
        </ul>

        <p className="sn-nota sn-dados__fonte">
          Fonte: estudo da Unesp sobre o desperdício de alimentos nas feiras livres de São Paulo.
        </p>
      </div>
    </section>
  );
}
