// Cadastro de produtos do feirante. A lista é compartilhada com a área do consumidor.
import { carregarXepas, salvarXepas } from '@/compartilhado/servicos/xepas';

const LARGURA_MAXIMA_IMAGEM = 480;

export const carregarProdutos = carregarXepas;

// Retorna false quando o navegador não tem mais espaço para guardar o produto.
export function adicionarProduto(produto) {
  const novoProduto = {
    ...produto,
    id: Date.now(),
    cadastradoEm: new Date().toISOString(),
  };

  try {
    salvarXepas([novoProduto, ...carregarXepas()]);
    return true;
  } catch {
    return false;
  }
}

// Reduz a foto antes de salvar, porque o localStorage tem pouco espaço.
export function reduzirImagem(arquivo) {
  return new Promise((resolve, reject) => {
    const imagem = new Image();
    const endereco = URL.createObjectURL(arquivo);

    imagem.onload = () => {
      const escala = Math.min(1, LARGURA_MAXIMA_IMAGEM / imagem.width);
      const canvas = document.createElement('canvas');
      canvas.width = imagem.width * escala;
      canvas.height = imagem.height * escala;
      canvas.getContext('2d').drawImage(imagem, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(endereco);
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };

    imagem.onerror = () => {
      URL.revokeObjectURL(endereco);
      reject(new Error('Imagem inválida'));
    };

    imagem.src = endereco;
  });
}
