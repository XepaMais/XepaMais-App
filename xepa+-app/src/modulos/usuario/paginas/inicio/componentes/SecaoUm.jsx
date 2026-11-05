import { Apple, Carrot, Leaf, ShoppingBasket } from 'lucide-react';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import { CATEGORIAS_XEPA } from '@/compartilhado/servicos/xepas';
import styles from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

const ICONES = {
  'Verduras e legumes': Carrot,
  Frutas: Apple,
  Tempero: Leaf,
  Completa: ShoppingBasket,
};

const fotoPerfil =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87vcRDaSDk6Z7vR5jmCT6D6MjnmwnSlErxCnIM9UTiohPBEba2PLbtaMC&s=10';

export function SecaoUm({ xepas, categoria, aoEscolherCategoria, busca, aoBuscar }) {
  const { perfil } = usePerfil('usuario');

  return (
    <section className={styles.secaoBoasVindas}>
      <div className={styles.topoCabecalho}>
        <h1>
          Seja bem vindo, <br />
          {perfil.nome}{' '}
        </h1>

        <img src={fotoPerfil} alt="Foto de perfil" className={styles.fotoPerfil} />
      </div>

      <input
        type="search"
        placeholder="O que você procura hoje?"
        aria-label="Buscar xepa"
        className={styles.barraPesquisa}
        value={busca}
        onChange={(evento) => aoBuscar(evento.target.value)}
      />

      <div className={styles.categorias}>
        {CATEGORIAS_XEPA.map((nome) => {
          const Icone = ICONES[nome];
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
              <Icone size={28} aria-hidden="true" />
              <strong>{nome}</strong>
              <span>{quantidade === 1 ? '1 xepa' : `${quantidade} xepas`}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
