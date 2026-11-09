import { useState } from 'react';
import FotoPerfil from './FotoPerfil';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './PerfilConta.module.css';

// Diminui a foto antes de salvar, para caber no armazenamento do navegador.
function reduzirFoto(arquivo, aoTerminar) {
  const imagem = new Image();

  imagem.onload = () => {
    const tamanho = 200;
    const canvas = document.createElement('canvas');
    const lado = Math.min(imagem.width, imagem.height);

    canvas.width = tamanho;
    canvas.height = tamanho;
    // Corta um quadrado do centro da imagem.
    canvas
      .getContext('2d')
      .drawImage(
        imagem,
        (imagem.width - lado) / 2,
        (imagem.height - lado) / 2,
        lado,
        lado,
        0,
        0,
        tamanho,
        tamanho,
      );

    URL.revokeObjectURL(imagem.src);
    aoTerminar(canvas.toDataURL('image/jpeg', 0.85));
  };

  imagem.src = URL.createObjectURL(arquivo);
}

// Mesmo visual para usuário e feirante: cada área informa seus próprios campos.
function PerfilConta({ tipo, campos, informacoesConta }) {
  const { perfil, salvar } = usePerfil(tipo);
  const [rascunho, setRascunho] = useState(null);
  const [salvo, setSalvo] = useState(false);

  const editando = rascunho !== null;

  function editar() {
    setRascunho(perfil);
    setSalvo(false);
  }

  function alterarCampo(evento) {
    setRascunho({ ...rascunho, [evento.target.name]: evento.target.value });
  }

  // A foto é salva na hora, sem precisar clicar em "Editar perfil".
  function escolherFoto(evento) {
    const arquivo = evento.target.files[0];
    evento.target.value = '';

    if (!arquivo) return;

    reduzirFoto(arquivo, (foto) => {
      salvar({ ...perfil, foto });
      setSalvo(true);
    });
  }

  function removerFoto() {
    salvar({ ...perfil, foto: '' });
    setSalvo(true);
  }

  function salvarAlteracoes(evento) {
    evento.preventDefault();

    const dados = { ...rascunho };
    for (const campo of campos) {
      dados[campo.id] = rascunho[campo.id].trim();
    }

    salvar(dados);
    setRascunho(null);
    setSalvo(true);
  }

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Meus dados</h1>
          <p>Consulte e atualize as informações da sua conta.</p>
        </div>
      </header>

     

      {salvo && (
        <p className={base.sucesso} role="status">
          Alterações salvas.
        </p>
      )}

      <section className={`${base.card} ${styles.identificacao}`}>
        <FotoPerfil nome={perfil.nome} foto={perfil.foto} tamanho={80} />

        <div className={styles.identificacaoTexto}>
          <strong>{perfil.nome}</strong>
          <span>{perfil.email || 'E-mail não informado'}</span>

          <div className={styles.acoesFoto}>
            <label className={styles.botaoFoto}>
              {perfil.foto ? 'Trocar foto' : 'Adicionar foto'}
              <input
                type="file"
                accept="image/*"
                className={styles.inputFoto}
                onChange={escolherFoto}
              />
            </label>

            {perfil.foto && (
              <button type="button" className={styles.botaoRemoverFoto} onClick={removerFoto}>
                Remover foto
              </button>
            )}
          </div>
        </div>

        {!editando && (
          <button type="button" className={base.botaoPrincipal} onClick={editar}>
            Editar perfil
          </button>
        )}
      </section>

      <h2 className={base.tituloSecao}>Informações pessoais</h2>

      <section className={base.card}>
        <div className={base.corpo}>
          {editando ? (
            <form onSubmit={salvarAlteracoes}>
              <div className={base.campos}>
                {campos.map((campo) => (
                  <div className={base.campo} key={campo.id}>
                    <label htmlFor={campo.id}>{campo.rotulo}</label>
                    <input
                      id={campo.id}
                      name={campo.id}
                      type={campo.tipo || 'text'}
                      autoComplete={campo.autoComplete}
                      placeholder={campo.placeholder}
                      value={rascunho[campo.id]}
                      onChange={alterarCampo}
                      required={campo.obrigatorio}
                    />
                  </div>
                ))}
              </div>

              <div className={base.acoes}>
                <button type="submit" className={base.botaoPrincipal}>
                  Salvar alterações
                </button>
                <button
                  type="button"
                  className={base.botaoSecundario}
                  onClick={() => setRascunho(null)}
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <div>
              {campos.map((campo) => (
                <div className={base.linhaDado} key={campo.id}>
                  <span className={base.rotuloDado}>{campo.rotulo}</span>
                  <span className={perfil[campo.id] ? base.valorDado : base.naoInformado}>
                    {perfil[campo.id] || 'Não informado'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <h2 className={base.tituloSecao}>Informações da conta</h2>

      <section className={base.card}>
        <div className={base.corpo}>
          {informacoesConta.map((info) => (
            <div className={base.linhaDado} key={info.rotulo}>
              <span className={base.rotuloDado}>{info.rotulo}</span>
              <span className={base.valorDado}>{info.valor}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default PerfilConta;
