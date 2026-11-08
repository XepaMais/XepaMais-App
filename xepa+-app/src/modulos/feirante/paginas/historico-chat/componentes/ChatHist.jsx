import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, MessageCircle, PackageCheck } from 'lucide-react';
import Styles from '@/modulos/feirante/paginas/historico-chat/estilos/ChatHist.module.css';
import useConversas from '@/compartilhado/hooks/useConversas';
import {
  enviarMensagem,
  finalizarConversa,
  marcarComoLida,
  mensagensNaoLidas,
  STATUS_CONVERSA,
} from '@/compartilhado/servicos/conversas';
import { formatarDataHora, formatarMoeda } from '@/compartilhado/servicos/pedidos';
import ItemConversa, {
  AvatarConversa,
  horarioMensagem,
} from '@/modulos/feirante/paginas/historico-chat/componentes/ItemConversa';

const ABAS = [
  { id: STATUS_CONVERSA.recente, titulo: 'Recentes' },
  { id: STATUS_CONVERSA.finalizada, titulo: 'Finalizadas' },
];

const VAZIO = {
  [STATUS_CONVERSA.recente]: {
    titulo: 'Você não tem conversas recentes',
    texto: 'Assim que uma conversa for iniciada ela será mostrada nessa tela.',
  },
  [STATUS_CONVERSA.finalizada]: {
    titulo: 'Você não tem conversas finalizadas',
    texto: 'Quando um pedido for retirado, a conversa aparecerá aqui.',
  },
};

