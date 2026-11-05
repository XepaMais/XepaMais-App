import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@/modulos/publico/paginas/inicio/estilos/Header.css';
import logo from '@/assets/imagens/pagina-inicial/logo-copy.png';

const links = [
  { texto: 'Home', rota: '/' },
  { texto: 'Sobre Nós', rota: '/sobrenos' },
  { texto: 'Mapa', rota: '/mapa-home' },
  { texto: 'Receitas', rota: '/cozinha-home' },
];

export default function Header() {
  const navigate = useNavigate();
  const [aberto, setAberto] = useState(false);

  function irPara(evento, rota) {
    evento.preventDefault();
    navigate(rota);
    setAberto(false);
  }

  return (
    <header className="cabecalho-xepa">
      <a
        href="/"
        className="marca-xepa"
        aria-label="Xepa+, ir para o início"
        onClick={(evento) => irPara(evento, '/')}
      >
        <img className="logo-xepa" src={logo} alt="Xepa+" />
      </a>

      <nav
        id="menu-principal"
        className={aberto ? 'menu-principal aberto' : 'menu-principal'}
        aria-label="Principal"
      >
        {links.map((link) => (
          <a key={link.texto} href={link.rota} onClick={(evento) => irPara(evento, link.rota)}>
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
