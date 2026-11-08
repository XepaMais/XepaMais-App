// Pedidos registrados ao confirmar o pagamento. Sem backend, ficam neste navegador.
const CHAVE_PEDIDOS = 'pedidosXepa';

export function carregarPedidos() {
  return JSON.parse(localStorage.getItem(CHAVE_PEDIDOS)) || [];
}

export function registrarPedido({ itens, total }) {
  const pedidos = carregarPedidos();

  const novoPedido = {
    numero: String(pedidos.length + 1).padStart(4, '0'),
    data: new Date().toISOString(),
    itens,
    total,
    status: 'Pagamento informado',
  };

  localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify([novoPedido, ...pedidos]));
  return novoPedido;
}

// Usado quando o feirante marca o pedido como retirado no chat.
export function atualizarStatusPedido(numero, status) {
  const pedidos = carregarPedidos().map((pedido) => (
    pedido.numero === numero ? { ...pedido, status } : pedido
  ));

  localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(pedidos));
}

export function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function formatarDataHora(data) {
  return new Date(data).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
