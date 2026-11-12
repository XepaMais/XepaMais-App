import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Styles from '@/modulos/feirante/paginas/chat-ia/estilos/chatIA.module.css';
import IA from '@/assets/imagens/usuario/ia.png';
import baseConhecimento from '@/modulos/feirante/paginas/chat-ia/xepa-base-conhecimento.md?raw';

// Lê a chave do .env do Vite
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const persona = `## PERSONA E PAPEL
Você é a Xepinha, assistente virtual oficial da plataforma Xepa+.
Você conversa com feirantes assinantes dos planos Crescer ou Pro.
Seu papel é orientá-los de forma prática no uso da plataforma, na gestão do negócio e no combate ao desperdício, com ênfase na gestão financeira.

## TOM DE VOZ
- Amigável, prático, acolhedor e direto.
- Use linguagem simples e acessível, adequada ao dia a dia da feira.
- Mantenha respostas curtas e objetivas.

## ESCOPO DE ATUAÇÃO
1. Navegação no Xepa+: recursos, funcionalidades e erros no aplicativo.
2. Dia a dia da feira: organização da banca, ofertas e combate ao desperdício.
3. Gestão financeira: vendas, compras, receitas, despesas, precificação, taxas e lucro.

## REGRAS E RESTRIÇÕES
- Fonte única: sobre o Xepa+, responda somente com base na BASE DE CONHECIMENTO abaixo. Nunca invente telas, botões, valores ou regras. Se a informação não estiver lá, diga que não sabe e indique o suporte.
- Respostas diretas: responda exatamente ao que foi perguntado, sem sugestões extras.
- Perguntas: só faça uma pergunta quando for indispensável para responder corretamente.
- Passo a passo: para dúvidas sobre o sistema ou finanças, use passos curtos numerados (1., 2., 3.).
- Fora de escopo: se o assunto não for feira, Xepa+ ou sustentabilidade alimentar, redirecione gentilmente para esses temas.
- Texto puro: não use Markdown (sem **negrito**, # títulos ou listas com *). Use apenas texto simples, quebras de linha e números para os passos.`;

const systemInstruction = `${persona}

## BASE DE CONHECIMENTO
${baseConhecimento}`;

// Modelo principal primeiro, reserva depois
const MODELOS = ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
const TENTATIVAS_POR_MODELO = 3;

const esperar = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Envia a mensagem tentando de novo em caso de sobrecarga (503) ou limite (429)
// e, se o modelo principal continuar fora, passa para o reserva.
async function gerarResposta(history, textoUsuario) {
  let ultimoErro;

  for (const nome of MODELOS) {
    const model = genAI.getGenerativeModel({ model: nome, systemInstruction });

    for (let tentativa = 1; tentativa <= TENTATIVAS_POR_MODELO; tentativa++) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessage(textoUsuario);
        return result.response.text();
      } catch (erro) {
        ultimoErro = erro;
        const temporario = erro?.status === 503 || erro?.status === 429;
        if (!temporario) throw erro; // erro de verdade (chave, requisição): não adianta repetir

        console.warn(`${nome} indisponível (tentativa ${tentativa}/${TENTATIVAS_POR_MODELO})`);
        if (tentativa < TENTATIVAS_POR_MODELO) {
          await esperar(1000 * 2 ** (tentativa - 1)); // espera 1s, depois 2s
        }
      }
    }
  }

  throw ultimoErro;
}

function Chat2() {
  const [mensagens, setMensagens] = useState([
    {
      id: 1,
      remetente: 'ia',
      texto: 'Olá! Eu sou a Xepinha, sua assistente no Xepa+. Como posso te ajudar hoje?',
    },
  ]);
  const [inputTexto, setInputTexto] = useState('');
  const [carregando, setCarregando] = useState(false);
  const chatBottomRef = useRef(null);

  // Rola até a última mensagem sempre que chega uma nova
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, carregando]);

  const handleEnviarMensagem = async (e) => {
    e.preventDefault();
    if (!inputTexto.trim() || carregando) return;

    const textoUsuario = inputTexto.trim();
    setInputTexto('');

    const novaMensagemUsuario = {
      id: Date.now(),
      remetente: 'user',
      texto: textoUsuario,
    };

    setMensagens((prev) => [...prev, novaMensagemUsuario]);
    setCarregando(true);

    try {
      // A saudação inicial fica de fora: o histórico do Gemini precisa começar pelo usuário
      const historicoParaAPI = mensagens.filter((msg) => msg.id !== 1);

      const history = historicoParaAPI.map((msg) => ({
        role: msg.remetente === 'user' ? 'user' : 'model',
        parts: [{ text: msg.texto }],
      }));

      const respostaIA = await gerarResposta(history, textoUsuario);

      setMensagens((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          remetente: 'ia',
          texto: respostaIA,
        },
      ]);
    } catch (error) {
      console.error('Erro na API do Gemini:', error);

      const sobrecarga = error?.status === 503 || error?.status === 429;
      const textoErro = sobrecarga
        ? 'Estou com muitas conversas agora. Tente de novo em alguns segundos.'
        : 'Ops! Tive um problema ao processar sua resposta. Tente novamente em instantes.';

      setMensagens((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          remetente: 'ia',
          texto: textoErro,
        },
      ]);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <section className={Styles.chatContainer}>
      <div className={Styles.chatTopo}>
        <button type="button" className={Styles.btnSair}>
          Sair da conversa
        </button>
      </div>

      <div className={Styles.chatPerfil}>
        <img src={IA} alt="Foto de perfil da Xepinha" className={Styles.profileAvatar} />
        <h2 className={Styles.profileName}>Xepinha</h2>
      </div>

      <div className={Styles.chatMessages}>
        {mensagens.map((msg) => (
          <div
            key={msg.id}
            className={msg.remetente === 'user' ? Styles.messageSent : Styles.messageReceived}
          >
            <p>{msg.texto}</p>
          </div>
        ))}

        {carregando && (
          <div className={Styles.messageReceived}>
            <p>Xepinha está digitando...</p>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      <form className={Styles.chatInputForm} onSubmit={handleEnviarMensagem}>
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className={Styles.chatInput}
          value={inputTexto}
          onChange={(e) => setInputTexto(e.target.value)}
          disabled={carregando}
        />

        <button type="submit" className={Styles.btnEnviar} disabled={carregando}>
          ↗
        </button>
      </form>
    </section>
  );
}

export default Chat2;
