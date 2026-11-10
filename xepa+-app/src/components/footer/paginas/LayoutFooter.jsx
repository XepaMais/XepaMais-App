import { useEffect } from 'react';
import Header from '@/modulos/publico/paginas/inicio/componentes/Header.jsx';
import Styles from './paginas.module.css';

// Estrutura comum das páginas abertas pelo rodapé: cabeçalho público + faixa de título.
function LayoutFooter({ etiqueta, titulo, descricao, children }) {
  // Sempre começa do topo (html e body têm overflow-x: hidden, então zeramos os três).
  useEffect(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  return (
    <>
      <Header />

      <main className={Styles.pagina}>
        <section className={Styles.hero}>
          <div className={Styles.heroConteudo}>
            {etiqueta && <span className={Styles.etiqueta}>{etiqueta}</span>}
            <h1>{titulo}</h1>
            {descricao && <p>{descricao}</p>}
          </div>
        </section>

        {children}
      </main>
    </>
  );
}

export default LayoutFooter;
