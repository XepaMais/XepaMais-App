import '@/modulos/publico/paginas/inicio/estilos/FaixaXepa.css';

// Faixa de palavras em carrossel infinito.
// cor: 'verde' (padrão, usada embaixo do vídeo da Home) ou 'laranja'.
export default function FaixaXepa({ palavras, cor = 'verde' }) {
  // Cada grupo repete a lista para a faixa nunca ficar com buraco em telas largas.
  const palavrasDoGrupo = palavras.concat(palavras);

  return (
    <div className={`faixa-xepa faixa-xepa--${cor}`}>
      {/* o 2º grupo é uma cópia só para o loop ficar contínuo */}
      <div className="faixa-xepa__trilha">
        <ul className="faixa-xepa__grupo">
          {palavrasDoGrupo.map((palavra, indice) => (
            <li key={indice} className="faixa-xepa__item">
              {palavra}
            </li>
          ))}
        </ul>

        <ul className="faixa-xepa__grupo" aria-hidden="true">
          {palavrasDoGrupo.map((palavra, indice) => (
            <li key={indice} className="faixa-xepa__item">
              {palavra}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
