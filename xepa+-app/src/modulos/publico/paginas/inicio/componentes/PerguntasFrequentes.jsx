import { useState } from 'react';
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

function PerguntasFrequentes() {
  const [perguntaAberta, setPerguntaAberta] = useState(-1);

  return (
    <section className="perguntas-frequentes" id="perguntas">
      <div className="perguntas-conteudo">
        <h2>Questões? Veja aqui.</h2>
        <p className="perguntas-descricao">Tire suas dúvidas sobre o funcionamento do Xepa+.</p>

        <div className="perguntas-lista">
          {perguntas.map((item, indice) => {
            const aberta = perguntaAberta === indice;

            return (
              <article
                className={aberta ? 'pergunta-item pergunta-item--aberta' : 'pergunta-item'}
                key={item.pergunta}
              >
                <button
                  className="pergunta-botao"
                  type="button"
                  aria-expanded={aberta}
                  onClick={() => setPerguntaAberta(aberta ? -1 : indice)}
                >
                  <span>{item.pergunta}</span>
                  <span className="pergunta-icone">{aberta ? '−' : '+'}</span>
                </button>

                {aberta && (
                  <div className="pergunta-resposta">
                    <p>{item.resposta}</p>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default PerguntasFrequentes;
