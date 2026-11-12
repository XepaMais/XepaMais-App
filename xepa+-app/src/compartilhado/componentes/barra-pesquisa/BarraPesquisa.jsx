import { useId } from 'react';
import styles from './BarraPesquisa.module.css';

function BarraPesquisa({
  valor,
  aoMudar,
  aoBuscar,
  placeholder = 'Buscar...',
  rotulo = 'Buscar',
  mostrarRotulo = false,
  textoBotao = 'Buscar',
  desabilitado = false,
  tipo = 'search',
  inputMode,
  semFormulario = false,
  className = '',
  children,
}) {
  const id = useId();

  function enviar(evento) {
    evento.preventDefault();
    aoBuscar?.(valor);
  }

  const conteudo = (
    <>
      {mostrarRotulo && (
        <label htmlFor={id} className={styles.rotulo}>
          {rotulo}
        </label>
      )}

      <div className={styles.linha}>
        <input
          id={id}
          type={tipo}
          inputMode={inputMode}
          className={styles.campo}
          placeholder={placeholder}
          aria-label={mostrarRotulo ? undefined : rotulo}
          value={valor}
          onChange={(evento) => aoMudar(evento.target.value)}
        />

        <button
          type={semFormulario ? 'button' : 'submit'}
          className={styles.botao}
          disabled={desabilitado}
          onClick={semFormulario ? () => aoBuscar?.(valor) : undefined}
        >
          {textoBotao}
        </button>

        {children}
      </div>
    </>
  );

  if (semFormulario) {
    return <div className={`${styles.barra} ${className}`}>{conteudo}</div>;
  }

  return (
    <form className={`${styles.barra} ${className}`} role="search" onSubmit={enviar}>
      {conteudo}
    </form>
  );
}

export default BarraPesquisa;
