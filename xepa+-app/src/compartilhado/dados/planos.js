// Planos do Xepa+, usados na Home pública e na área do feirante.
// taxa: comissão do Xepa+ descontada de cada venda de xepa feita pelo app.

export const PLANOS = [
  {
    id: 'gratis',
    nome: 'Grátis',
    preco: 'R$ 0,00',
    periodo: '',
    taxa: 0.15,
    descricao:
      'Ideal para quem está começando agora e quer dar os primeiros passos sem nenhum investimento inicial.',
    beneficios: [
      'Comissão de 15% sobre as vendas',
      'Cadastro de barraca/feirante',
      'Perfil básico',
    ],
  },
  {
    id: 'crescer',
    nome: 'Crescer',
    preco: 'R$ 29,90',
    periodo: '/mês',
    taxa: 0.08,
    descricao:
      'Perfeito para negócios em expansão que precisam de mais flexibilidade e recursos avançados.',
    beneficios: [
      'Comissão de 8% sobre as vendas',
      'Recursos básicos de gestão financeira',
      'Acesso ao Xep.AI',
      'Suporte via chat',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    preco: 'R$ 59,90',
    periodo: '/mês',
    taxa: 0.05,
    descricao:
      'A solução completa para feirante que busca alta performance, controle total e máxima produtividade.',
    beneficios: [
      'Comissão de 5% sobre as vendas',
      'Gestão financeira completa',
      'Acesso ao Xep.AI',
      'Suporte prioritário via chat',
    ],
  },
];
