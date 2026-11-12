import { carregarPerfil } from '@/compartilhado/servicos/perfil';
import { atualizarStatusPedido, formatarMoeda } from '@/compartilhado/servicos/pedidos';

const CHAVE_CONVERSAS = 'conversasXepa';

export const EVENTO_CONVERSAS = 'conversas-atualizadas';

export const STATUS_CONVERSA = {
  recente: 'recente',
  finalizada: 'finalizada',
};

function minutosAtras(minutos) {
  return new Date(Date.now() - minutos * 60 * 1000).toISOString();
}

// Conversas de exemplo para a área do feirante não começar vazia.
// Não aparecem para o consumidor (demo).
function conversasDemonstracao() {
  const nomeFeirante = carregarPerfil('feirante').nome;

  const demo = (id, consumidor, pedido, mensagens, status = STATUS_CONVERSA.recente) => ({
    id: `demo-${id}`,
    demo: true,
    consumidor,
    feirante: nomeFeirante,
    status,
    criadaEm: pedido.data,
    finalizadaEm: status === STATUS_CONVERSA.finalizada ? mensagens.at(-1)?.data : null,

    // Murilo começa com mensagem não lida, para a notificação aparecer na Home.
    leituras: {
      feirante: id === 2 ? pedido.data : mensagens.at(-1)?.data,
      consumidor: mensagens.at(-1)?.data,
    },
    pedido,
    mensagens: mensagens.map((mensagem, indice) => ({ id: indice + 1, ...mensagem })),
  });

  return [
    demo(
      1,
      'Carneiro',
      {
        numero: '1042',
        data: minutosAtras(25),
        total: 18,
        retirada: 'Feira da Rua Augusta',
        itens: [{ nome: 'Xepa de frutas', quantidade: 2, preco: 9 }],
      },
      [
        { autor: 'consumidor', texto: 'Oi! Vi sua xepa de hoje e queria saber se ainda tem disponibilidade.', data: minutosAtras(20) },
        { autor: 'feirante', texto: 'Olá! Temos sim. Posso reservar para você.', data: minutosAtras(14) },
        { autor: 'consumidor', texto: 'Opa, tudo bem? Passo aí às 17h.', data: minutosAtras(12) },
      ],
    ),
    demo(
      2,
      'Murilo',
      {
        numero: '1041',
        data: minutosAtras(160),
        total: 12.5,
        retirada: 'Feira da Rua Augusta',
        itens: [{ nome: 'Xepa de verduras e legumes', quantidade: 1, preco: 12.5 }],
      },
      [{ autor: 'consumidor', texto: 'Olá, boa tarde! Até que horas posso retirar?', data: minutosAtras(150) }],
    ),
    demo(
      3,
      'Fernanda',
      {
        numero: '1038',
        data: minutosAtras(60 * 26),
        total: 25,
        retirada: 'Feira da Rua Augusta',
        itens: [{ nome: 'Xepa completa', quantidade: 1, preco: 25 }],
      },
      [
        { autor: 'feirante', texto: 'Oi! Separei aquelas frutas que você pediu.', data: minutosAtras(60 * 25) },
        { autor: 'consumidor', texto: 'Perfeito, já estou chegando!', data: minutosAtras(60 * 24) },
      ],
      STATUS_CONVERSA.finalizada,
    ),
  ];
}

function ultimaAtividade(conversa) {
  return conversa.mensagens.at(-1)?.data || conversa.finalizadaEm || conversa.criadaEm;
}

function salvarConversas(conversas) {
  localStorage.setItem(CHAVE_CONVERSAS, JSON.stringify(conversas));
  window.dispatchEvent(new Event(EVENTO_CONVERSAS));
}

export function carregarConversas() {
  const salvas = JSON.parse(localStorage.getItem(CHAVE_CONVERSAS));

  if (!salvas) {
    const iniciais = conversasDemonstracao();
    localStorage.setItem(CHAVE_CONVERSAS, JSON.stringify(iniciais));
    return iniciais;
  }

  return salvas
    // Conversas salvas antes das notificações: considera tudo como já lido.
    .map((conversa) => (conversa.leituras
      ? conversa
      : { ...conversa, leituras: { feirante: ultimaAtividade(conversa), consumidor: ultimaAtividade(conversa) } }))
    .sort((a, b) => new Date(ultimaAtividade(b)) - new Date(ultimaAtividade(a)));
}

// Mensagens que o perfil ('feirante' ou 'consumidor') ainda não viu.
export function mensagensNaoLidas(conversa, perfil) {
  const lidoEm = conversa.leituras?.[perfil];

  return conversa.mensagens.filter((mensagem) => (
    mensagem.autor !== perfil && (!lidoEm || new Date(mensagem.data) > new Date(lidoEm))
  ));
}

