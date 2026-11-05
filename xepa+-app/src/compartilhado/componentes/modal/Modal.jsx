import { useEffect, useId } from 'react';
import { X } from 'lucide-react';
import styles from './Modal.module.css';

// Janela usada por todos os pop-ups do projeto: fecha no X, no Esc e ao clicar fora.
// classeFundo e classeJanela são opcionais: permitem ajustar o fundo e a janela em uma tela específica.
function Modal({ titulo, descricao, aoFechar, classeFundo = '', classeJanela = '', children }) {
  const idTitulo = useId();

  useEffect(() => {
    function aoApertarTecla(evento) {
      if (evento.key === 'Escape') aoFechar();
    }

    window.addEventListener('keydown', aoApertarTecla);
    return () => window.removeEventListener('keydown', aoApertarTecla);
  }, [aoFechar]);

  // Só fecha quando o clique acontece no fundo, fora da janela.
  function aoClicarNoFundo(evento) {
    if (evento.target === evento.currentTarget) {
      aoFechar();
    }
  }

  return (
    <div className={`${styles.fundo} ${classeFundo}`} onClick={aoClicarNoFundo}>
      <div
        className={`${styles.modal} ${classeJanela}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
      >
        <header className={styles.topo}>
          <h2 id={idTitulo}>{titulo}</h2>
          <button type="button" className={styles.fechar} aria-label="Fechar" onClick={aoFechar}>
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className={styles.corpo}>
          {descricao && <p className={styles.descricao}>{descricao}</p>}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
