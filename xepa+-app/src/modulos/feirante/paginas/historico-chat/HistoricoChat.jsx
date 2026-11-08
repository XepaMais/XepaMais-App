import ChatHist from '@/modulos/feirante/paginas/historico-chat/componentes/ChatHist';

// perfil: 'feirante' (padrão) ou 'consumidor'.
function ChatFeirante({ perfil = 'feirante' }) {
  return (
    <div>
      <ChatHist perfil={perfil} />
    </div>
  );
}

export default ChatFeirante;
