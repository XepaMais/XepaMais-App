import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { formatarMoeda } from '@/compartilhado/servicos/pedidos';
import useCarrinho from '@/modulos/usuario/hooks/useCarrinho';
import { adicionarAoCarrinho, removerDoCarrinho } from '@/modulos/usuario/servicos/carrinho';
import imagemPadrao from '@/assets/imagens/gerais/xepaCompleta.jpg';
import style from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

export function CardXepa({ xepa }) {
  const { estaNoCarrinho } = useCarrinho();
  const noCarrinho = estaNoCarrinho(xepa.id);

  return (
    <article className={style.cardXepa}>
      <Link to={`/Verduras?xepa=${xepa.id}`} className={style.linkCard}>
        <img className={style.imagem} src={xepa.imagem || imagemPadrao} alt="" />
        <h3 className={style.titulo}>{xepa.nome}</h3>
        <strong className={style.preco}>{formatarMoeda(xepa.preco)}</strong>
        <span className={style.local}>
          <MapPin size={16} aria-hidden="true" />
          {xepa.feira || xepa.local}
        </span>
      </Link>

      {noCarrinho ? (
        <button
          type="button"
          className={style.botaoRemover}
          onClick={() => removerDoCarrinho(xepa.id)}
        >
          Remover do carrinho
        </button>
      ) : (
        <button
          type="button"
          className={style.botaoPrincipal}
          onClick={() => adicionarAoCarrinho(xepa.id)}
        >
          Adicionar ao carrinho
        </button>
      )}
    </article>
  );
}
