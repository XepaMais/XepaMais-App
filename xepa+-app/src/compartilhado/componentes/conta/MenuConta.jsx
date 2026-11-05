import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import styles from './MenuConta.module.css';

// Menu que abre ao clicar no nome, no cabeçalho do usuário e do feirante.
function MenuConta({ nome, itens, className = '', children }) {
  const [aberto, setAberto] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!aberto) return;

    function aoClicarFora(evento) {
      if (!menuRef.current.contains(evento.target)) setAberto(false);
    }

    function aoApertarTecla(evento) {
      if (evento.key === 'Escape') setAberto(false);
    }

    document.addEventListener('mousedown', aoClicarFora);
    document.addEventListener('keydown', aoApertarTecla);

    return () => {
      document.removeEventListener('mousedown', aoClicarFora);
      document.removeEventListener('keydown', aoApertarTecla);
    };
  }, [aberto]);

  function fechar() {
    setAberto(false);
  }

  return (
    <div className={`${styles.menuConta} ${className}`} ref={menuRef}>
      <button
        type="button"
        className={styles.gatilho}
        aria-expanded={aberto}
        onClick={() => setAberto(!aberto)}
      >
        {children}
      </button>

      {aberto && (
        <div className={styles.popup}>
          <p className={styles.saudacao}>Olá, {nome}</p>

          {itens.map((item) => (
            <Link key={item.destino} to={item.destino} className={styles.item} onClick={fechar}>
              <item.Icone size={18} aria-hidden="true" />
              {item.texto}
            </Link>
          ))}

          <Link to="/" className={styles.item} onClick={fechar}>
            <LogOut size={18} aria-hidden="true" />
            Sair
          </Link>
        </div>
      )}
    </div>
  );
}

export default MenuConta;
