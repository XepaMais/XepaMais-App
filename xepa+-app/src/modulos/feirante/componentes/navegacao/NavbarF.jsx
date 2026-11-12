import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { CAMINHOS_FINANCEIRO } from './caminhosFinanceiro';
import { BadgeCheck, Lock, Package, Receipt, ShieldCheck, UserRound, Wallet } from 'lucide-react';
import MenuConta from '@/compartilhado/componentes/conta/MenuConta';
import FotoPerfil from '@/compartilhado/componentes/conta/FotoPerfil';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import usePlano from '@/modulos/feirante/hooks/usePlano';
import styles from './navbarF.module.css';
import logo from '@/assets/imagens/marca/logo.png';

const links = [
  { texto: 'Home', destino: '/homeF' },
  { texto: 'Produtos', destino: '/adicionar-produto' },
  { texto: 'Feiras', destino: '/adicionar-feira' },
  { texto: 'Financeiro', destino: '/financeiro', recurso: 'financeiro' },
  { texto: 'Chat', destino: '/HistoricoChat' },
  { texto: 'Xep.AI', destino: '/chat-ia', recurso: 'ia' },
];

const itensConta = [
  { texto: 'Meus Dados', destino: '/perfil-feirante', Icone: UserRound },
  { texto: 'Histórico de vendas', destino: '/historico-vendas', Icone: Receipt },
  { texto: 'Histórico de produtos', destino: '/historico-produtos', Icone: Package },
  { texto: 'Sacar', destino: '/sacar', Icone: Wallet },
  { texto: 'Planos', destino: '/planos', Icone: BadgeCheck },
  { texto: 'Segurança', destino: '/dispositivos-feirante', Icone: ShieldCheck },
];

export function NavbarF() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { perfil, primeiroNome } = usePerfil('feirante');
  const { temAcesso } = usePlano();
  const { pathname } = useLocation();
  const naAreaFinanceira = CAMINHOS_FINANCEIRO.includes(pathname);

  function fecharMenu() {
    setMenuAberto(false);
  }

  // Links sem recurso aparecem liberados para todos; os outros dependem do plano.
  function linkBloqueado(link) {
    return link.recurso && !temAcesso(link.recurso);
  }

  // "Financeiro" também fica marcado nas páginas de Gastos e Planilhas.
  function classeDoLink(link, isActive) {
    if (isActive || (link.destino === '/financeiro' && naAreaFinanceira)) {
      return styles.linkAtivo;
    }

    return styles.linkNav;
  }

  return (
    <header className={styles.navbar}>
      <Link to="/homeF" className={styles.logo} aria-label="Home do feirante" onClick={fecharMenu}>
        <img src={logo} alt="Logo Xepa+" className={styles.iconeLogo} />
      </Link>

      <nav
        className={`${styles.navLinks} ${menuAberto ? styles.menuAberto : ''}`}
        aria-label="Navegação do feirante"
      >
        {links.map((link) => (
          <NavLink
            key={link.destino}
            to={link.destino}
            end
            onClick={fecharMenu}
            className={(estado) => classeDoLink(link, estado.isActive)}
          >
            {link.texto}
            {linkBloqueado(link) && (
              <Lock
                size={14}
                className={styles.iconeBloqueio}
                aria-label="bloqueado no seu plano"
              />
            )}
          </NavLink>
        ))}

        <Link
          to="/perfil-feirante"
          className={`${styles.perfil} ${styles.perfilMenu}`}
          onClick={fecharMenu}
        >
          <FotoPerfil nome={perfil.nome} foto={perfil.foto} />
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
        <MenuConta nome={primeiroNome} itens={itensConta} className={styles.perfil}>
          <FotoPerfil nome={perfil.nome} foto={perfil.foto} />
          <span className={styles.nomeUsuario}>{primeiroNome}</span>
        </MenuConta>

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

export default NavbarF;
