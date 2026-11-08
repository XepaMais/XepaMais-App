import { Link } from 'react-router-dom';
import PerfilConta from '@/compartilhado/componentes/conta/PerfilConta';
import { PLANOS } from '@/compartilhado/dados/planos';
import { carregarPlanoSelecionado } from '@/modulos/feirante/servicos/planoFeirante';

// Mesmos campos das duas etapas do cadastro (a senha não aparece aqui).
const campos = [
  { id: 'nome', rotulo: 'Nome completo', obrigatorio: true, autoComplete: 'name' },
  { id: 'cpf', rotulo: 'CPF', placeholder: '000.000.000-00' },
  {
    id: 'telefone',
    rotulo: 'Telefone',
    tipo: 'tel',
    autoComplete: 'tel',
    placeholder: '(11) 90000-0000',
  },
  { id: 'nascimento', rotulo: 'Data de nascimento', tipo: 'date', autoComplete: 'bday' },
  { id: 'email', rotulo: 'E-mail', tipo: 'email', autoComplete: 'email' },
  { id: 'matricula', rotulo: 'Matrícula' },
  { id: 'validade', rotulo: 'Validade' },
  { id: 'cnpj', rotulo: 'CNPJ', placeholder: '00.000.000/0000-00' },
  { id: 'ccm', rotulo: 'CCM' },
  { id: 'titular', rotulo: 'Titular' },
  { id: 'barraca', rotulo: 'Nome fantasia', autoComplete: 'organization' },
  { id: 'grupo', rotulo: 'Grupo de comércio' },
];

function PerfilFeirante() {
  const plano = PLANOS.find((item) => item.id === carregarPlanoSelecionado());

  const informacoesConta = [
    { rotulo: 'Tipo de conta', valor: 'Feirante' },
    {
      rotulo: 'Plano',
      valor: <Link to="/planos">{plano ? plano.nome : 'Escolher um plano'}</Link>,
    },
  ];

  return <PerfilConta tipo="feirante" campos={campos} informacoesConta={informacoesConta} />;
}

export default PerfilFeirante;
