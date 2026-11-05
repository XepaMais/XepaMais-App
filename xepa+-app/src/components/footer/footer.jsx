import { Link } from 'react-router-dom';
import Styles from './footer.module.css';
import logo from '@/assets/imagens/gerais/logo-branca.png';

function Footer() {
  return (
    <footer className={Styles.footer}>
      <div className={Styles.rodapeTopo}>
        <div className={Styles.marca}>
          <Link className={Styles.logo} to="/" aria-label="Xepa+, página inicial">
            <img src={logo} alt="" />
            <span>Xepa+</span>
          </Link>

          <p className={Styles.descricao}>
            Conectando feirantes e consumidores para combater o desperdício de alimentos. Alimentos
            frescos, sustentabilidade e economia para a sua rotina.
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

        <nav className={Styles.colunas} aria-label="Links do rodapé">
          <div className={Styles.coluna}>
            <h3>Tecnologias e IA</h3>
            <ul>
              <li>
                <Link to="/chat-ia">Assistente virtual</Link>
              </li>
              <li>
                <Link to="/chat-feirante">Contato e suporte</Link>
              </li>
            </ul>
          </div>

          <div className={Styles.coluna}>
            <h3>Para vender</h3>
            <ul>
              <li>
                <Link to="/CriarContaF">Seja um feirante parceiro</Link>
              </li>
              <li>
                <Link to="/CriarUsuarioF">Cadastrar minha barraca</Link>
              </li>
            </ul>
          </div>

          <div className={Styles.coluna}>
            <h3>Home page</h3>
            <ul>
              <li>
                <Link to="/sobrenos">Quem somos</Link>
              </li>
              <li>
                <Link to="/#como-funciona">Como funciona</Link>
              </li>
              <li>
                <Link to="/#beneficios">O que você vai receber</Link>
              </li>
              <li className={Styles.espaco}>
                <Link to="/#planos-titulo">Planos</Link>
              </li>
              <li>
                <Link to="/#mapa">Mapas das feiras</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className={Styles.base}>
        <span>© 2026 Xepa+ Todos os direitos reservados.</span>
        <div className={Styles.legal}>
          <a href="#">Termos de uso</a>
          <a href="#">Diretrizes de Privacidade</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
