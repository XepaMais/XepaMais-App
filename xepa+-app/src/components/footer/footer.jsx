import { Link, useLocation, useNavigate } from 'react-router-dom';
import Styles from './footer.module.css';
import logo from '@/assets/imagens/gerais/logo-branca.png';
import { CAMINHOS_FEIRANTE } from '@/modulos/feirante/componentes/navegacao/caminhosFeirante';
import { carregarPedidos, PENDENTE_RETIRADA } from '@/compartilhado/servicos/pedidos';

// Colunas do rodapé do site público.
const COLUNAS_PUBLICAS = [
  {
    titulo: 'Tecnologias e IA',
    links: [
      { texto: 'Xep.AI', destino: '/xep-ai' },
      { texto: 'Contato e suporte', destino: '/suporte' },
    ],
  },
  {
    titulo: 'Para vender',
    links: [
      { texto: 'Seja um feirante parceiro', destino: '/seja-parceiro' },
      { texto: 'Cadastrar minha barraca', destino: '/CriarUsuarioF' },
    ],
  },
  {
    titulo: 'Home page',
    links: [
      { texto: 'Home', destino: '/' },
      { texto: 'Quem somos', destino: '/#sobre' },
      { texto: 'Como funciona', destino: '/#como-funciona' },
      { texto: 'O que você vai receber', destino: '/#beneficios' },
      { texto: 'Divulgação', destino: '/#divulgacao' },
      { texto: 'Planos', destino: '/#planos-titulo' },
      { texto: 'Mapas das feiras', destino: '/#mapa' },
    ],
  },
];

// Colunas do rodapé da área do feirante: pedidos e histórico ficam logo na primeira coluna.
const COLUNAS_FEIRANTE = [
  {
    titulo: 'Pedidos',
    links: [
      { texto: 'Pedidos para retirar', destino: '/historico-vendas', contador: 'pendentes' },
      { texto: 'Histórico de vendas', destino: '/historico-vendas' },
      { texto: 'Conversas com clientes', destino: '/HistoricoChat' },
    ],
  },
  {
    titulo: 'Minha banca',
    links: [
      { texto: 'Início', destino: '/homeF' },
      { texto: 'Cadastrar Xepa', destino: '/adicionar-produto' },
      { texto: 'Histórico de produtos', destino: '/historico-produtos' },
      { texto: 'Minhas feiras', destino: '/adicionar-feira' },
    ],
  },
  {
    titulo: 'Gestão',
    links: [
      { texto: 'Financeiro', destino: '/financeiro' },
      { texto: 'Despesas', destino: '/adicionar-gasto' },
      { texto: 'Planilhas', destino: '/planilhas' },
      { texto: 'Xep.AI', destino: '/chat-ia' },
    ],
  },
  {
    titulo: 'Minha conta',
    links: [
      { texto: 'Meus dados', destino: '/perfil-feirante' },
      { texto: 'Planos', destino: '/planos' },
      { texto: 'Segurança', destino: '/dispositivos-feirante' },
      { texto: 'Contato e suporte', destino: '/suporte' },
    ],
  },
];

// html e body têm overflow-x: hidden (globais.css), então quem rola pode ser o <body>.
function rolarParaOTopo() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

// Espera a seção aparecer (a página pode estar trocando) e rola até ela.
function rolarParaSecao(id, tentativas = 30) {
  const secao = document.getElementById(id);

  if (secao) {
    // Rolagem direta: com o <body> como área de rolagem, o modo "smooth" pode não sair do lugar.
    secao.scrollIntoView({ block: 'start' });
    return;
  }

  if (tentativas > 0) {
    setTimeout(() => rolarParaSecao(id, tentativas - 1), 50);
  }
}

// O Link do React Router não rola a página: sem isso, a nova página abre na
// mesma altura em que o rodapé estava, e os links com # não chegam à seção.
function LinkRodape({ to, children, ...props }) {
  const navigate = useNavigate();

  function aoClicar(evento) {
    // Ctrl/Cmd/Shift + clique continua abrindo em nova aba normalmente.
    if (evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.button !== 0) {
      return;
    }

    evento.preventDefault();
    const secao = to.split('#')[1];

    navigate(to);

    if (secao) {
      rolarParaSecao(secao);
    } else {
      setTimeout(rolarParaOTopo, 0);
    }
  }

  return (
    <Link to={to} onClick={aoClicar} {...props}>
      {children}
    </Link>
  );
}

