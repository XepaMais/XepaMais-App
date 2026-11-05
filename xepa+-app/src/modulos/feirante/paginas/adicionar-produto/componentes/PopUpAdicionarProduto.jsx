import { useState } from 'react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import usePerfil from '@/compartilhado/hooks/usePerfil';
import { CATEGORIAS_XEPA } from '@/compartilhado/servicos/xepas';
import base from '@/compartilhado/componentes/modal/Modal.module.css';
import { adicionarProduto, reduzirImagem } from '@/modulos/feirante/servicos/produtosFeirante';
import styles from '@/modulos/feirante/paginas/adicionar-produto/estilos/AddProduto.module.css';

const TAMANHO_MAXIMO_IMAGEM = 30 * 1024 * 1024;

function PopUpAdicionarProduto({ feira, onFechar, onSalvo }) {
  const [imagem, setImagem] = useState(null);
  const [erro, setErro] = useState('');
  const { perfil } = usePerfil('feirante');

  function selecionarImagem(evento) {
    const arquivo = evento.target.files[0];

    if (!arquivo) return;

    if (arquivo.size > TAMANHO_MAXIMO_IMAGEM) {
      setErro('A imagem deve ter no máximo 30 MB.');
      evento.target.value = '';
      return;
    }

    setErro('');
    setImagem(arquivo);
  }

  async function salvar(evento) {
    evento.preventDefault();

    const formulario = evento.currentTarget;
    const dados = new FormData(formulario);
    let imagemSalva = '';

    if (imagem) {
      try {
        imagemSalva = await reduzirImagem(imagem);
      } catch {
        setErro('Não foi possível ler essa imagem. Escolha outro arquivo.');
        return;
      }
    }

    const salvou = adicionarProduto({
      nome: dados.get('nome').trim(),
      categoria: dados.get('categoria'),
      itens: dados.get('itens').trim(),
      preco: Number(dados.get('preco')),
      quantidade: Number(dados.get('quantidade')),
      validade: dados.get('validade'),
      local: dados.get('local').trim(),
      descricao: dados.get('descricao').trim(),
      imagem: imagemSalva,
      feira: feira.nome,
      dias: feira.dias,
      horario: feira.horario || '',
      cep: feira.cep || '',
      feirante: perfil.nome,
      barraca: perfil.barraca,
    });

    if (!salvou) {
      setErro('Não há mais espaço no navegador para salvar este produto.');
      return;
    }

    onSalvo(feira);
  }

  return (
    <Modal
      titulo="Vamos adicionar seu produto!"
      descricao={`Preencha os dados abaixo para cadastrar um novo produto na feira ${feira.nome}.`}
      aoFechar={onFechar}
    >
      <form className={base.form} onSubmit={salvar}>
        <div className={base.grade}>
          <div className={base.campo}>
            <label htmlFor="nome">Nome do Produto</label>
            <input id="nome" name="nome" required />
          </div>

          <div className={base.campo}>
            <label htmlFor="categoria">Categoria do Produto</label>
            <select id="categoria" name="categoria" required defaultValue="">
              <option value="" disabled>
                Selecione uma categoria
              </option>
              {CATEGORIAS_XEPA.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {categoria}
                </option>
              ))}
            </select>
          </div>

          <div className={base.campo}>
            <label htmlFor="preco">Preço</label>
            <input id="preco" name="preco" type="number" min="0.01" step="0.01" required />
          </div>

          <div className={base.campo}>
            <label htmlFor="quantidade">Quantidade disponível</label>
            <input id="quantidade" name="quantidade" type="number" min="1" step="1" required />
          </div>

          <div className={base.campo}>
            <label htmlFor="validade">Validade Estimada</label>
            <input id="validade" name="validade" type="date" required />
          </div>

          <div className={base.campo}>
            <label htmlFor="local">Local de retirada</label>
            <input id="local" name="local" defaultValue={feira.endereco} required />
          </div>
        </div>

        <div className={base.campo}>
          <label htmlFor="itens">O que vem na xepa</label>
          <input id="itens" name="itens" placeholder="Alface, brócolis, batata..." required />
        </div>

        <div className={base.campo}>
          <span className={base.subtitulo}>Imagem do Produto</span>
          <div className={styles.upload}>
            <p>Envie uma foto clara. PNG, JPG e outros formatos, com no máximo 30 MB.</p>
            <label className={styles.botaoImagem}>
              Adicionar Imagem
              <input
                type="file"
                name="imagem"
                accept="image/*"
                onChange={selecionarImagem}
                hidden
              />
            </label>
            {imagem && <p>Imagem selecionada: {imagem.name}</p>}
          </div>
        </div>

        <div className={base.campo}>
          <label htmlFor="descricao">Descrição do Produto</label>
          <textarea
            id="descricao"
            name="descricao"
            placeholder="Frescor, origem, peso ou quantidade disponível."
            rows="4"
            required
          />
        </div>

        {erro && (
          <p className={styles.mensagemErro} role="alert">
            {erro}
          </p>
        )}

        <div className={base.acoes}>
          <button type="button" className={base.secundario} onClick={onFechar}>
            Cancelar
          </button>
          <button type="submit" className={base.principal}>
            Salvar produto
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default PopUpAdicionarProduto;
