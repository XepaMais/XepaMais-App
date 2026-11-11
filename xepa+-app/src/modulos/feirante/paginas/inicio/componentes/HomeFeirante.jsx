import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, BellOff, Lock, PackageCheck } from 'lucide-react';
import Styles from '@/modulos/feirante/paginas/inicio/componentes/estilos/HomeFeirante.module.css';
import Notif from '@/modulos/feirante/paginas/inicio/componentes/notificacoes.module.css';
import Grafico from '@/modulos/feirante/paginas/inicio/componentes/graficoGastos.module.css';
import CestaXepa from '@/assets/imagens/gerais/xepaCompleta.jpg';
import Xepinha from '@/assets/imagens/marca/ia.png';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import useConversas from '@/compartilhado/hooks/useConversas';
import { mensagensNaoLidas, STATUS_CONVERSA } from '@/compartilhado/servicos/conversas';
import ItemConversa from '@/modulos/feirante/paginas/historico-chat/componentes/ItemConversa';
import { dataDeHoje } from '@/compartilhado/servicos/datas';
import {
  atualizarStatusPedido,
  carregarPedidos,
  formatarDataHora,
  formatarMoeda,
  PENDENTE_RETIRADA,
  RETIRADO,
} from '@/compartilhado/servicos/pedidos';
import useFinanceiro from '@/modulos/feirante/hooks/useFinanceiro';
import usePlano from '@/modulos/feirante/hooks/usePlano';
import RecursoPlano from '@/modulos/feirante/componentes/RecursoPlano';
import { PLANOS } from '@/compartilhado/dados/planos';
import { carregarProdutos } from '@/modulos/feirante/servicos/produtosFeirante';
import {
  carregarGastos,
  calcularTotaisDeGastos,
  gastosDoMesPorCategoria,
} from '@/modulos/feirante/servicos/gastosFeirante';

// Soma as rendas do dia mais recente, sem contar datas futuras.
function rendaDaUltimaFeira(lancamentos) {
  const hoje = dataDeHoje();
  const rendas = lancamentos.filter((item) => item.tipo === 'renda' && item.data <= hoje);

  let ultimaData = '';
  for (const renda of rendas) {
    if (renda.data > ultimaData) {
      ultimaData = renda.data;
    }
  }

  let soma = 0;
  for (const renda of rendas) {
    if (renda.data === ultimaData) {
      soma += Number(renda.valor);
    }
  }

  return soma;
}

// Monta as fatias do gráfico de pizza a partir dos valores.
function montarPizza(fatias) {
  let totalFatias = 0;
  for (const fatia of fatias) {
    totalFatias += fatia.valor;
  }

  if (totalFatias === 0) return undefined;

  let acumulado = 0;
  const partes = [];

  for (const fatia of fatias) {
    const inicio = acumulado;
    acumulado += (fatia.valor / totalFatias) * 360;
    partes.push(`${fatia.cor} ${inicio}deg ${acumulado}deg`);
  }

  return `conic-gradient(${partes.join(', ')})`;
}

