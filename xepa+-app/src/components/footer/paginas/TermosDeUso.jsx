import LayoutFooter from './LayoutFooter';
import DocumentoLegal from './DocumentoLegal';
import Styles from './estilos/TermosDeUso.module.css';

const SECOES = [
  {
    id: 'aceitacao',
    titulo: 'Aceitação dos termos',
    paragrafos: [
      'Ao acessar ou usar o Xepa+, você concorda com estes Termos de uso e com as nossas Diretrizes de Privacidade. Se não concordar com alguma condição, não utilize a plataforma.',
      'Estes termos valem para todas as pessoas que usam o Xepa+: consumidores, feirantes e visitantes.',
    ],
  },
  {
    id: 'o-que-e',
    titulo: 'O que é o Xepa+',
    paragrafos: [
      'O Xepa+ é uma plataforma que conecta feirantes e consumidores para combater o desperdício de alimentos, divulgando produtos frescos e xepas (produtos ainda bons para consumo, vendidos em condições especiais).',
      'O Xepa+ atua como intermediador. A qualidade, a quantidade, o preço e a entrega dos produtos são de responsabilidade de cada feirante.',
    ],
  },
  {
    id: 'cadastro',
    titulo: 'Cadastro e conta',
    itens: [
      'Para usar alguns recursos é preciso criar uma conta com informações verdadeiras e atualizadas.',
      'Você é responsável por manter sua senha em segredo e por todas as atividades feitas na sua conta.',
      'É necessário ter 18 anos ou mais, ou autorização de um responsável legal, para criar uma conta.',
      'Avise-nos imediatamente se perceber qualquer uso não autorizado da sua conta.',
    ],
  },
  {
    id: 'consumidores',
    titulo: 'Regras para consumidores',
    itens: [
      'Confira as informações do produto, o preço e o local de retirada antes de concluir um pedido.',
      'Retire ou receba os pedidos no prazo combinado com o feirante.',
      'Trate os feirantes com respeito nas conversas e avaliações.',
    ],
  },
  {
    id: 'feirantes',
    titulo: 'Regras para feirantes',
    itens: [
      'Cadastrar apenas produtos próprios para o consumo, com descrição, preço e fotos fiéis à realidade.',
      'Manter atualizados os dados da barraca, as feiras em que trabalha e os horários.',
      'Cumprir as normas sanitárias e a legislação aplicável à venda de alimentos.',
      'Honrar os pedidos confirmados e atender os consumidores com respeito.',
    ],
  },
  {
    id: 'pedidos-retirada',
    titulo: 'Pedidos, retirada e cancelamento',
    paragrafos: [
      'O pedido passa pelas situações: aguardando pagamento, pago, pronto para retirada, retirado ou cancelado.',
      'O consumidor retira na barraca, na janela definida pelo feirante, apresentando o código de retirada.',
      'Se o produto não estiver disponível ou não corresponder ao anunciado, o pedido é cancelado com estorno integral.',
      'Pedidos não retirados: o consumidor tem uma tolerância de 30 minutos após o fim da janela de retirada e recebe um lembrete pelo chat.',
      'Se o consumidor avisar pelo chat antes do fim da janela, o feirante pode combinar um novo horário no mesmo dia, enquanto estiver na feira.',
      'Encerrada a tolerância, o pedido é cancelado por não retirada e o feirante fica livre para vender os produtos na banca.',
      'Como os alimentos ficaram reservados e são perecíveis, o pedido não retirado não tem estorno; o feirante recebe o valor da venda, descontada a comissão do plano.',
      'Após três pedidos não retirados em 30 dias, a conta do consumidor fica impedida de fazer novos pedidos por 7 dias.',
    ],
  },
  {
    id: 'planos',
    titulo: 'Planos, pagamentos e comissões',
    paragrafos: [
      'O feirante pode escolher entre os planos Grátis, Crescer e Pro. Cada plano tem recursos e comissões sobre as vendas diferentes, conforme informado na página de planos.',
      'Os valores dos planos pagos são cobrados mensalmente. O feirante pode trocar ou cancelar o plano a qualquer momento; o cancelamento vale a partir do próximo período de cobrança.',
    ],
  },
  {
    id: 'proibicoes',
    titulo: 'O que não é permitido',
    itens: [
      'Publicar informações falsas, ofensivas, discriminatórias ou que violem direitos de terceiros.',
      'Vender produtos impróprios para consumo ou proibidos por lei.',
      'Usar a plataforma para fraudes, spam ou qualquer atividade ilegal.',
      'Tentar acessar áreas restritas, contas de outras pessoas ou interferir no funcionamento do Xepa+.',
    ],
  },
  {
    id: 'xep-ai',
    titulo: 'Uso da Xep.AI',
    paragrafos: [
      'A Xep.AI é uma assistente virtual que oferece sugestões com base nas informações da sua barraca. As respostas têm caráter informativo e não substituem orientação profissional financeira, contábil ou jurídica.',
    ],
  },
  {
    id: 'propriedade',
    titulo: 'Propriedade intelectual',
    paragrafos: [
      'A marca Xepa+, o logotipo, o layout e os conteúdos da plataforma pertencem ao Xepa+ e não podem ser copiados ou usados sem autorização.',
      'Ao publicar fotos e descrições de produtos, o feirante autoriza o Xepa+ a exibi-las na plataforma e em ações de divulgação.',
    ],
  },
  {
    id: 'responsabilidade',
    titulo: 'Limitação de responsabilidade',
    paragrafos: [
      'O Xepa+ se esforça para manter a plataforma disponível e segura, mas não garante funcionamento sem interrupções. Não nos responsabilizamos por negociações feitas diretamente entre consumidores e feirantes fora da plataforma.',
    ],
  },
  {
    id: 'suspensao',
    titulo: 'Suspensão e encerramento',
    paragrafos: [
      'Contas que descumprirem estes termos podem ser advertidas, suspensas ou encerradas. Você também pode encerrar sua conta quando quiser, entrando em contato com o suporte.',
    ],
  },
  {
    id: 'alteracoes',
    titulo: 'Alterações nos termos',
    paragrafos: [
      'Estes termos podem ser atualizados. Quando houver mudanças importantes, avisaremos pela plataforma. Continuar usando o Xepa+ após a atualização significa que você concorda com a nova versão.',
      'Estes termos seguem as leis da República Federativa do Brasil, incluindo o Código de Defesa do Consumidor.',
    ],
  },
];

function TermosDeUso() {
  return (
    <LayoutFooter
      estilos={Styles}
      etiqueta="Informações legais"
      titulo="Termos de uso"
      descricao="As regras para usar o Xepa+ com segurança e transparência, seja você consumidor ou feirante."
    >
      <DocumentoLegal atualizadoEm="11 de novembro de 2026" secoes={SECOES} estilos={Styles} />
    </LayoutFooter>
  );
}

export default TermosDeUso;
