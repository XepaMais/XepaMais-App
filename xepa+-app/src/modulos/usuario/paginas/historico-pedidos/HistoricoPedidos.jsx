import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipboardList, QrCode } from 'lucide-react';
import {
  carregarPedidos,
  formatarDataHora,
  formatarMoeda,
  RETIRADO,
} from '@/compartilhado/servicos/pedidos';
import { abrirConversaDoPedido } from '@/compartilhado/servicos/conversas';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './estilos/HistoricoPedidos.module.css';

function HistoricoPedidos() {
  const [pedidos] = useState(carregarPedidos);
  const [pedidoAberto, setPedidoAberto] = useState(null);
  const navegar = useNavigate();

  function falarComVendedor(pedido) {
    const conversa = abrirConversaDoPedido(pedido);
    navegar('/HistoricoChatUsuario', { state: { conversa } });
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Meus pedidos</h1>
          <p>Histórico das suas compras no Xepa+.</p>
        </div>
      </header>

      {pedidos.length === 0 ? (
        <section className={base.vazio}>
          <ClipboardList size={44} aria-hidden="true" />
          <h2>Você ainda não tem pedidos</h2>
          <p>Quando você confirmar um pagamento, o pedido aparecerá aqui.</p>
          <Link to="/carrinho" className={base.botaoPrincipal}>
            Ir para o carrinho
          </Link>
        </section>
      ) : (
        <>
          <p className={base.aviso}>
            Os pedidos ficam salvos apenas neste navegador até a integração com o banco de dados.
          </p>

          <div className={base.lista}>
            {pedidos.map((pedido) => {
              const aberto = pedidoAberto === pedido.numero;

              return (
                <article className={base.card} key={pedido.numero}>
                  <header className={base.faixa}>
                    <strong>Pedido nº {pedido.numero}</strong>
                    <span>Comprado em {formatarDataHora(pedido.data)}</span>
                  </header>

                  <div className={base.corpo}>
                    <ul className={styles.itens}>
                      {pedido.itens.map((item) => (
                        <li className={styles.item} key={item.nome}>
                          <img src={item.imagem} alt="" className={styles.imagem} />
                          <div className={styles.itemTexto}>
                            <strong>{item.nome}</strong>
                            <span>{item.barraca}</span>
                            {aberto && (
                              <>
                                <span>{item.descricao}</span>
                                <span>Retirada: {item.retirada}</span>
                                <span>Quantidade: {item.quantidade}</span>
                              </>
                            )}
                          </div>
                          <span className={styles.preco}>
                            {formatarMoeda(item.preco * item.quantidade)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* Código para mostrar ao feirante na hora de retirar */}
                    {pedido.codigo && pedido.status !== RETIRADO && (
                      <div className={styles.retirada}>
                        <QrCode size={88} aria-hidden="true" className={styles.qrCode} />
                        <div>
                          <span>Código de retirada</span>
                          <strong className={styles.codigo}>{pedido.codigo}</strong>
                          <p>Mostre este código ou o QR Code ao feirante para retirar o pedido.</p>
                        </div>
                      </div>
                    )}

                    <div className={styles.rodape}>
                      <div className={styles.resumo}>
                        <span className={base.status}>{pedido.status}</span>
                        <strong>Total: {formatarMoeda(pedido.total)}</strong>
                      </div>

                      <div className={base.acoes}>
                        <button
                          type="button"
                          className={base.botaoSecundario}
                          aria-expanded={aberto}
                          onClick={() => setPedidoAberto(aberto ? null : pedido.numero)}
                        >
                          {aberto ? 'Ocultar detalhes' : 'Ver detalhes'}
                        </button>
                        <button
                          type="button"
                          className={base.botaoPrincipal}
                          onClick={() => falarComVendedor(pedido)}
                        >
                          Falar com vendedor
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </>
      )}
    </main>
  );
}

export default HistoricoPedidos;
