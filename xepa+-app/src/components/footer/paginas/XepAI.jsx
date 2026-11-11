import { Link } from 'react-router-dom';
import { Check, ChefHat, MessageCircle, Sparkles, TrendingUp, Wallet } from 'lucide-react';
import imagemIA from '@/assets/imagens/marca/ia.png';
import LayoutFooter from './LayoutFooter';
import Styles from './estilos/XepAI.module.css';

const RECURSOS = [
  {
    icone: MessageCircle,
    titulo: 'Converse quando quiser',
    texto: 'Tire dúvidas sobre vendas, preços e organização da barraca a qualquer hora do dia.',
  },
  {
    icone: Wallet,
    titulo: 'Finanças sem complicação',
    texto: 'Entenda seus gastos e lucros com explicações simples sobre os números da sua barraca.',
  },
  {
    icone: TrendingUp,
    titulo: 'Venda mais e desperdice menos',
    texto:
      'Receba sugestões de quando transformar produtos em xepa e como montar ofertas atrativas.',
  },
  {
    icone: ChefHat,
    titulo: 'Ideias de aproveitamento',
    texto: 'Sugestões de receitas e usos para frutas e legumes que estão perto do fim da feira.',
  },
];

function XepAI() {
  return (
    <LayoutFooter
      estilos={Styles}
      etiqueta="Tecnologia e IA"
      titulo="Conheça a Xep.AI"
      descricao="A assistente virtual do Xepa+ que ajuda o feirante a cuidar da barraca, das finanças e a reduzir o desperdício de alimentos."
    >
      <section className={Styles.secao}>
        <div className={`${Styles.conteudo} ${Styles.duasColunas}`}>
          <img src={imagemIA} alt="Ilustração da Xepinha, a assistente virtual Xep.AI" />

          <div>
            <h2>Uma ajudante de bolso para a sua barraca</h2>
            <p>
              A Xep.AI, carinhosamente chamada de Xepinha, é uma inteligência artificial pensada
              para a rotina da feira. Ela conversa em linguagem simples e usa as informações da sua
              barraca para dar respostas que fazem sentido para o seu dia a dia.
            </p>
            <ul className={Styles.lista}>
              <li>
                <Check size={20} aria-hidden="true" />
                Respostas rápidas, direto pelo celular
              </li>
              <li>
                <Check size={20} aria-hidden="true" />
                Dicas personalizadas com base nas suas vendas
              </li>
              <li>
                <Check size={20} aria-hidden="true" />
                Disponível nos planos Crescer e Pro
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className={`${Styles.secao} ${Styles.secaoCreme}`}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>O que a Xep.AI faz por você</h2>
          <p className={Styles.subtituloSecao}>
            Tudo o que você precisa para tomar decisões melhores, sem planilhas complicadas.
          </p>

          <div className={Styles.grade}>
            {RECURSOS.map(({ icone: Icone, titulo, texto }) => (
              <article key={titulo} className={Styles.card}>
                <span className={Styles.icone}>
                  <Icone size={26} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={Styles.chamada}>
        <h2>
          <Sparkles size={24} aria-hidden="true" /> Pronto para conversar com a Xepinha?
        </h2>
        <p>Cadastre sua barraca, escolha o plano Crescer ou Pro e comece a usar a Xep.AI hoje.</p>
        <div className={Styles.botoes}>
          <Link to="/CriarUsuarioF" className={Styles.botao}>
            Cadastrar minha barraca
          </Link>
          <Link to="/chat-ia" className={Styles.botaoSecundario}>
            Já sou feirante
          </Link>
        </div>
      </section>
    </LayoutFooter>
  );
}

export default XepAI;
