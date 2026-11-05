import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package } from 'lucide-react';
import { carregarProdutos } from '@/modulos/feirante/servicos/produtosFeirante';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import imagemPadrao from '@/assets/imagens/gerais/xepaCompleta.jpg';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './estilos/HistoricoProdutos.module.css';

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
}

function HistoricoProdutos() {
  const localizacao = useLocation();
  const [produtos] = useState(carregarProdutos);
  // A Home pode abrir esta página já com os detalhes de um produto visíveis.
  const [produtoAberto, setProdutoAberto] = useState(
    localizacao.state ? localizacao.state.produtoId : null,
  );

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Histórico de produtos</h1>
          <p>Consulte as Xepas que você já cadastrou.</p>
        </div>
        <Link to="/adicionar-produto" className={base.botaoPrincipal}>
          + Cadastrar Xepa
        </Link>
      </header>

      {produtos.length === 0 ? (
        <section className={base.vazio}>
          <Package size={44} aria-hidden="true" />
          <h2>Nenhuma Xepa cadastrada</h2>
          <p>Os produtos que você cadastrar aparecerão aqui.</p>
        </section>
      ) : (
        <>
          <p className={base.aviso}>
            Os produtos ficam salvos apenas neste navegador até a integração com o banco de dados.
          </p>

          <div className={styles.grade}>
            {produtos.map((produto) => {
              const aberto = produtoAberto === produto.id;

              return (
                <article className={base.card} key={produto.id}>
                  <img
                    src={produto.imagem || imagemPadrao}
                    alt={produto.nome}
                    className={styles.imagem}
                  />

                  <div className={styles.conteudo}>
                    <span className={base.status}>{produto.categoria}</span>
                    <h2>{produto.nome}</h2>
                    <strong className={styles.preco}>{formatarMoeda(produto.preco)}</strong>
                    <p>Quantidade disponível: {produto.quantidade}</p>
                    <p>
                      Cadastrado em {new Date(produto.cadastradoEm).toLocaleDateString('pt-BR')}
                    </p>

                    {aberto && (
                      <div className={styles.detalhes}>
                        <p>Validade estimada: {formatarData(produto.validade)}</p>
                        {produto.itens && <p>O que vem: {produto.itens}</p>}
                        {produto.feira && <p>Feira: {produto.feira}</p>}
                        <p>Local de retirada: {produto.local}</p>
                        <p>{produto.descricao}</p>
                      </div>
                    )}

                    <button
                      type="button"
                      className={base.botaoSecundario}
                      aria-expanded={aberto}
                      onClick={() => setProdutoAberto(aberto ? null : produto.id)}
                    >
                      {aberto ? 'Ocultar detalhes' : 'Ver detalhes'}
                    </button>
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

export default HistoricoProdutos;