function HomeFeirante() {
  const navigate = useNavigate();
  const { primeiroNome } = usePerfil('feirante');
  const { plano, temAcesso } = usePlano();
  const dadosDoPlano = PLANOS.find((item) => item.id === plano);
  const ultimaXepa = carregarProdutos()[0];
  const [pedidos, setPedidos] = useState(carregarPedidos);
  const pedidosPendentes = pedidos.filter((pedido) => pedido.status === PENDENTE_RETIRADA);
  const pedidosRetirados = pedidos.length - pedidosPendentes.length;

  // O feirante confirma a entrega direto da home, sem abrir o histórico.
  function confirmarEntrega(numero) {
    atualizarStatusPedido(numero, RETIRADO);
    setPedidos(carregarPedidos());
  }
  const { lancamentos, doMes, total } = useFinanceiro();
  // Só conversas recentes (pedidos ainda não retirados), as mais novas primeiro.
  // As que têm pedido novo ou mensagem não lida aparecem no topo.
  const conversasRecentes = useConversas()
    .filter((conversa) => conversa.status === STATUS_CONVERSA.recente)
    .sort((a, b) => (
      Number(mensagensNaoLidas(b, 'feirante').length > 0)
      - Number(mensagensNaoLidas(a, 'feirante').length > 0)
    ));
  let totalNovas = 0;
  for (const conversa of conversasRecentes) {
    totalNovas += mensagensNaoLidas(conversa, 'feirante').length;
  }
  const todosOsGastos = carregarGastos();
  const gastos = calcularTotaisDeGastos(todosOsGastos);
  const ganhoMensal = total(doMes, 'renda');
  const gastoMensal = gastos.mes + total(doMes, 'compra');

  // A pizza mostra como os gastos do mês se dividem; compras antigas entram como uma fatia.
  const comprasAntigas = total(doMes, 'compra');
  const fatiasGastos = gastosDoMesPorCategoria(todosOsGastos);

  if (comprasAntigas > 0) {
    fatiasGastos.push({ rotulo: 'Compras', cor: '#287447', valor: comprasAntigas });
  }

  const fundoPizza = montarPizza(fatiasGastos);
  const dataDeHoje = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className={Styles.pagina}>
      <main className={Styles.dashboard}>
        <section className={Styles.banner} aria-labelledby="banner-titulo">
          <div className={Styles.banner_foto}>
            <img src={CestaXepa} alt="Cesta com frutas e verduras frescas" />
          </div>

          <div className={Styles.banner_texto}>
            <span className={Styles.banner_marca}>{dataDeHoje}</span>
            <h1 id="banner-titulo">Olá, {primeiroNome}!</h1>
            <p>Seja bem-vindo de volta.</p>
            {dadosDoPlano && <p>Plano {dadosDoPlano.nome}</p>}
          </div>

          <div className={Styles.banner_assistente}>
            <strong>O que vamos fazer hoje?</strong>

            <div className={Styles.atalhos}>
              <button type="button" onClick={() => navigate('/adicionar-produto')}>
                Cadastrar Xepa
              </button>
              <button type="button" onClick={() => navigate('/adicionar-gasto')}>
                Registrar gasto
                {!temAcesso('financeiro') && (
                  <Lock
                    size={14}
                    className={Styles.iconeBloqueio}
                    aria-label="bloqueado no seu plano"
                  />
                )}
              </button>
              <button type="button" onClick={() => navigate('/chat-ia')}>
                Falar com a Xepinha
                {!temAcesso('ia') && (
                  <Lock
                    size={14}
                    className={Styles.iconeBloqueio}
                    aria-label="bloqueado no seu plano"
                  />
                )}
              </button>
            </div>
          </div>

          <img
            className={Styles.banner_xepinha}
            src={Xepinha}
            alt="Xepinha, assistente virtual da Xepa"
          />
        </section>

        <div className={Styles.grid}>
          <section className={Styles.card_pedidos} aria-labelledby="pedidos-titulo">
            <div className={Styles.card_header}>
              <h2 id="pedidos-titulo">
                Pedidos
                {pedidosPendentes.length > 0 && (
                  <span
                    className={Styles.pedidos_contador}
                    aria-label={`${pedidosPendentes.length} para retirar`}
                  >
                    {pedidosPendentes.length}
                  </span>
                )}
              </h2>
              <button
                type="button"
                className={Styles.botao_contorno_pequeno}
                onClick={() => navigate('/historico-vendas')}
              >
                Ver histórico <span aria-hidden="true">→</span>
              </button>
            </div>

            <div className={Styles.pedidos_resumo}>
              <div>
                <span>Para retirar</span>
                <strong>{pedidosPendentes.length}</strong>
              </div>
              <div>
                <span>Retirados</span>
                <strong>{pedidosRetirados}</strong>
              </div>
              <div>
                <span>Total de pedidos</span>
                <strong>{pedidos.length}</strong>
              </div>
            </div>

            {pedidosPendentes.length === 0 ? (
              <div className={Styles.pedidos_vazio}>
                <PackageCheck size={32} aria-hidden="true" />
                <strong>Nenhum pedido aguardando retirada</strong>
                <span>Quando um cliente comprar sua Xepa, o pedido aparece aqui.</span>
              </div>
            ) : (
              <ul className={Styles.pedidos_lista}>
                {pedidosPendentes.slice(0, 4).map((pedido) => (
                  <li key={pedido.numero} className={Styles.pedido}>
                    <div className={Styles.pedido_info}>
                      <strong>Pedido Nº {pedido.numero}</strong>
                      <span>{formatarDataHora(pedido.data)}</span>
                      <span className={Styles.pedido_itens}>
                        {pedido.itens
                          .map((item) => `${item.quantidade}x ${item.nome}`)
                          .join(', ')}
                      </span>
                    </div>
                    <div className={Styles.pedido_valores}>
                      <strong>{formatarMoeda(pedido.total)}</strong>
                      <span>Código: {pedido.codigo || '-'}</span>
                    </div>
                    <button
                      type="button"
                      className={Styles.botao_verde}
                      onClick={() => confirmarEntrega(pedido.numero)}
                    >
                      Confirmar entrega
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {pedidosPendentes.length > 4 && (
              <button
                type="button"
                className={Styles.pedidos_mais}
                onClick={() => navigate('/historico-vendas')}
              >
                Ver todos os {pedidosPendentes.length} pedidos para retirar
              </button>
            )}
          </section>

          <section className={Styles.card_destaque}>
            <div className={Styles.card_header}>
              <h2>Xepa em destaque</h2>
            </div>

            {ultimaXepa ? (
              <div className={Styles.destaque_conteudo}>
                <div className={Styles.destaque_imagem}>
                  <img src={ultimaXepa.imagem || CestaXepa} alt={ultimaXepa.nome} />
                </div>

                <div className={Styles.destaque_info}>
                  <strong>{ultimaXepa.nome}</strong>
                  <p>{ultimaXepa.descricao}</p>
                  <div className={Styles.preco}>{formatarMoeda(ultimaXepa.preco)}</div>
                  <p>Quantidade disponível: {ultimaXepa.quantidade}</p>
                  <div className={Styles.destaque_acoes}>
                    <button
                      type="button"
                      className={Styles.botao_verde}
                      onClick={() =>
                        navigate('/historico-produtos', { state: { produtoId: ultimaXepa.id } })
                      }
                    >
                      Ver detalhes <span aria-hidden="true">→</span>
                    </button>
                    <button
                      type="button"
                      className={Styles.botao_contorno}
                      onClick={() => navigate('/historico-produtos')}
                    >
                      Ver histórico
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className={Styles.destaque_vazio}>
                <p>Você ainda não cadastrou nenhuma Xepa.</p>
                <div className={Styles.destaque_acoes}>
                  <button
                    type="button"
                    className={Styles.botao_verde}
                    onClick={() => navigate('/adicionar-produto')}
                  >
                    Cadastrar Xepa <span aria-hidden="true">→</span>
                  </button>
                  <button
                    type="button"
                    className={Styles.botao_contorno}
                    onClick={() => navigate('/historico-produtos')}
                  >
                    Ver histórico
                  </button>
                </div>
              </div>
            )}
          </section>

          <RecursoPlano recurso="financeiro" compacto>
            <section className={Styles.card_financas}>
              <h2>↗ &nbsp;Finanças</h2>
              <p>Ganhos da última feira</p>
              <strong className={Styles.ganhos_valor}>
                {formatarMoeda(rendaDaUltimaFeira(lancamentos))}
              </strong>

              <div className={Styles.ganhos_caixas}>
                <div>
                  <span>Ganho Bruto mensal</span>
                  <strong>{formatarMoeda(ganhoMensal)}</strong>
                </div>
                <div>
                  <span>Ganho Líquido mensal</span>
                  <strong>{formatarMoeda(ganhoMensal - gastoMensal)}</strong>
                </div>
              </div>

              <button
                type="button"
                className={Styles.botao_financas}
                onClick={() => navigate('/financeiro')}
              >
                Ver financeiro <span aria-hidden="true">➜</span>
              </button>
            </section>
          </RecursoPlano>

          <RecursoPlano recurso="financeiro" compacto>
            <section className={Styles.card_gastos}>
              <div className={Styles.card_header}>
                <h2>Gastos do mês</h2>
                <button
                  type="button"
                  className={Styles.botao_seta}
                  aria-label="Ver gastos"
                  onClick={() => navigate('/adicionar-gasto')}
                >
                  <ArrowUpRight size={20} aria-hidden="true" />
                </button>
              </div>

              <div className={Styles.gastos_conteudo}>
                <div
                  className={Styles.grafico_pizza}
                  style={{ background: fundoPizza }}
                  role="img"
                  aria-label={`Gastos do mês por categoria. Total: ${formatarMoeda(gastoMensal)}`}
                />

                {fatiasGastos.length === 0 ? (
                  <p className={Styles.semGastos}>Nenhum gasto registrado neste mês.</p>
                ) : (
                  <>
                    <strong className={Styles.totalGastos}>
                      Total: {formatarMoeda(gastoMensal)}
                    </strong>

                    {/* Legenda em etiquetas lado a lado: com mais categorias, elas
                        se encaixam na mesma linha em vez de aumentar o card. */}
                    <ul className={Grafico.legenda}>
                      {fatiasGastos.map((fatia) => (
                        <li key={fatia.rotulo} className={Grafico.item}>
                          <i className={Grafico.cor} style={{ background: fatia.cor }} />
                          <span className={Grafico.nome}>{fatia.rotulo}</span>
                          <strong className={Grafico.valor}>{formatarMoeda(fatia.valor)}</strong>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          </RecursoPlano>

          <section className={`${Styles.card_conversas} ${Notif.quadro}`} aria-live="polite">
            <div className={Styles.card_header}>
              <h2 className={Notif.titulo}>
                Notificações
                {totalNovas > 0 && (
                  <span
                    className={Notif.contador}
                    aria-label={`${totalNovas} ${totalNovas === 1 ? 'nova' : 'novas'}`}
                  >
                    {totalNovas}
                  </span>
                )}
              </h2>
              <button
                type="button"
                className={Notif.verTodas}
                onClick={() => navigate('/HistoricoChat')}
              >
                Ver conversas
              </button>
            </div>

            <div className={Notif.lista}>
              {conversasRecentes.slice(0, 4).map((conversa) => (
                <ItemConversa
                  key={conversa.id}
                  conversa={conversa}
                  perfil="feirante"
                  nome={conversa.consumidor}
                  onClick={() => navigate('/HistoricoChat', { state: { conversa: conversa.id } })}
                />
              ))}

              {conversasRecentes.length === 0 && (
                <div className={Notif.vazio}>
                  <BellOff size={32} aria-hidden="true" />
                  <strong>Nenhuma conversa recente</strong>
                  <span>Novos pedidos e mensagens de clientes aparecem aqui.</span>
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomeFeirante;
