import { Link } from 'react-router-dom';

const EMAIL_CONTATO = 'xepamais8@gmail.com';

// Corpo comum dos Termos de uso e das Diretrizes de Privacidade:
// índice com links para cada seção + texto numerado.
// Cada seção: { id, titulo, paragrafos?: string[], itens?: string[] }
// "Styles" vem da página que usa o componente (cada uma tem o seu CSS em estilos/).
function DocumentoLegal({ atualizadoEm, secoes, estilos: Styles }) {
  function irParaSecao(evento, id) {
    evento.preventDefault();
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }

  return (
    <section className={Styles.secao}>
      <div className={Styles.documento}>
        <p className={Styles.atualizacao}>Última atualização: {atualizadoEm}</p>

        <nav className={Styles.indice} aria-label="Índice">
          <h2>Nesta página</h2>
          <ol>
            {secoes.map((secao) => (
              <li key={secao.id}>
                <a href={`#${secao.id}`} onClick={(evento) => irParaSecao(evento, secao.id)}>
                  {secao.titulo}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {secoes.map((secao, indice) => (
          <article key={secao.id} id={secao.id} className={Styles.clausula}>
            <h2>
              {indice + 1}. {secao.titulo}
            </h2>
            {secao.paragrafos?.map((paragrafo) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
            {secao.itens && (
              <ul>
                {secao.itens.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}

        <aside className={Styles.contatoLegal}>
          <h2>Ficou com alguma dúvida?</h2>
          <p>
            Escreva para <a href={`mailto:${EMAIL_CONTATO}`}>{EMAIL_CONTATO}</a> ou acesse a nossa{' '}
            <Link to="/suporte">página de suporte</Link>.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default DocumentoLegal;
