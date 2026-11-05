import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/modulos/publico/paginas/inicio/estilos/Header.css';
import logo from '@/assets/imagens/pagina-inicial/logo-copy.png';

const links = [
  { texto: 'Home', destino: '#inicio' },
  { texto: 'Sobre Nós', destino: '#sobre' },
  { texto: 'Mapa', rota: '/mapa-home' },
  { texto: 'Receitas', rota: '/cozinha-home' },
];

export default function Header() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);

  function irParaInicio(evento) {
    evento.preventDefault();
    navigate('/');
  }

  // Links com rota trocam de página; os outros rolam até a seção da Home.
  function aoClicarNoLink(evento, link) {
    evento.preventDefault();
    setAberto(false);

    if (link.rota) {
      navigate(link.rota);
      return;
    }

    if (window.location.pathname !== '/') {
      navigate('/');
    }

    // Espera a Home aparecer antes de procurar a seção.
    setTimeout(() => {
      const secao = document.querySelector(link.destino);

      if (secao) {
        secao.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }

  return (
    <header className="cabecalho-xepa">
      <a
        href="/"
        className="marca-xepa"
        aria-label="Xepa+, ir para o início"
        onClick={irParaInicio}
      >
        <img className="logo-xepa" src={logo} alt="Xepa+" />
      </a>

      <nav
        id="menu-principal"
        className={aberto ? 'menu-principal aberto' : 'menu-principal'}
        aria-label="Principal"
      >
        {links.map((link) => (
          <a
            key={link.texto}
            href={link.rota || link.destino}
            onClick={(evento) => aoClicarNoLink(evento, link)}
          >
            {link.texto}
          </a>
        ))}
      </nav>

      <div className="acoes-xepa">
        <button type="button" className="botao-entrar" onClick={() => navigate('/Crumb')}>
          Login
        </button>

        <button
          type="button"
          className="botao-menu"
          aria-label={aberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={aberto}
          aria-controls="menu-principal"
          onClick={() => setAberto(!aberto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}
