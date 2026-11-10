import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Mail, Sparkles } from 'lucide-react';
import LayoutFooter from './LayoutFooter';
import Styles from './paginas.module.css';

const CANAIS = [
  {
    icone: Mail,
    titulo: 'Suporte por e-mail',
    texto: 'Envie sua dúvida ou problema para a nossa equipe:',
    email: 'xepamais8@gmail.com',
  },
  {
    icone: Sparkles,
    titulo: 'Xep.AI',
    texto: 'A assistente virtual responde dúvidas rápidas sobre a plataforma a qualquer hora.',
  },
  {
    icone: Clock,
    titulo: 'Horário de atendimento',
    texto: 'Segunda a sábado, das 8h às 18h. Respondemos o formulário em até 2 dias úteis.',
  },
];

const PERGUNTAS = [
  {
    pergunta: 'Esqueci minha senha. O que faço?',
    resposta: 'Na tela de login, escolha a opção de recuperar senha e siga as instruções enviadas.',
  },
  {
    pergunta: 'Como altero o plano da minha barraca?',
    resposta:
      'Acesse o menu do feirante e abra a página Planos. Lá você pode escolher outro plano quando quiser.',
  },
  {
    pergunta: 'Meu pedido não apareceu no histórico.',
    resposta:
      'Atualize a página e confira o histórico de pedidos. Se o problema continuar, envie uma mensagem pelo formulário abaixo.',
  },
  {
    pergunta: 'Como cadastro uma nova feira?',
    resposta:
      'Na área do feirante, abra "Adicionar feira", informe o endereço e os dias de funcionamento.',
  },
];

function Suporte() {
  const [enviado, setEnviado] = useState(false);

  function enviar(evento) {
    evento.preventDefault();
    // Ainda não existe um serviço de suporte; apenas confirmamos o envio na tela.
    evento.target.reset();
    setEnviado(true);
  }

  return (
    <LayoutFooter
      etiqueta="Contato e suporte"
      titulo="Como podemos ajudar?"
      descricao="Encontre respostas rápidas ou fale com a equipe do Xepa+. Estamos aqui para feirantes e consumidores."
    >
      <section className={Styles.secao}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>Canais de atendimento</h2>
          <p className={Styles.subtituloSecao}>Escolha a forma mais prática para você.</p>

          <div className={Styles.grade}>
            {CANAIS.map(({ icone: Icone, titulo, texto, email }) => (
              <article key={titulo} className={Styles.card}>
                <span className={Styles.icone}>
                  <Icone size={26} aria-hidden="true" />
                </span>
                <h3>{titulo}</h3>
                <p>{texto}</p>
                {email && (
                  <a className={Styles.email} href={`mailto:${email}`}>
                    {email}
                  </a>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${Styles.secao} ${Styles.secaoCreme}`}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>Dúvidas frequentes</h2>
          <p className={Styles.subtituloSecao}>Talvez a sua resposta já esteja aqui.</p>

          <div className={Styles.perguntas}>
            {PERGUNTAS.map((item) => (
              <details key={item.pergunta}>
                <summary>{item.pergunta}</summary>
                <p>{item.resposta}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={Styles.secao}>
        <div className={Styles.conteudo}>
          <h2 className={Styles.tituloSecao}>Envie uma mensagem</h2>
          <p className={Styles.subtituloSecao}>
            Conte o que aconteceu e retornamos pelo e-mail informado. Se preferir, escreva direto
            para xepamais8@gmail.com.
          </p>

          <form className={Styles.formulario} onSubmit={enviar}>
            <div className={Styles.linha}>
              <div className={Styles.campo}>
                <label htmlFor="suporte-nome">Nome</label>
                <input id="suporte-nome" name="nome" type="text" autoComplete="name" required />
              </div>
              <div className={Styles.campo}>
                <label htmlFor="suporte-email">E-mail</label>
                <input id="suporte-email" name="email" type="email" autoComplete="email" required />
              </div>
            </div>

            <div className={Styles.campo}>
              <label htmlFor="suporte-perfil">Você é</label>
              <select id="suporte-perfil" name="perfil" defaultValue="" required>
                <option value="" disabled>
                  Selecione
                </option>
                <option value="consumidor">Consumidor</option>
                <option value="feirante">Feirante</option>
              </select>
            </div>

            <div className={Styles.campo}>
              <label htmlFor="suporte-assunto">Assunto</label>
              <input id="suporte-assunto" name="assunto" type="text" required />
            </div>

            <div className={Styles.campo}>
              <label htmlFor="suporte-mensagem">Mensagem</label>
              <textarea id="suporte-mensagem" name="mensagem" required />
            </div>

            {enviado && (
              <p className={Styles.aviso} role="status">
                Mensagem enviada! Nossa equipe responderá em breve.
              </p>
            )}

            <div className={Styles.botoes}>
              <button type="submit" className={Styles.botao}>
                Enviar mensagem
              </button>
              <Link to="/xep-ai" className={Styles.botaoSecundario}>
                Conhecer a Xep.AI
              </Link>
            </div>
          </form>
        </div>
      </section>
    </LayoutFooter>
  );
}

export default Suporte;
