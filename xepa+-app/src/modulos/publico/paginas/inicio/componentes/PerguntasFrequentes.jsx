import { useState } from 'react';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';
import '@/modulos/publico/paginas/inicio/estilos/PerguntasFrequentes.css';

const perguntas = [
  {
    pergunta: 'Como o feirante pode cadastrar sua banca?',
    resposta:
      'Crie uma conta na plataforma e preencha as informações da sua banca para iniciar o cadastro.',
  },
  {
    pergunta: 'Como posso encontrar feiras próximas?',
    resposta: 'Acesse o mapa de feiras e pesquise pelo bairro ou endereço desejado.',
  },
  {
    pergunta: 'Como funciona a divulgação dos produtos?',
    resposta:
      'Os feirantes podem cadastrar seus produtos para que os usuários conheçam as opções disponíveis.',
  },
  {
    pergunta: 'O que são as xepas?',
    resposta:
      'São produtos que ainda podem ser aproveitados, geralmente comercializados com condições especiais para reduzir o desperdício.',
  },
  {
    pergunta: 'Como posso participar como feirante?',
    resposta:
      'Faça seu cadastro na plataforma e consulte as opções disponíveis para divulgar sua banca.',
  },
  {
    pergunta: 'Preciso pagar para utilizar o Xepa+?',
    resposta:
      'A plataforma pode oferecer um plano gratuito e opções pagas, conforme os recursos disponibilizados em cada plano.',
  },
];

// Duas colunas independentes: abrir uma pergunta não empurra a outra coluna.
const colunas = [
  perguntas.filter((_, indice) => indice % 2 === 0),
  perguntas.filter((_, indice) => indice % 2 === 1),
];

function PerguntasFrequentes() {
  // As duas primeiras perguntas começam abertas, como na referência
  const [abertas, setAbertas] = useState(() => new Set([perguntas[0].pergunta, perguntas[1].pergunta]));

  function alternar(pergunta) {
    setAbertas((atuais) => {
      const novas = new Set(atuais);
      if (novas.has(pergunta)) {
        novas.delete(pergunta);
      } else {
        novas.add(pergunta);
      }
      return novas;
    });
  }

  return (
    <section className="perguntas-frequentes" id="perguntas" aria-labelledby="perguntas-titulo">
      <div className="perguntas-caixa">
        <header className="perguntas-cabecalho">
          <h2 id="perguntas-titulo" data-revelar>
            Perguntas <Rabisco>frequentes</Rabisco>
          </h2>

          <p data-revelar style={{ '--atraso': '0.16s' }}>
            Separamos as dúvidas mais comuns para você entender como o Xepa+ funciona.
          </p>
        </header>

        <div className="perguntas-colunas">
          {colunas.map((coluna, indiceColuna) => (
            <div className="perguntas-coluna" key={indiceColuna}>
              {coluna.map((item, indice) => {
                const aberta = abertas.has(item.pergunta);
                const id = `resposta-${indiceColuna}-${indice}`;

                return (
                  <div
                    key={item.pergunta}
                    data-revelar
                    style={{ '--atraso': `${0.2 + indice * 0.1 + indiceColuna * 0.05}s` }}
                  >
                    <article
                      className={aberta ? 'pergunta-item pergunta-item--aberta' : 'pergunta-item'}
                    >
                      <button
                        className="pergunta-botao"
                        type="button"
                        aria-expanded={aberta}
                        aria-controls={id}
                        onClick={() => alternar(item.pergunta)}
                      >
                        <span>{item.pergunta}</span>
                        <span className="pergunta-sinal" aria-hidden="true" />
                      </button>

                      <div className="pergunta-resposta" id={id} aria-hidden={!aberta}>
                        <div>
                          <p>{item.resposta}</p>
                        </div>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PerguntasFrequentes;
