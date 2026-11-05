import Styles from '@/modulos/usuario/paginas/cozinha/estilos/Cozy.module.css';
import Caldo from '@/assets/imagens/gerais/caldo-abobora.jpg';

const ETAPAS = [
  'Corte os legumes e verduras',
  'Refogue os legumes',
  'Tempere a gosto',
  'Cozinhe',
  'Finalize',
];

const INGREDIENTES_SOPA = [
  { valor: 'abobora', nome: '1 Batata' },
  { valor: 'cebola', nome: 'Óleo' },
  { valor: 'alho', nome: '1 Cheiro-verde' },
  { valor: 'azeite', nome: '1 Cenoura' },
  { valor: 'sal', nome: 'Temperos a gosto' },
];

const RECEITAS = [
  {
    id: 1,
    nome: 'Caldo verde',
    tempo: '30 min',
    porcoes: 'Serve: 2',
    ingredientes: [
      { valor: 'abobora', nome: '1 cenoura' },
      { valor: 'cebola', nome: '1 Cebola' },
      { valor: 'alho', nome: '1 Cheiro-verde' },
      { valor: 'azeite', nome: '1 Cenoura' },
      { valor: 'sal', nome: 'Temperos a gosto' },
    ],
  },
  {
    id: 2,
    nome: 'Sopa de legumes',
    tempo: '45 min',
    porcoes: 'Serve: 3',
    ingredientes: INGREDIENTES_SOPA,
  },
  {
    id: 3,
    nome: 'Sopa de legumes',
    tempo: '45 min',
    porcoes: 'Serve: 3',
    ingredientes: INGREDIENTES_SOPA,
  },
];

function Receita({ receita }) {
  return (
    <div className={Styles.organiz}>
      <div className={Styles.cardReceita}>
        <div className={Styles.imagemReceita}>
          <img src={Caldo} alt="Tigela de caldo de abóbora" />
        </div>

        <div className={Styles.txtCard}>
          <h2>{receita.nome}</h2>

          <div className={Styles.tempo}>
            <div>
              <p>{receita.tempo}</p>
            </div>
            <div>
              <p>{receita.porcoes}</p>
            </div>
          </div>

          <div className={Styles.textpadrao}>
            <p>Feito com ingredientes frescos da feira para o seu prato.</p>
          </div>

          <div className={Styles.ia}>
            <h2>Adaptar com IA</h2>
          </div>
        </div>
      </div>

      <div className={Styles.quadro}>
        <div className={Styles.ing}>
          <h2>Ingredientes</h2>
          <p>Marque os ingredientes que você já tem:</p>

          <form>
            {receita.ingredientes.map((ingrediente) => (
              <label key={ingrediente.valor}>
                <input type="checkbox" name="ingredientes" value={ingrediente.valor} />
                {ingrediente.nome}
              </label>
            ))}
          </form>
        </div>

        <div className={Styles.preparo}>
          <h2>Modo de Preparo</h2>

          <div className={Styles.grupEta}>
            {ETAPAS.map((etapa, indice) => (
              <div className={Styles.etapas} key={etapa}>
                <div className={Styles.circule}>{indice + 1}</div>
                <p>{etapa}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Cozy() {
  return (
    <section className={Styles.cozyMain}>
      <div>
        <h1>O que cozinhar com sua Xepa?</h1>
        <p>Receitas com os itens que você comprou</p>

        <div className={Styles.row}>
          {RECEITAS.map((receita) => (
            <Receita key={receita.id} receita={receita} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Cozy;
