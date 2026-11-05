import { Link } from 'react-router-dom';
import PerfilConta from '@/compartilhado/componentes/conta/PerfilConta';
import { PLANOS } from '@/compartilhado/dados/planos';
import { carregarPlanoSelecionado } from '@/modulos/feirante/servicos/planoFeirante';

const campos = [
  { id: 'nome', rotulo: 'Nome do feirante', obrigatorio: true, autoComplete: 'name' },
  { id: 'barraca', rotulo: 'Nome da barraca ou estabelecimento', autoComplete: 'organization' },
  { id: 'email', rotulo: 'E-mail', tipo: 'email', autoComplete: 'email' },
  {
    id: 'telefone',
    rotulo: 'Telefone',
    tipo: 'tel',
    autoComplete: 'tel',
    placeholder: '(11) 90000-0000',
  },
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