export function marcarComoLida(id, perfil) {
  return alterarConversa(id, (conversa) => ({
    ...conversa,
    leituras: { ...conversa.leituras, [perfil]: new Date().toISOString() },
  }));
}

function alterarConversa(id, alterar) {
  let alterada = null;

  const conversas = carregarConversas().map((conversa) => {
    if (conversa.id !== id) return conversa;

    alterada = alterar(conversa);
    return alterada;
  });

  if (alterada) salvarConversas(conversas);
  return alterada;
}

// Chamada ao confirmar o pagamento: o feirante já recebe o pedido no chat.
// O botão "Falar com vendedor" também usa: se o pedido já tem conversa, reaproveita.
export function abrirConversaDoPedido(pedido) {
  const id = `pedido-${pedido.numero}`;
  const conversas = carregarConversas();

  if (conversas.some((conversa) => conversa.id === id)) {
    return id;
  }

  const agora = new Date().toISOString();
  const novaConversa = {
    id,
    consumidor: carregarPerfil('usuario').nome,
    feirante: pedido.itens[0]?.barraca || carregarPerfil('feirante').nome,
    status: STATUS_CONVERSA.recente,
    criadaEm: agora,
    finalizadaEm: null,
    
    // O consumidor acabou de fazer o pedido; o feirante ainda não viu.
    leituras: { feirante: null, consumidor: agora },
    pedido: {
      numero: pedido.numero,
      data: pedido.data,
      total: pedido.total,
      retirada: pedido.itens[0]?.retirada || '',
      itens: pedido.itens.map(({ nome, quantidade, preco }) => ({ nome, quantidade, preco })),
    },
    mensagens: [
      {
        id: 1,
        autor: 'sistema',
        texto: `Novo pedido nº ${pedido.numero} realizado. Total: ${formatarMoeda(pedido.total)}.`,
        data: agora,
      },
    ],
  };

  salvarConversas([novaConversa, ...conversas]);
  return id;
}

// Conversa antes da compra, aberta pelo card "Perfil do feirante" na página da xepa.
// Não tem pedido: guarda só a xepa sobre a qual o consumidor quer saber.
export function idConversaDaXepa(xepa) {
  return `xepa-${xepa.id}`;
}

export function abrirConversaDaXepa(xepa) {
  const id = idConversaDaXepa(xepa);
  const conversas = carregarConversas();
  const existente = conversas.find((conversa) => conversa.id === id);

  if (existente && existente.status !== STATUS_CONVERSA.finalizada) return id;

  const agora = new Date().toISOString();
  const novaConversa = {
    id,
    consumidor: carregarPerfil('usuario').nome,
    feirante: xepa.feirante || carregarPerfil('feirante').nome,
    status: STATUS_CONVERSA.recente,
    criadaEm: agora,
    finalizadaEm: null,
    leituras: { feirante: null, consumidor: agora },
    pedido: null,
    xepa: { id: xepa.id, nome: xepa.nome, preco: xepa.preco, feira: xepa.feira || '' },
    mensagens: [
      { id: 1, autor: 'sistema', texto: `Conversa sobre a ${xepa.nome}.`, data: agora },
    ],
  };

  salvarConversas([novaConversa, ...conversas.filter((conversa) => conversa.id !== id)]);
  return id;
}

// Texto curto que identifica a conversa: o pedido ou a xepa perguntada.
export function assuntoDaConversa(conversa) {
  if (conversa.pedido) return `Pedido nº ${conversa.pedido.numero}`;

  return `Dúvida: ${conversa.xepa?.nome || 'xepa'}`;
}

// autor: 'consumidor' ou 'feirante'. Conversas finalizadas não aceitam mensagens.
export function enviarMensagem(id, autor, texto) {
  return alterarConversa(id, (conversa) => {
    if (conversa.status === STATUS_CONVERSA.finalizada) return conversa;

    return {
      ...conversa,
      mensagens: [
        ...conversa.mensagens,
        { id: Date.now(), autor, texto, data: new Date().toISOString() },
      ],
      leituras: { ...conversa.leituras, [autor]: new Date().toISOString() },
    };
  });
}

// Botão "Pedido retirado" do feirante: move a conversa para Finalizadas.
export function finalizarConversa(id) {
  const conversa = alterarConversa(id, (atual) => ({
    ...atual,
    status: STATUS_CONVERSA.finalizada,
    finalizadaEm: new Date().toISOString(),
  }));

  if (conversa && !conversa.demo && conversa.pedido) {
    atualizarStatusPedido(conversa.pedido.numero, 'Retirado');
  }

  return conversa;
}
