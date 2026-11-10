import Styles from '@/modulos/feirante/paginas/chat-ia/estilos/chatIA.module.css';
import IA from '@/assets/imagens/marca/ia.png';

function Chat2() {
  return (
    <section className={Styles.chatContainer}>
      <div className={Styles.chatTopo}>
        <button type="button" className={Styles.btnSair}>
          Sair da conversa
        </button>
      </div>

      <div className={Styles.chatPerfil}>
        <img src={IA} alt="Foto de perfil" className={Styles.profileAvatar} />
        <h2 className={Styles.profileName}>Xepinha</h2>
      </div>

      <div className={Styles.chatMessages}>
        <div className={Styles.messageReceived}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit esse quas
            mollitia eos harum laboriosam reiciendis tempora itaque deserunt, voluptatem eum impedit
            rerum, at quasi nemo, dolore necessitatibus cumque.
          </p>
        </div>

        <div className={Styles.messageReceived}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum dolor sit luptates
            quasi officiis recusandae incidunt nam totam ducimus.
          </p>
        </div>

        <div className={Styles.messageSent}>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam suscipit esse quas
            mollitia eos harum laboriosam reiciendis tempora itaque deserunt, voluptatem eum impedit
            rerum, at quasi nemo, dolore necessitatibus cumque.
          </p>
        </div>
      </div>

      <form className={Styles.chatInputForm} onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Digite sua mensagem..." className={Styles.chatInput} />

        <button type="submit" className={Styles.btnEnviar}>
          ↗
        </button>
      </form>
    </section>
  );
}

export default Chat2;
