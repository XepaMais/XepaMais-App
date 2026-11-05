import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Headset, Leaf, Lock, Store, UserRound } from 'lucide-react';
import Styles from '@/modulos/feirante/paginas/inicio/componentes/estilos/HomeFeirante.module.css';
import CestaXepa from '@/assets/imagens/gerais/xepaCompleta.jpg';
import Xepinha from '@/assets/imagens/marca/ia.png';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import { dataDeHoje } from '@/compartilhado/servicos/datas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
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

const conversas = [
  {
    nome: 'Seu Zé - Feira Livre Centro',
    mensagem: 'Opa, Lucas! Já separei sua xepa. Pode passar na banca 24.',
    horario: 'Hoje, 10:24',
    Icone: UserRound,
    estilo: 'avatar_feirante',
  },
  {
    nome: 'Equipe Xepa+',
    mensagem: 'Sua compra foi confirmada! ✅',
    horario: 'Hoje, 09:48',
    Icone: Leaf,
    estilo: 'avatar_equipe',
  },
  {
    nome: 'Banca do Seu Zé',
    mensagem: 'Temos novas xepas disponíveis hoje!',
    horario: 'Hoje, 08:32',
    Icone: Store,
    estilo: 'avatar_banca',
  },
  {
    nome: 'Suporte Xepa+',
    mensagem: 'Qualquer dúvida, estamos por aqui! 🙂',
    horario: 'Ontem, 17:21',
    Icone: Headset,
    estilo: 'avatar_suporte',
  },
];

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
  const { lancamentos, doMes, total } = useFinanceiro();
  const todosOsGastos = carregarGastos();
  const gastos = calcularTotaisDeGastos(todosOsGastos);
  const ganhoMensal = total(doMes, 'renda');
  const gastoMensal = gastos.mes + total(doMes, 'compra');

  // A pizza mostra como os gastos do mês se dividem; compras antigas entram como uma fatia.
  const comprasAntigas = total(doMes, 'compra');
  const fatiasGastos = gastosDoMesPorCategoria(todosOsGastos);

  if (comprasAntigas > 0) {
    fatiasGastos.push({ rotulo: 'Compras', cor: '#5c2409', valor: comprasAntigas });
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

                    <ul className={Styles.legenda}>
                      {fatiasGastos.map((fatia) => (
                        <li key={fatia.rotulo}>
                          <i style={{ background: fatia.cor }} />
                          <span>{fatia.rotulo}</span>
                          <strong>{formatarMoeda(fatia.valor)}</strong>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          </RecursoPlano>

          <section className={Styles.card_conversas}>
            <div className={Styles.card_header}>
              <h2>Últimas conversas</h2>
            </div>

            <div className={Styles.lista_conversas}>
              {conversas.map((conversa) => (
                <button
                  className={Styles.conversa}
                  key={conversa.nome}
                  type="button"
                  onClick={() => navigate('/chat-feirante')}
                  aria-label={`Abrir conversa com ${conversa.nome}`}
                >
                  <span
                    className={`${Styles.conversa_avatar} ${Styles[conversa.estilo]}`}
                    aria-hidden="true"
                  >
                    <conversa.Icone size={20} strokeWidth={2.2} />
                  </span>
                  <span className={Styles.conversa_texto}>
                    <strong>{conversa.nome}</strong>
                    <span>{conversa.mensagem}</span>
                  </span>
                  <small className={Styles.conversa_horario}>{conversa.horario}</small>
                  <span className={Styles.conversa_seta} aria-hidden="true">
                    ›
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default HomeFeirante;
