// Card de conversa usado na lista do chat e no quadro de notificações da Home do feirante.
import Styles from '@/modulos/feirante/paginas/historico-chat/estilos/ChatHist.module.css';
import { assuntoDaConversa, mensagensNaoLidas } from '@/compartilhado/servicos/conversas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';

const CORES_AVATAR = ['avatarVerde', 'avatarLaranja', 'avatarAmarelo'];

// A cor depende só do nome: a mesma pessoa tem a mesma bolinha em qualquer tela.
export function corDoAvatar(nome = '') {
  let soma = 0;

  for (const letra of nome) {
    soma += letra.charCodeAt(0);
  }

  return Styles[CORES_AVATAR[soma % CORES_AVATAR.length]];
}

export function AvatarConversa({ nome, className = '' }) {
  return (
    <span className={`${Styles.avatarContato} ${corDoAvatar(nome)} ${className}`} aria-hidden="true">
      {nome.charAt(0).toUpperCase()}
    </span>
  );
}

function mesmoDia(a, b) {
  return a.toDateString() === b.toDateString();
}

// Hoje: 16:50 · Ontem · 07/10
export function horarioCurto(data) {
  if (!data) return '';

  const momento = new Date(data);
  const hoje = new Date();
  const ontem = new Date();
  ontem.setDate(hoje.getDate() - 1);

  if (mesmoDia(momento, hoje)) {
    return momento.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  }

  if (mesmoDia(momento, ontem)) return 'Ontem';

  return momento.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
}

export function horarioMensagem(data) {
  const momento = new Date(data);
  const hora = momento.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

  return mesmoDia(momento, new Date()) ? hora : `${horarioCurto(data)} ${hora}`;
}

// perfil: quem está vendo ('feirante' ou 'consumidor'). nome: nome do outro lado da conversa.
function ItemConversa({ conversa, perfil, nome, ativo = false, onClick }) {
  const ultima = conversa.mensagens.at(-1);
  const naoLidas = mensagensNaoLidas(conversa, perfil).length;

  return (
    <button
      type="button"
      className={`${Styles.itemContato} ${ativo ? Styles.contatoAtivo : ''} ${naoLidas ? Styles.contatoNaoLido : ''}`}
      onClick={onClick}
      aria-pressed={ativo}
      aria-label={`Conversa com ${nome}, ${assuntoDaConversa(conversa)}`}
    >
      <AvatarConversa nome={nome} />
      <span className={Styles.infoContato}>
        <span className={Styles.linhaContato}>
          <strong className={Styles.nomeContato}>{nome}</strong>
          <time className={Styles.horarioContato}>
            {horarioCurto(ultima?.data || conversa.criadaEm)}
          </time>
        </span>
        <span className={Styles.pedidoContato}>
          {assuntoDaConversa(conversa)}
          {conversa.pedido && ` • ${formatarMoeda(conversa.pedido.total)}`}
        </span>
        <span className={Styles.linhaContato}>
          <span className={Styles.msgContato}>
            {ultima ? ultima.texto : 'Nenhuma mensagem ainda'}
          </span>
          {naoLidas > 0 && (
            <span
              className={Styles.contadorNaoLidas}
              aria-label={`${naoLidas} ${naoLidas === 1 ? 'mensagem nova' : 'mensagens novas'}`}
            >
              {naoLidas}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

export default ItemConversa;
