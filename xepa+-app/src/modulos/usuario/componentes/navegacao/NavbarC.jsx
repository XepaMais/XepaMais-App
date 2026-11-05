import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ClipboardList, ShieldCheck, ShoppingCart, UserRound } from 'lucide-react';
import MenuConta from '@/compartilhado/componentes/conta/MenuConta';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import useCarrinho from '@/modulos/usuario/hooks/useCarrinho';
import styles from './navbarC.module.css';
import logo from '@/assets/imagens/gerais/logo-2.png';

const links = [
  { texto: 'Home', destino: '/homeU' },
  { texto: 'Mapa', destino: '/mapa' },
  { texto: 'Seu Impacto', destino: '/impacto' },
  { texto: 'Receita', destino: '/cozinha' },
  { texto: 'Chat', destino: '/HistoricoChatUsuario' },
];

const itensConta = [
  { texto: 'Pedidos', destino: '/historico-pedidos', Icone: ClipboardList },
  { texto: 'Meus Dados', destino: '/perfil', Icone: UserRound },
  { texto: 'Segurança', destino: '/dispositivos', Icone: ShieldCheck },
];

function classeDoLink({ isActive }) {
  return isActive ? styles.linkAtivo : styles.linkNav;
}

function classeDoCarrinho({ isActive }) {
  return isActive ? `${styles.linkCarrinho} ${styles.carrinhoAtivo}` : styles.linkCarrinho;
}

function NavbarC() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { primeiroNome } = usePerfil('usuario');
  const { totalItens } = useCarrinho();

  function fecharMenu() {
    setMenuAberto(false);
  }

  return (
    <header className={styles.navbar}>
      <Link to="/homeU" className={styles.logo} aria-label="Home do usuário" onClick={fecharMenu}>
        <img src={logo} alt="Logo Xepa+" className={styles.iconeLogo} />
      </Link>

      <nav
        className={`${styles.navLinks} ${menuAberto ? styles.menuAberto : ''}`}
        aria-label="Navegação do usuário"
      >
        {links.map((link) => (
          <NavLink
            key={link.destino}
            to={link.destino}
            end
            onClick={fecharMenu}
            className={classeDoLink}
          >
            {link.texto}
          </NavLink>
        ))}

        <Link to="/perfil" className={`${styles.perfil} ${styles.perfilMenu}`} onClick={fecharMenu}>
          <div className={styles.avatar}></div>
          <span className={styles.nomeUsuario}>{primeiroNome}</span>
        </Link>

        {itensConta.map((item) => (
          <Link
            key={item.destino}
            to={item.destino}
            className={`${styles.linkNav} ${styles.contaMenu}`}
            onClick={fecharMenu}
          >
            {item.texto}
          </Link>
        ))}

        <Link to="/" className={`${styles.botaoVoltar} ${styles.sairMenu}`} onClick={fecharMenu}>
          Sair
        </Link>
      </nav>

      <div className={styles.acoes}>
        <NavLink
          to="/carrinho"
          end
          aria-label={totalItens > 0 ? `Carrinho com ${totalItens} itens` : 'Carrinho'}
          title="Carrinho"
          className={classeDoCarrinho}
        >
          <ShoppingCart size={30} strokeWidth={2} />
          {totalItens > 0 && <span className={styles.contadorCarrinho}>{totalItens}</span>}
        </NavLink>

        <MenuConta nome={primeiroNome} itens={itensConta} className={styles.perfil}>
          <div className={styles.avatar}></div>
          <span className={styles.nomeUsuario}>{primeiroNome}</span>
        </MenuConta>

        <Link to="/" className={styles.botaoVoltar}>
          Sair
        </Link>

        <button
          type="button"
          className={styles.botaoMenu}
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          onClick={() => setMenuAberto(!menuAberto)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default NavbarC;
