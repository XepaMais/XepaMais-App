// Planos do Xepa+, usados na Home pública e na área do feirante.

export const PLANOS = [
  {
    id: 'gratis',
    nome: 'Grátis',
    preco: 'R$ 0,00',
    periodo: '',
    descricao:
      'Ideal para quem está começando agora e quer dar os primeiros passos sem nenhum investimento inicial.',
    beneficios: [
      'Cadastro de barraca/feirante',
      'Perfil básico',
      'Comissão de 15% sobre as vendas',
    ],
  },
  {
    id: 'crescer',
    nome: 'Crescer',
    preco: 'R$ 29,90',
    periodo: '/mês',
    descricao:
      'Perfeito para negócios em expansão que precisam de mais flexibilidade e recursos avançados.',
    beneficios: [
      'Recursos básicos de gestão financeira',
      'Acesso ao Xep.AI',
      'Suporte via chat',
      'Comissão de 8% sobre as vendas',
    ],
  },
  {
    id: 'pro',
    nome: 'Pro',
    preco: 'R$ 59,90',
    periodo: '/mês',
    descricao:
      'A solução completa para feirante que busca alta performance, controle total e máxima produtividade.',
    beneficios: [
      'Gestão financeira completa',
      'Acesso ao Xep.AI',
      'Suporte prioritário via chat',
      'Comissão de 5% sobre as vendas',
    ],
  },
];
