import LayoutFooter from './LayoutFooter';
import DocumentoLegal from './DocumentoLegal';
import Styles from './estilos/DiretrizesPrivacidade.module.css';

const SECOES = [
  {
    id: 'introducao',
    titulo: 'Nosso compromisso',
    paragrafos: [
      'O Xepa+ respeita a sua privacidade. Estas diretrizes explicam quais dados coletamos, por que coletamos e como você pode controlá-los, de acordo com a Lei Geral de Proteção de Dados (LGPD – Lei nº 13.709/2018).',
    ],
  },
  {
    id: 'dados-coletados',
    titulo: 'Dados que coletamos',
    itens: [
      'Dados de cadastro: nome, CPF, telefone, data de nascimento, e-mail e senha.',
      'Dados do feirante: matrícula, nome da barraca, feiras em que trabalha, produtos, vendas e gastos registrados.',
      'Dados de localização: usados para mostrar feiras e barracas próximas, apenas quando você autoriza.',
      'Dados de uso: pedidos, conversas no chat, mensagens enviadas à Xep.AI e dispositivos conectados à conta.',
    ],
  },
  {
    id: 'finalidade',
    titulo: 'Como usamos seus dados',
    itens: [
      'Criar e manter sua conta e permitir o acesso à plataforma.',
      'Conectar consumidores a feirantes e mostrar feiras e xepas próximas.',
      'Processar pedidos e oferecer os recursos de gestão financeira dos planos.',
      'Gerar respostas personalizadas da Xep.AI com base nas informações da barraca.',
      'Enviar avisos importantes sobre a conta, pedidos e mudanças na plataforma.',
      'Melhorar o Xepa+ e prevenir fraudes e usos indevidos.',
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
    id: 'compartilhamento',
    titulo: 'Compartilhamento de dados',
    paragrafos: [
      'Não vendemos seus dados pessoais. Compartilhamos apenas o necessário para a plataforma funcionar:',
    ],
    itens: [
      'Entre consumidor e feirante, para que um pedido possa ser combinado e entregue.',
      'Com prestadores de serviço, como hospedagem, mapas e meios de pagamento, que seguem regras de proteção de dados.',
      'Com autoridades públicas, quando exigido por lei ou ordem judicial.',
    ],
  },
  {
    id: 'cookies',
    titulo: 'Cookies e armazenamento local',
    paragrafos: [
      'Usamos cookies e o armazenamento do navegador para manter você conectado, lembrar preferências (como o plano escolhido e os itens do carrinho) e entender como a plataforma é usada. Você pode limpar esses dados nas configurações do seu navegador.',
    ],
  },
  {
    id: 'seguranca',
    titulo: 'Segurança',
    paragrafos: [
      'Adotamos medidas técnicas e organizacionais para proteger seus dados contra acessos não autorizados, perda ou alteração. Mesmo assim, nenhum sistema é totalmente imune a riscos; por isso, mantenha sua senha em segredo e desconecte dispositivos que você não reconhece.',
    ],
  },
  {
    id: 'retencao',
    titulo: 'Por quanto tempo guardamos',
    paragrafos: [
      'Guardamos seus dados enquanto sua conta estiver ativa ou pelo tempo necessário para cumprir obrigações legais. Depois disso, os dados são excluídos ou tornados anônimos.',
    ],
  },
  {
    id: 'direitos',
    titulo: 'Seus direitos',
    paragrafos: ['Pela LGPD, você pode a qualquer momento:'],
    itens: [
      'Confirmar se tratamos seus dados e acessá-los.',
      'Corrigir dados incompletos, inexatos ou desatualizados.',
      'Pedir a exclusão, o bloqueio ou a anonimização de dados desnecessários.',
      'Solicitar a portabilidade dos seus dados.',
      'Revogar o consentimento dado anteriormente.',
    ],
  },
  {
    id: 'menores',
    titulo: 'Crianças e adolescentes',
    paragrafos: [
      'O Xepa+ não é destinado a menores de 18 anos sem a autorização de um responsável legal. Se identificarmos dados de menores coletados sem essa autorização, eles serão excluídos.',
    ],
  },
  {
    id: 'atualizacoes',
    titulo: 'Atualizações destas diretrizes',
    paragrafos: [
      'Estas diretrizes podem ser atualizadas para refletir melhorias na plataforma ou mudanças na lei. Avisaremos sobre alterações importantes pela própria plataforma.',
      'Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato pelo e-mail indicado abaixo.',
    ],
  },
];

function DiretrizesPrivacidade() {
  return (
    <LayoutFooter
      estilos={Styles}
      etiqueta="Informações legais"
      titulo="Diretrizes de Privacidade"
      descricao="Como o Xepa+ coleta, usa e protege os seus dados pessoais."
    >
      <DocumentoLegal atualizadoEm="11 de novembro de 2026" secoes={SECOES} estilos={Styles} />
    </LayoutFooter>
  );
}

export default DiretrizesPrivacidade;
