import { Link, useSearchParams } from 'react-router-dom';
import { Package } from 'lucide-react';
import { buscarXepa } from '@/compartilhado/servicos/xepas';
import ProdutoTopo from '@/modulos/usuario/paginas/detalhe-produto/componentes/ProdutoTopo.jsx';
import LocalizacaoPerfil from '@/modulos/usuario/paginas/detalhe-produto/componentes/LocalizacaoPerfil.jsx';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from '@/modulos/usuario/paginas/detalhe-produto/estilos/DetalheProduto.module.css';

function DetalheProduto() {
  const [parametros] = useSearchParams();
  const xepa = buscarXepa(parametros.get('xepa'));

  return (
    <div className={styles.pagina}>
      <main className={styles.conteudo}>
        {xepa ? (
          <>
            <ProdutoTopo xepa={xepa} />
            <LocalizacaoPerfil xepa={xepa} />
          </>
        ) : (
          <section className={base.vazio}>
            <Package size={44} aria-hidden="true" />
            <h2>Xepa não encontrada</h2>
            <p>Escolha uma das xepas disponíveis na página inicial.</p>
            <Link to="/homeU" className={base.botaoPrincipal}>
              Ver xepas
            </Link>
          </section>
        )}
      </main>
    </div>
  );
}

export default DetalheProduto;
