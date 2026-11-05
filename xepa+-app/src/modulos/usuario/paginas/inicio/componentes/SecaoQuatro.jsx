import { CATEGORIAS_XEPA } from '@/compartilhado/servicos/xepas';
import { CarrosselXepas } from '@/modulos/usuario/paginas/inicio/componentes/CarrosselXepas.jsx';
import style from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

export function SecaoQuatro({ xepas, categoria, busca }) {
  const termo = busca.trim().toLocaleLowerCase('pt-BR');
  const encontradas = xepas.filter((xepa) => {
    const texto = `${xepa.nome} ${xepa.itens || ''}`;

    return texto.toLocaleLowerCase('pt-BR').includes(termo);
  });

  // Sem filtro, mostra só as categorias que têm xepas, para não sobrar espaço vazio.
  let categorias = [categoria];

  if (!categoria) {
    categorias = CATEGORIAS_XEPA.filter((nome) =>
      encontradas.some((xepa) => xepa.categoria === nome),
    );
  }

  const mensagem = termo ? 'Nenhuma xepa encontrada.' : 'Nenhuma xepa disponível agora.';

  return (
    <div className={style.container}>
      {categorias.length === 0 && (
        <p className={`${style.semXepas} ${style.carrossel}`}>{mensagem}</p>
      )}

      {categorias.map((nome) => (
        <section key={nome} className={style.carrossel}>
          <h2 className={style.tituloSecao}>{nome}</h2>
          <CarrosselXepas
            xepas={encontradas.filter((xepa) => xepa.categoria === nome)}
            mensagemVazia={mensagem}
          />
        </section>
      ))}
    </div>
  );
}
