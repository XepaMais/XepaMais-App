import Styles from '@/modulos/usuario/paginas/chat-feirante/componentes/chat.module.css';
import Perfil from '@/assets/imagens/usuario/perfil.png';

function Chat() {
  return (
    <section className={Styles.chatContainer}>
      <header className={Styles.chatHeader}>
        <button type="button" className={Styles.btnSair}>
          Sair da conversa
        </button>
      </header>

      <div className={Styles.chatPerfil}>
        <img src={Perfil} alt="Foto de perfil" className={Styles.profileAvatar} />
        <h2 className={Styles.profileName}>Henrique Rodrigues</h2>
      </div>

      <div className={Styles.chatMessages}>
        <div className={Styles.messageReceived}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
        </div>

        <div className={Styles.messageSent}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
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

export default Chat;