function Footer() {
  const { pathname } = useLocation();
  const areaFeirante = CAMINHOS_FEIRANTE.includes(pathname);
  const colunas = areaFeirante ? COLUNAS_FEIRANTE : COLUNAS_PUBLICAS;
  const pendentes = areaFeirante
    ? carregarPedidos().filter((pedido) => pedido.status === PENDENTE_RETIRADA).length
    : 0;

  return (
    <footer className={Styles.footer}>
      <div className={Styles.rodapeTopo}>
        <div className={Styles.marca}>
          <LinkRodape
            className={Styles.logo}
            to={areaFeirante ? '/homeF' : '/'}
            aria-label="Xepa+, página inicial"
          >
            <img src={logo} alt="" />
            <span>Xepa+</span>
          </LinkRodape>

          <p className={Styles.descricao}>
            {areaFeirante
              ? 'Gerencie seus pedidos, suas Xepas e o financeiro da sua banca em um só lugar.'
              : 'Conectando feirantes e consumidores para combater o desperdício de alimentos. Alimentos frescos, sustentabilidade e economia para a sua rotina.'}
          </p>

          <div className={Styles.redes} aria-label="Redes sociais">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M14 8V6.5c0-.7.3-1 1-1h2V2h-3c-3 0-4.5 1.8-4.5 4.4V8H7v3.5h2.5V22H14V11.5h2.8L17.3 8H14z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/xepa_mais/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8.2a3.2 3.2 0 110-6.4 3.2 3.2 0 010 6.4zM17.3 5.5a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4zM12 2c-2.7 0-3 0-4.1.1-3 .1-4.7 1.8-4.8 4.8C3 8 3 8.3 3 12s0 4 .1 5.1c.1 3 1.8 4.7 4.8 4.8C9 22 9.3 22 12 22s3 0 4.1-.1c3-.1 4.7-1.8 4.8-4.8.1-1.1.1-1.4.1-5.1s0-4-.1-5.1c-.1-3-1.8-4.7-4.8-4.8C15 2 14.7 2 12 2zm0 1.8c2.7 0 3 0 4 .1 2.2.1 3.2 1.1 3.3 3.3.1 1 .1 1.3.1 4s0 3-.1 4c-.1 2.2-1.1 3.2-3.3 3.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-2.2-.1-3.2-1.1-3.3-3.3-.1-1-.1-1.3-.1-4s0-3 .1-4C4.8 5 5.8 4 8 3.9c1-.1 1.3-.1 4-.1z" />
              </svg>
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="X / Twitter">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M22 5.9c-.7.3-1.5.5-2.3.6.8-.5 1.5-1.3 1.8-2.2-.8.5-1.7.8-2.6 1a4.1 4.1 0 00-7 3.7C8.5 8.8 5.4 7.1 3.4 4.6c-1.1 1.9-.5 4.2 1.2 5.4-.7 0-1.3-.2-1.8-.5 0 2 1.4 3.7 3.3 4.1-.6.2-1.2.2-1.8.1.5 1.6 2 2.8 3.8 2.9A8.2 8.2 0 012 18.3 11.6 11.6 0 008.3 20c7.5 0 11.7-6.3 11.4-12 .8-.6 1.5-1.3 2-2.1z" />
              </svg>
            </a>
          </div>
        </div>

        <nav
          className={`${Styles.colunas} ${areaFeirante ? Styles.colunasFeirante : ''}`}
          aria-label="Links do rodapé"
        >
          {colunas.map((coluna) => (
            <div className={Styles.coluna} key={coluna.titulo}>
              <h3>{coluna.titulo}</h3>
              <ul>
                {coluna.links.map((link) => (
                  <li key={link.texto}>
                    <LinkRodape to={link.destino}>
                      {link.texto}
                      {link.contador === 'pendentes' && pendentes > 0 && (
                        <span
                          className={Styles.contador}
                          aria-label={`${pendentes} ${pendentes === 1 ? 'pedido' : 'pedidos'} para retirar`}
                        >
                          {pendentes}
                        </span>
                      )}
                    </LinkRodape>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      <div className={Styles.base}>
        <span>© 2026 Xepa+ Todos os direitos reservados.</span>
        <div className={Styles.legal}>
          <LinkRodape to="/termos-de-uso">Termos de uso</LinkRodape>
          <LinkRodape to="/privacidade">Diretrizes de Privacidade</LinkRodape>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
