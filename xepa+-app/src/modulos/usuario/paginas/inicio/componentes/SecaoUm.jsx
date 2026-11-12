import usePerfil from '@/compartilhado/hooks/usePerfil';
import { CATEGORIAS_XEPA } from '@/compartilhado/servicos/xepas';
import styles from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';
import BarraPesquisa from '@/compartilhado/componentes/barra-pesquisa/BarraPesquisa';

export function Saudacao() {
  const { perfil } = usePerfil('usuario');

  return (
    <section className={styles.saudacao}>
      <h1>Seja bem vindo, {perfil.nome}</h1>
    </section>
  );
}

export function SecaoUm({ xepas, categoria, aoEscolherCategoria, busca, aoBuscar }) {
  return (
    <section className={styles.secaoBoasVindas}>
      <BarraPesquisa
        valor={busca}
        aoMudar={aoBuscar}
        placeholder="O que você procura hoje?"
        rotulo="Buscar xepa"
      />

      <div className={styles.categorias}>
        {CATEGORIAS_XEPA.map((nome) => {
          const quantidade = xepas.filter((xepa) => xepa.categoria === nome).length;
          const ativa = categoria === nome;

          return (
            <button
              key={nome}
              type="button"
              className={ativa ? styles.categoriaAtiva : styles.categoria}
              aria-pressed={ativa}
              onClick={() => aoEscolherCategoria(ativa ? '' : nome)}
            >
              <strong>{nome}</strong>
              <span>{quantidade === 1 ? '1 xepa' : `${quantidade} xepas`}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
