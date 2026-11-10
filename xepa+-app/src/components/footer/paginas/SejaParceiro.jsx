import { Link } from 'react-router-dom';
import { Check, Leaf, MapPin, Store, TrendingUp, Users } from 'lucide-react';
import imagemFeirante from '@/assets/imagens/sobre-nos/Feirante.jpg';
import LayoutFooter from './LayoutFooter';
import Styles from './paginas.module.css';

const VANTAGENS = [
  {
    icone: Users,
    titulo: 'Mais clientes',
    texto: 'Sua barraca aparece para consumidores da região que procuram alimentos frescos.',
  },
  {
    icone: Leaf,
    titulo: 'Menos desperdício',
    texto: 'Venda a xepa do fim da feira em vez de jogar fora o que ainda está bom.',
  },
  {
    icone: TrendingUp,
    titulo: 'Controle das vendas',
    texto: 'Acompanhe pedidos, gastos e lucros em um só lugar, direto do celular.',
  },
  {
    icone: MapPin,
    titulo: 'No mapa das feiras',
    texto: 'Mostre onde e quando sua barraca está para quem quer comprar perto de casa.',
  },
];

const PASSOS = [
  {
    titulo: 'Cadastre sua barraca',
    texto: 'Preencha os dados da barraca e escolha o plano que combina com você.',
  },
  {
    titulo: 'Adicione produtos e feiras',
    texto: 'Informe o que você vende e em quais feiras e dias você trabalha.',
  },
  {
    titulo: 'Publique suas xepas',
    texto: 'No fim da feira, anuncie os produtos com desconto para quem está por perto.',
  },
  {
    titulo: 'Venda e acompanhe',
    texto: 'Receba pedidos e veja os resultados da sua barraca crescerem.',
  },
];

function SejaParceiro() {
  return (
    <LayoutFooter
      etiqueta="Para vender"
      titulo="Seja um feirante parceiro do Xepa+"
      descricao="Leve sua barraca para o digital, conquiste novos clientes e transforme o fim da feira em lucro, não em desperdício."
    >
      <section className={Styles.secao}>
        <div className={`${Styles.conteudo} ${Styles.duasColunas}`}>
          <img src={imagemFeirante} alt="Feirante sorrindo em sua barraca de frutas e legumes" />

          <div>
            <h2>A feira de sempre, agora com mais alcance</h2>
            <p>
              O Xepa+ conecta feirantes a consumidores que valorizam alimentos frescos e querem
              economizar. Você continua fazendo o que sabe de melhor, e a plataforma ajuda a vender
              mais e a perder menos.
            </p>
            <ul className={Styles.lista}>
              <li>
                <Check size={20} aria-hidden="true" />
                Comece sem pagar nada com o plano Grátis
              </li>
              <li>
                <Check size={20} aria-hidden="true" />
                Ferramentas de gestão financeira e Xep.AI nos planos pagos
              </li>
              <li>
                <Check size={20} aria-hidden="true" />
                Ajude a combater o desperdício de alimentos
              </li>
            </ul>
            <Link to="/CriarUsuarioF" className={Styles.botao}>
              <Store size={20} aria-hidden="true" />
              Quero ser parceiro
            </Link>
          </div>
        </div>
      </section>

      <section className={Styles.secao}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>Por que vender com o Xepa+</h2>
          <p className={Styles.subtituloSecao}>
            Benefícios pensados para a rotina de quem vive da feira.
          </p>

          <div className={Styles.grade}>
            {VANTAGENS.map(({ icone: Icone, titulo, texto }) => (
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

      <section className={`${Styles.secao} ${Styles.secaoCreme}`}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>Como começar</h2>
          <p className={Styles.subtituloSecao}>Em poucos minutos sua barraca já está no Xepa+.</p>

          <ol className={Styles.passos}>
            {PASSOS.map((passo) => (
              <li key={passo.titulo} className={Styles.passo}>
                <h3>{passo.titulo}</h3>
                <p>{passo.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className={Styles.chamada}>
        <h2>Vamos juntos fazer a feira render mais?</h2>
        <p>Cadastre sua barraca agora e escolha o plano ideal para o seu negócio.</p>
        <div className={Styles.botoes}>
          <Link to="/CriarUsuarioF" className={Styles.botao}>
            Cadastrar minha barraca
          </Link>
          <Link to="/suporte" className={Styles.botaoSecundario}>
            Falar com o suporte
          </Link>
        </div>
      </section>
    </LayoutFooter>
  );
}

export default SejaParceiro;
