import { useEffect, useState } from 'react';
import { carregarFeiras, salvarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import '@/modulos/feirante/paginas/financeiro/financeiro.css';
import BarraPesquisa from '@/compartilhado/componentes/barra-pesquisa/BarraPesquisa';
import PopUpExcluir from '@/modulos/feirante/componentes/PopUpExcluir.jsx';
import PopUpAdicionarFeira from '@/modulos/feirante/paginas/adicionar-feira/componentes/PopUpAdicionarFeira.jsx';
import PopUpEditarFeira from '@/modulos/feirante/paginas/adicionar-feira/componentes/PopUpEditarFeira.jsx';
import styles from '@/modulos/feirante/paginas/adicionar-feira/estilos/AddFeira.module.css';
import { buscarCep } from '@/compartilhado/servicos/localizacao';
import { geocodificarEndereco } from '@/compartilhado/servicos/localizacao';
import MiniMapaFeiras from '@/modulos/feirante/paginas/adicionar-feira/componentes/MiniMapaFeiras.jsx'
geocodificarEndereco('Avenida Paulista, 1000, São Paulo - SP').then(console.log);
geocodificarEndereco('xyzxyz rua que nao existe 999').then(console.log);

buscarCep('01310-100').then(console.log);
buscarCep('99999-999').then(console.log);
buscarCep('123').then(console.log);

// Junta os dias e o horário em um único texto para o cartão.
function descreverDias(feira) {
  const partes = [];

  if (feira.dias.length > 0) partes.push(feira.dias.join(' e '));
  if (feira.horario) partes.push(feira.horario);

  return partes.length > 0 ? partes.join(' · ') : 'Não informado';
}

function textoDaBusca(feira) {
  const texto = `${feira.nome} ${feira.endereco} ${feira.funcionarios.join(' ')}`;

  return texto.toLocaleLowerCase('pt-BR');
}

function AddFeira() {
  const [busca, setBusca] = useState('');
  const [modal, setModal] = useState(null);
  const [feiras, setFeiras] = useState(carregarFeiras);

  useEffect(() => {
    salvarFeiras(feiras);
  }, [feiras]);

  function adicionarFeira(dados) {
    setFeiras([...feiras, { id: Date.now(), ...dados }]);
    setModal(null);
  }

  function editarFeira(dados) {
    const novasFeiras = feiras.map((feira) => {
      if (feira.id === modal.feira.id) {
        return { ...feira, ...dados };
      }

      return feira;
    });

    setFeiras(novasFeiras);
    setModal(null);
  }

  function excluirFeira() {
    setFeiras(feiras.filter((feira) => feira.id !== modal.feira.id));
    setModal(null);
  }

  const termo = busca.trim().toLocaleLowerCase('pt-BR');
  const feirasFiltradas = feiras.filter((feira) => textoDaBusca(feira).includes(termo));
  const tipoModal = modal ? modal.tipo : null;

  return (
    <div className={`${styles.pagina} pagina-financeiro`}>
      <main className={styles.conteudo}>
        <section className="titulo">
          <div>
            <h1>Onde Você Trabalha?</h1>
            <p className={styles.descricaoUmaLinha}>
              Cadastre as feiras onde você trabalha para que os consumidores encontrem sua barraca.
            </p>
          </div>
          <div className="botoes">
            <button type="button" onClick={() => setModal({ tipo: 'adicionar' })}>
              <Plus size={18} aria-hidden="true" />
              Adicionar feira
            </button>
          </div>
        </section>

        <section aria-labelledby="tituloFeiras">
          <BarraPesquisa
            className={styles.busca}
            valor={busca}
            aoMudar={setBusca}
            placeholder="Buscar feira ou endereço"
            rotulo="Buscar feira ou endereço"
          />

          <h2 id="tituloFeiras" className={`${styles.tituloLista} titulo-cartao`}>
            Minhas Feiras Cadastradas:
          </h2>
          <div className={styles.lista}>
            {feirasFiltradas.map((feira) => (
              <article className={styles.cartaoFeira} key={feira.id}>
                <div className={styles.dado}>
                  <h3>Nome Feira</h3>
                  <p>{feira.nome}</p>
                </div>
                <div className={styles.dado}>
                  <h3>Endereço</h3>
                  <p>
                    {feira.endereco}
                    {feira.cep && ` · CEP ${feira.cep}`}
                  </p>
                </div>
                <div className={styles.dado}>
                  <h3>Dias de Trabalho</h3>
                  <p>{descreverDias(feira)}</p>
                </div>
                <div className={styles.dado}>
                  <h3>Funcionários</h3>
                  <p>{feira.funcionarios.join('; ')}</p>
                </div>
                <div className={styles.acoesCartao}>
                  <button
                    type="button"
                    className={styles.botaoEditar}
                    aria-label={`Editar ${feira.nome}`}
                    onClick={() => setModal({ tipo: 'editar', feira })}
                  >
                    <Pencil size={18} aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className={styles.botaoExcluir}
                    aria-label={`Excluir ${feira.nome}`}
                    onClick={() => setModal({ tipo: 'excluir', feira })}
                  >
                    <Trash2 size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
            {feirasFiltradas.length === 0 && (
              <p className={styles.semResultados}>
                {feiras.length === 0 ? 'Nenhuma feira cadastrada.' : 'Nenhuma feira encontrada.'}
              </p>
            )}
          </div>
          <MiniMapaFeiras feiras={feiras} />
        </section>
      </main>

      <PopUpAdicionarFeira
        aberto={tipoModal === 'adicionar'}
        onFechar={() => setModal(null)}
        onSalvar={adicionarFeira}
      />
      <PopUpEditarFeira
        aberto={tipoModal === 'editar'}
        feira={modal && modal.feira}
        onFechar={() => setModal(null)}
        onSalvar={editarFeira}
      />
      {tipoModal === 'excluir' && (
        <PopUpExcluir
          titulo="Excluir feira"
          nome={modal.feira.nome}
          aviso="será excluída. Xepas, rendas e despesas já registrados continuam com o nome dela."
          onFechar={() => setModal(null)}
          onConfirmar={excluirFeira}
        />
      )}
    </div>
  );
}

export default AddFeira;
