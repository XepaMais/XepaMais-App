import { useState } from 'react';
import { Receipt } from 'lucide-react';
import {
  atualizarStatusPedido,
  carregarPedidos,
  formatarDataHora,
  formatarMoeda,
  PENDENTE_RETIRADA,
  RETIRADO,
} from '@/compartilhado/servicos/pedidos';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './estilos/HistoricoVendas.module.css';

function contarItens(venda) {
  let quantidade = 0;

  for (const item of venda.itens) {
    quantidade += item.quantidade;
  }

  return quantidade;
}

function HistoricoVendas() {
  const [vendas, setVendas] = useState(carregarPedidos);

  // O feirante confirma que o cliente retirou o pedido.
  function confirmarEntrega(numero) {
    atualizarStatusPedido(numero, RETIRADO);
    setVendas(carregarPedidos());
  }

  let totalItens = 0;
  let totalVendido = 0;

  for (const venda of vendas) {
    totalItens += contarItens(venda);
    totalVendido += venda.total;
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Histórico de vendas</h1>
          <p>Acompanhe os pedidos feitos na plataforma.</p>
        </div>
      </header>

      {vendas.length === 0 ? (
        <section className={base.vazio}>
          <Receipt size={44} aria-hidden="true" />
          <h2>Nenhuma venda registrada</h2>
          <p>As vendas aparecerão aqui quando um cliente confirmar um pagamento.</p>
        </section>
      ) : (
        <>

          <section className={base.indicadores} aria-label="Resumo das vendas">
            <div className={base.indicador}>
              <span>Vendas</span>
              <strong>{vendas.length}</strong>
            </div>
            <div className={base.indicador}>
              <span>Itens vendidos</span>
              <strong>{totalItens}</strong>
            </div>
            <div className={base.indicador}>
              <span>Valor total</span>
              <strong>{formatarMoeda(totalVendido)}</strong>
            </div>
          </section>

          <div className={styles.tabelaBorda}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th scope="col">Venda</th>
                  <th scope="col">Data</th>
                  <th scope="col">Produtos</th>
                  <th scope="col">Qtd.</th>
                  <th scope="col">Total</th>
                  <th scope="col">Status</th>
                  <th scope="col">Retirada</th>
                  <th scope="col">Código</th>
                  <th scope="col">Entrega</th>
                </tr>
              </thead>
              <tbody>
                {vendas.map((venda) => (
                  <tr key={venda.numero}>
                    <td data-rotulo="Venda">
                      <strong>Nº {venda.numero}</strong>
                    </td>
                    <td data-rotulo="Data">{formatarDataHora(venda.data)}</td>
                    <td data-rotulo="Produtos">
                      {venda.itens.map((item) => (
                        <span className={styles.produto} key={item.nome}>
                          {item.quantidade}x {item.nome}
                        </span>
                      ))}
                    </td>
                    <td data-rotulo="Qtd.">{contarItens(venda)}</td>
                    <td data-rotulo="Total">
                      <strong>{formatarMoeda(venda.total)}</strong>
                    </td>
                    <td data-rotulo="Status">
                      <span className={base.status}>{venda.status}</span>
                    </td>
                    <td data-rotulo="Retirada">{venda.itens[0].retirada}</td>
                    <td data-rotulo="Código">
                      <strong>{venda.codigo || '-'}</strong>
                    </td>
                    <td data-rotulo="Entrega">
                      {venda.status === PENDENTE_RETIRADA ? (
                        <button
                          type="button"
                          className={base.botaoPrincipal}
                          onClick={() => confirmarEntrega(venda.numero)}
                        >
                          Confirmar entrega
                        </button>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </main>
  );
}

export default HistoricoVendas;
