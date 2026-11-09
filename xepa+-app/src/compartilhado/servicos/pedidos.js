// Pedidos registrados ao confirmar o pagamento. Sem backend, ficam neste navegador.
const CHAVE_PEDIDOS = 'pedidosXepa';

export function carregarPedidos() {
  return JSON.parse(localStorage.getItem(CHAVE_PEDIDOS)) || [];
}

// Status usados na retirada do pedido.
export const PENDENTE_RETIRADA = 'Pendente de retirada';
export const RETIRADO = 'Retirado';

// Gera um número aleatório de 4 dígitos (de 1000 a 9999).
function gerarCodigoRetirada() {
  return String(Math.floor(Math.random() * 9000) + 1000);
}

export function registrarPedido({ itens, total }) {
  const pedidos = carregarPedidos();

  const novoPedido = {
    numero: String(pedidos.length + 1).padStart(4, '0'),
    data: new Date().toISOString(),
    itens,
    total,
    status: PENDENTE_RETIRADA,
    codigo: gerarCodigoRetirada(),
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
