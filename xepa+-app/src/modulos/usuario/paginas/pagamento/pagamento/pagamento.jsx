import Cadeado from '@/assets/imagens/gerais/cadeado.png';
import Pix from '@/assets/imagens/gerais/pix.png';
import { useState } from 'react';
import Styles from '../estilos/pagamento.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import imagemPadrao from '@/assets/imagens/gerais/xepaCompleta.jpg';
import base from '@/compartilhado/estilos/conta.module.css';
import { formatarMoeda, registrarPedido } from '@/compartilhado/servicos/pedidos';
import { baixarEstoque } from '@/compartilhado/servicos/xepas';
import { abrirConversaDoPedido } from '@/compartilhado/servicos/conversas';
import { registrarVendaNoFinanceiro } from '@/modulos/feirante/servicos/lancamentosFinanceiros';
import useCarrinho from '@/modulos/usuario/hooks/useCarrinho';
import { calcularTotal, limparCarrinho } from '@/modulos/usuario/servicos/carrinho';

export default function Pagamento() {
  const navegar = useNavigate();
  const [copiado, setCopiado] = useState(false);
  const { itens } = useCarrinho();
  const totalPedido = calcularTotal(itens);

  const codigoPix = '00020101021226850014BR.GOV.BCB.PIX';

  function confirmarPagamento() {
    const pedido = registrarPedido({
      itens: itens.map((item) => ({
        id: item.id,
        nome: item.nome,
        categoria: item.categoria,
        descricao: item.itens || item.descricao,
        barraca: item.barraca || item.feira,
        retirada: item.local,
        quantidade: item.quantidade,
        preco: item.preco,
        imagem: item.imagem || imagemPadrao,
      })),
      total: totalPedido,
    });
    // O feirante fica sabendo do pedido na hora: chat (Recentes + notificação) e financeiro.
    abrirConversaDoPedido(pedido);
    registrarVendaNoFinanceiro(pedido);
    baixarEstoque(itens);
    limparCarrinho();
    navegar('/historico-pedidos');
  }

  async function copiarPix() {
    try {
      await navigator.clipboard.writeText(codigoPix);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000); // Reseta o texto após 3 segundos
    } catch {
      setCopiado(false);
    }
  }

  if (itens.length === 0) {
    return (
      <main className={base.pagina}>
        <section className={base.vazio}>
          <ShoppingCart size={44} aria-hidden="true" />
          <h2>Seu carrinho está vazio</h2>
          <p>Adicione xepas ao carrinho para realizar o pagamento.</p>
          <Link to="/homeU" className={base.botaoPrincipal}>
            Ver xepas
          </Link>
        </section>
      </main>
    );
  }

  return (
    <div>
      <div className={Styles.pagamentoContainer}>
        {/* Conteúdo Principal */}
        <main className={Styles.mainContainer}>
          <h1 className={Styles.pageTitle}>Realizar pagamento</h1>

          <div className={Styles.contentGrid}>
            {/* Seção da Forma de Pagamento (Esquerda) */}
            <section className={Styles.card}>
              <h2 className={Styles.sectionTitle}>FORMA DE PAGAMENTO</h2>

              <div className={Styles.summaryDivider}></div>

              <div className={Styles.paymentOption}>
                <div className={Styles.pixBrand}>
                  <img className={Styles.pixIcon} src={Pix} alt="Pix" />
                  <span>PIX</span>
                </div>
                <div className={Styles.radioIndicator}>
                  <div className={Styles.radioInner}></div>
                </div>
              </div>

              <div className={Styles.qrCodeWrapper}>
                <h3 className={Styles.qrInstructionsTitle}>Escaneie o QR Code</h3>
                <p className={Styles.qrInstructionsSub}>
                  Abra o app do seu banco, escolha pagar com Pix e aponte a câmera.
                </p>

                <div className={Styles.qrCodeBox}>
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=00020126580014br.gov.bcb.pix0136xepa-plus-pagamento-exemplo-12345"
                    alt="QR Code PIX"
                  />
                </div>

                <button className={Styles.btnCopyPix} onClick={copiarPix}>
                  {copiado ? 'CÓDIGO COPIADO!' : 'COPIAR CÓDIGO PIX'}
                </button>
              </div>
            </section>

            {/* Seção do Resumo do Pedido (Direita) */}
            <aside className={Styles.card}>
              <h2 className={Styles.summaryTitle}>Resumo do pedido</h2>

              <div className={Styles.summaryDivider}></div>

              <ul className={Styles.orderItems}>
                {itens.map((item) => (
                  <li className={Styles.itemRow} key={item.id}>
                    <span className={Styles.itemName}>
                      {item.quantidade}x {item.nome}
                    </span>
                    <span className={Styles.itemPrice}>
                      {formatarMoeda(item.preco * item.quantidade)}
                    </span>
                  </li>
                ))}
                <li className={Styles.itemRow}>
                  <span className={Styles.itemName}>Retirada</span>
                  <span className={`${Styles.itemPrice} ${Styles.freeTag}`}>Grátis</span>
                </li>
              </ul>

              <div className={Styles.summaryDivider}></div>

              <div className={Styles.totalRow}>
                <span>Total</span>
                <span>{formatarMoeda(totalPedido)}</span>
              </div>

              <button
                type="button"
                className={Styles.btnConfirmPayment}
                onClick={confirmarPagamento}
              >
                Já fiz o pagamento
              </button>

              <div className={Styles.secureBadge}>
                <img src={Cadeado} alt="Ambiente seguro" />
                <span>Ambiente seguro</span>
              </div>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
