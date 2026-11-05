import { Link } from 'react-router-dom';
import { formatarData } from '@/compartilhado/servicos/datas';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import useCarrinho from '@/modulos/usuario/hooks/useCarrinho';
import { adicionarAoCarrinho, removerDoCarrinho } from '@/modulos/usuario/servicos/carrinho';
import imagemPadrao from '@/assets/imagens/gerais/xepaCompleta.jpg';
import styles from '@/modulos/usuario/paginas/detalhe-produto/estilos/ProdutoTopo.module.css';

function LinhaResumo({ rotulo, valor }) {
  return (
    <>
      <span className={styles.rotuloResumo}>{rotulo}</span>
      <span className={styles.valorResumo}>{valor}</span>
    </>
  );
}

function ProdutoTopo({ xepa }) {
  const { estaNoCarrinho } = useCarrinho();
  const noCarrinho = estaNoCarrinho(xepa.id);
  const esgotada = xepa.quantidade <= 0;

  return (
    <div className={styles.topo}>
      <section className={styles.galeria}>
        <img className={styles.principal} src={xepa.imagem || imagemPadrao} alt={xepa.nome} />
      </section>

      <section className={styles.detalhes}>
        <span className={styles.tag}>{xepa.categoria}</span>
        <h1>{xepa.nome}</h1>

        <div className={styles.preco}>
          <strong>{formatarMoeda(xepa.preco)}</strong>
        </div>

        <p className={styles.descricao}>{xepa.descricao}</p>

        <div className={styles.resumo}>
          {xepa.itens && <LinhaResumo rotulo="O que vem" valor={xepa.itens} />}
          <LinhaResumo
            rotulo="Quantidade"
            valor={esgotada ? 'Esgotada' : `${xepa.quantidade} disponíveis`}
          />
          {xepa.feira && <LinhaResumo rotulo="Feira" valor={xepa.feira} />}
          <LinhaResumo
            rotulo="Local"
            valor={xepa.cep ? `${xepa.local} · CEP ${xepa.cep}` : xepa.local}
          />
          {xepa.dias && xepa.dias.length > 0 && (
            <LinhaResumo rotulo="Dias" valor={xepa.dias.join(' e ')} />
          )}
          {xepa.horario && <LinhaResumo rotulo="Horário" valor={xepa.horario} />}
          <LinhaResumo rotulo="Validade" valor={formatarData(xepa.validade)} />
        </div>

        <div className={styles.acoes}>
          {noCarrinho ? (
            <>
              <button
                type="button"
                className={styles.remover}
                onClick={() => removerDoCarrinho(xepa.id)}
              >
                Remover do carrinho
              </button>
              <Link to="/carrinho" className={styles.carrinho}>
                Ver carrinho
              </Link>
            </>
          ) : (
            <button
              type="button"
              className={styles.carrinho}
              disabled={esgotada}
              onClick={() => adicionarAoCarrinho(xepa.id)}
            >
              Adicionar ao carrinho
            </button>
          )}
        </div>
      </section>
    </div>
  );
}

export default ProdutoTopo;
