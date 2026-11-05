import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, MapPin, Store } from 'lucide-react';
import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import PopUpAdicionarProduto from '@/modulos/feirante/paginas/adicionar-produto/componentes/PopUpAdicionarProduto.jsx';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from '@/modulos/feirante/paginas/adicionar-produto/estilos/AddProduto.module.css';

function AddProduto() {
  const [feiras] = useState(carregarFeiras);
  const [feiraSelecionada, setFeiraSelecionada] = useState(null);
  const [feiraDoUltimoProduto, setFeiraDoUltimoProduto] = useState(null);

  function aoSalvarProduto(feira) {
    setFeiraSelecionada(null);
    setFeiraDoUltimoProduto(feira);
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Produtos</h1>
          <p>Escolha a feira em que o produto será vendido.</p>
        </div>
        <Link to="/historico-produtos" className={base.botaoSecundario}>
          Ver histórico
        </Link>
      </header>

      {feiraDoUltimoProduto && (
        <p className={base.sucesso} role="status">
          Produto cadastrado na feira {feiraDoUltimoProduto.nome}.
        </p>
      )}

      {feiras.length === 0 ? (
        <section className={base.vazio}>
          <Store size={44} aria-hidden="true" />
          <h2>Nenhuma feira cadastrada</h2>
          <p>Cadastre uma feira para poder adicionar produtos a ela.</p>
          <Link to="/adicionar-feira" className={base.botaoPrincipal}>
            Cadastrar feira
          </Link>
        </section>
      ) : (
        <div className={styles.feiras}>
          {feiras.map((feira) => (
            <article className={styles.cartaoFeira} key={feira.id}>
              <h2>{feira.nome}</h2>

              <p>
                <MapPin size={18} aria-hidden="true" />
                {feira.endereco}
                {feira.cep && ` · CEP ${feira.cep}`}
              </p>

              <p>
                <CalendarDays size={18} aria-hidden="true" />
                {feira.dias.length > 0 ? feira.dias.join(' e ') : 'Dias não informados'}
              </p>

              {feira.horario && (
                <p>
                  <Clock size={18} aria-hidden="true" />
                  {feira.horario}
                </p>
              )}

              <button
                type="button"
                className={base.botaoPrincipal}
                onClick={() => setFeiraSelecionada(feira)}
              >
                + Adicionar produto
              </button>
            </article>
          ))}
        </div>
      )}

      {feiraSelecionada && (
        <PopUpAdicionarProduto
          feira={feiraSelecionada}
          onFechar={() => setFeiraSelecionada(null)}
          onSalvo={aoSalvarProduto}
        />
      )}
    </main>
  );
}

export default AddProduto;