function ChatHist({ perfil = 'feirante' }) {
  const ehFeirante = perfil === 'feirante';
  const location = useLocation();
  const conversaPedida = location.state?.conversa;

  const todasConversas = useConversas();
  // O consumidor só vê as conversas dos próprios pedidos (as de demonstração são do feirante).
  const conversas = useMemo(
    () => (ehFeirante ? todasConversas : todasConversas.filter((conversa) => !conversa.demo)),
    [ehFeirante, todasConversas],
  );

  const [abaEscolhida, setAba] = useState(STATUS_CONVERSA.recente);
  const [contatoAtivo, setContatoAtivo] = useState(conversaPedida || null);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [mobileConversaAberta, setMobileConversaAberta] = useState(Boolean(conversaPedida));
  const [confirmandoRetirada, setConfirmandoRetirada] = useState(false);
  const areaMensagens = useRef(null);

  // A aba acompanha a conversa aberta: se ela for finalizada, vai junto para "Finalizadas".
  const statusSelecionada = conversas.find(({ id }) => id === contatoAtivo)?.status;
  const aba = statusSelecionada || abaEscolhida;

  const nomeDoContato = (conversa) => (ehFeirante ? conversa.consumidor : conversa.feirante);

  const conversasDaAba = conversas.filter(({ status }) => status === aba);
  const contatosFiltrados = conversasDaAba.filter((conversa) => {
    const termo = busca.trim().toLowerCase();
    const textoBusca = `${nomeDoContato(conversa)} ${conversa.pedido.numero}`.toLowerCase();
    return textoBusca.includes(termo);
  });

  // Sem seleção válida na aba, abre a primeira conversa dela.
  const conversa = conversasDaAba.find(({ id }) => id === contatoAtivo) || conversasDaAba[0];
  const finalizada = conversa?.status === STATUS_CONVERSA.finalizada;
  const totalMensagens = conversa?.mensagens.length;

  // Rola só a área das mensagens (não a página) até a última mensagem.
  useEffect(() => {
    const area = areaMensagens.current;
    if (area) area.scrollTop = area.scrollHeight;
  }, [conversa?.id, totalMensagens]);

  // Conversa aberta na tela = mensagens lidas (some da notificação da Home).
  const naoLidasAbertas = conversa ? mensagensNaoLidas(conversa, perfil).length : 0;
  const conversaVisivel = mobileConversaAberta || !window.matchMedia('(max-width: 760px)').matches;
  useEffect(() => {
    if (conversa && naoLidasAbertas > 0 && conversaVisivel) {
      marcarComoLida(conversa.id, perfil);
    }
  }, [conversa, naoLidasAbertas, conversaVisivel, perfil]);

  function trocarAba(novaAba) {
    setAba(novaAba);
    setContatoAtivo(null);
    setConfirmandoRetirada(false);
    setMobileConversaAberta(false);
  }

  function abrirConversa(id) {
    setContatoAtivo(id);
    setConfirmandoRetirada(false);
    setMobileConversaAberta(true);
  }

  function enviar(event) {
    event.preventDefault();
    const texto = mensagem.trim();

    if (!texto || !conversa || finalizada) return;

    enviarMensagem(conversa.id, perfil, texto);
    setMensagem('');
  }

  // A conversa vai para "Finalizadas" e continua aberta, agora só para leitura.
  function confirmarRetirada() {
    finalizarConversa(conversa.id);
    setContatoAtivo(conversa.id);
    setConfirmandoRetirada(false);
    setMensagem('');
  }

  return (
    <main className={Styles.paginaChat}>
      <header className={Styles.cabecalhoPagina}>
        <h1>Conversas</h1>
        <p>
          {ehFeirante
            ? 'Converse com seus clientes sobre os pedidos.'
            : 'Fale com o vendedor sobre os seus pedidos.'}
        </p>
      </header>

      <section
        className={`${Styles.quadroChat} ${mobileConversaAberta && conversa ? Styles.conversaMobileAtiva : ''}`}
        aria-label="Central de conversas"
      >
        <aside className={Styles.barraLateral} aria-label="Lista de conversas">
          <div className={Styles.abas} role="tablist" aria-label="Tipo de conversa">
            {ABAS.map(({ id, titulo }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={aba === id}
                className={`${Styles.aba} ${aba === id ? Styles.abaAtiva : ''}`}
                onClick={() => trocarAba(id)}
              >
                {titulo}
                <span className={Styles.contadorAba}>
                  {conversas.filter(({ status }) => status === id).length}
                </span>
              </button>
            ))}
          </div>

          <label className={Styles.containerBusca} htmlFor="busca-contatos">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="m16 16 4 4" />
            </svg>
            <input
              id="busca-contatos"
              type="search"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
              placeholder="Buscar por nome ou nº do pedido..."
            />
          </label>

          <div className={Styles.listaContatos}>
            {contatosFiltrados.map((item) => (
              <ItemConversa
                key={item.id}
                conversa={item}
                perfil={perfil}
                nome={nomeDoContato(item)}
                ativo={item.id === conversa?.id}
                onClick={() => abrirConversa(item.id)}
              />
            ))}

            {conversasDaAba.length > 0 && contatosFiltrados.length === 0 && (
              <p className={Styles.semContatos}>Nenhuma conversa encontrada.</p>
            )}

            {conversasDaAba.length === 0 && (
              <div className={Styles.listaVazia}>
                <span className={Styles.iconeVazio} aria-hidden="true">
                  {aba === STATUS_CONVERSA.recente ? <MessageCircle /> : <CheckCircle2 />}
                </span>
                <strong>{VAZIO[aba].titulo}</strong>
                <p>{VAZIO[aba].texto}</p>
              </div>
            )}
          </div>
        </aside>

        {conversa ? (
          <section className={Styles.areaConversa} aria-label={`Conversa com ${nomeDoContato(conversa)}`}>
            <header className={Styles.cabecalhoConversa}>
              <button
                className={Styles.botaoVoltar}
                type="button"
                onClick={() => setMobileConversaAberta(false)}
                aria-label="Voltar para a lista de conversas"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <AvatarConversa nome={nomeDoContato(conversa)} className={Styles.avatarAtivo} />
              <div className={Styles.tituloConversa}>
                <h2 className={Styles.nomeAtivo}>{nomeDoContato(conversa)}</h2>
                <span>Pedido nº {conversa.pedido.numero}</span>
              </div>

              {ehFeirante && !finalizada && (
                <div className={Styles.acaoRetirada}>
                  {confirmandoRetirada ? (
                    <>
                      <span>Confirmar retirada?</span>
                      <button type="button" className={Styles.botaoConfirmar} onClick={confirmarRetirada}>
                        Sim
                      </button>
                      <button
                        type="button"
                        className={Styles.botaoCancelar}
                        onClick={() => setConfirmandoRetirada(false)}
                      >
                        Não
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className={Styles.botaoRetirado}
                      onClick={() => setConfirmandoRetirada(true)}
                    >
                      <PackageCheck aria-hidden="true" />
                      Pedido retirado
                    </button>
                  )}
                </div>
              )}
            </header>

            <div className={Styles.areaMensagens} aria-live="polite" ref={areaMensagens}>
              <article className={Styles.resumoPedido} aria-label="Resumo do pedido">
                <header>
                  <strong>Pedido nº {conversa.pedido.numero}</strong>
                  <span className={finalizada ? Styles.statusRetirado : Styles.statusAguardando}>
                    {finalizada ? 'Retirado' : 'Aguardando retirada'}
                  </span>
                </header>
                <dl>
                  <div>
                    <dt>Comprado em</dt>
                    <dd>{formatarDataHora(conversa.pedido.data)}</dd>
                  </div>
                  <div>
                    <dt>Total</dt>
                    <dd>{formatarMoeda(conversa.pedido.total)}</dd>
                  </div>
                  {conversa.pedido.retirada && (
                    <div>
                      <dt>Retirada</dt>
                      <dd>{conversa.pedido.retirada}</dd>
                    </div>
                  )}
                </dl>
                <ul>
                  {conversa.pedido.itens.map((item) => (
                    <li key={item.nome}>
                      <span>
                        {item.quantidade}x {item.nome}
                      </span>
                      <span>{formatarMoeda(item.preco * item.quantidade)}</span>
                    </li>
                  ))}
                </ul>
              </article>

              {conversa.mensagens.map((msg) => (msg.autor === 'sistema' ? (
                <p className={Styles.avisoSistema} key={msg.id}>
                  {msg.texto} · {horarioMensagem(msg.data)}
                </p>
              ) : (
                <div
                  key={msg.id}
                  className={`${Styles.linhaMensagem} ${msg.autor === perfil ? Styles.mensagemMinha : ''}`}
                >
                  <div className={Styles.balao}>
                    <span>{msg.texto}</span>
                    <time>{horarioMensagem(msg.data)}</time>
                  </div>
                </div>
              )))}

              {finalizada && (
                <p className={Styles.avisoSistema}>
                  Pedido retirado em {formatarDataHora(conversa.finalizadaEm)}. Conversa finalizada.
                </p>
              )}
            </div>

            {finalizada ? (
              <div className={Styles.conversaEncerrada}>
                <CheckCircle2 aria-hidden="true" />
                Esta conversa foi finalizada e não aceita novas mensagens.
              </div>
            ) : (
              <form className={Styles.areaInput} onSubmit={enviar}>
                <input
                  aria-label={`Escreva uma mensagem para ${nomeDoContato(conversa)}`}
                  type="text"
                  value={mensagem}
                  onChange={(event) => setMensagem(event.target.value)}
                  placeholder="Digite sua mensagem..."
                />
                <button
                  className={Styles.btnEnviar}
                  type="submit"
                  disabled={!mensagem.trim()}
                  aria-label="Enviar mensagem"
                >
                  ↗
                </button>
              </form>
            )}
          </section>
        ) : (
          <section className={Styles.conversaVazia}>
            {conversasDaAba.length
              ? 'Selecione uma conversa para abrir.'
              : VAZIO[aba].texto}
          </section>
        )}
      </section>
    </main>
  );
}

export default ChatHist;
