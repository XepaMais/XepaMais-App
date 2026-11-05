import Styles from '@/modulos/feirante/paginas/historico-chat/estilos/ChatHist.module.css'; // Se for usar imagens reais, importe-as ou use URLs. Aqui usarei placeholders.

function ChatHist() {
  // 1. Simulação do que virá do Back-end (Lista de conversas)
  const contatosMock = [
    { id: 1, nome: 'Carneiro', ultimaMsg: 'Opa, tudo bem?' },
    { id: 2, nome: 'Igor', ultimaMsg: 'oiiiii cade voce' },
    { id: 3, nome: 'Fernanda', ultimaMsg: 'VAI CORINTHIANS!' },
    { id: 4, nome: 'Murilo', ultimaMsg: 'Olá Boa tarde, tudo bem? Hoje terá xepas?' },
    { id: 5, nome: 'Jamilly', ultimaMsg: 'Bom dia, odiei a xepa melhorem' },
    { id: 6, nome: 'Henrique', ultimaMsg: 'Salve chefia, hoje você estara na feira?' },
  ];

  // Simulação das mensagens da conversa aberta
  const mensagensMock = [
    { id: 1, texto: 'Texto da mensagem recebida simulando a dúvida do cliente.', tipo: 'recebida' },
    { id: 2, texto: 'Texto da mensagem enviada como resposta ao cliente.', tipo: 'enviada' },
  ];

  return (
    <div className={Styles.paginaChat}>
      {/* --- PARTE DE CIMA (Busca) --- */}
      <section className={Styles.cabecalhoChat}>
        <h1 className={Styles.tituloHist}>Conversas</h1>
        <div className={Styles.containerBusca}>
          <label htmlFor="busca" className={Styles.labelBusca}>
            Busca
          </label>
          <input type="text" id="busca" className={Styles.inputBusca} placeholder="Pesquisar..." />
          <button type="submit" className={Styles.btnBusca}>
            🔍
          </button>
        </div>
      </section>

      {/* --- PARTE DE BAIXO (Quadro Verde Principal) --- */}
      <section className={Styles.quadroChat}>
        {/* LADO ESQUERDO: Lista de Contatos */}
        <aside className={Styles.barraLateral}>
          <div className={Styles.tituloLateral}>
            <h2>Conversas</h2>
          </div>

          <div className={Styles.listaContatos}>
            {/* O .map() percorre a lista do back-end e cria um bloco para cada contato */}
            {contatosMock.map((contato) => (
              <div key={contato.id} className={Styles.itemContato}>
                <div className={Styles.avatarContato}></div>
                <div className={Styles.infoContato}>
                  <span className={Styles.nomeContato}>{contato.nome}</span>
                  <span className={Styles.msgContato}>{contato.ultimaMsg}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* LADO DIREITO: Conversa Ativa */}
        <main className={Styles.areaConversa}>
          <div className={Styles.cabecalhoConversa}>
            <div className={Styles.fotoAtiva}></div>
            <h2 className={Styles.nomeAtivo}>Daniele Ribeiro</h2>
          </div>

          <div className={Styles.areaMensagens}>
            {mensagensMock.map((msg) => (
              <div
                key={msg.id}
                className={msg.tipo === 'recebida' ? Styles.balaoRecebido : Styles.balaoEnviado}
              >
                {msg.texto}
              </div>
            ))}
          </div>

          <div className={Styles.areaInput}>
            <input type="text" className={Styles.inputMensagem} />
            <button className={Styles.btnEnviar}>↗</button>
          </div>
        </main>
      </section>
    </div>
  );
}

export default ChatHist;
