import PerfilConta from '@/compartilhado/componentes/conta/PerfilConta';

const campos = [
  { id: 'nome', rotulo: 'Nome completo', obrigatorio: true, autoComplete: 'name' },
  { id: 'email', rotulo: 'E-mail', tipo: 'email', autoComplete: 'email' },
  {
    id: 'telefone',
    rotulo: 'Telefone',
    tipo: 'tel',
    autoComplete: 'tel',
    placeholder: '(11) 90000-0000',
  },
];

const informacoesConta = [{ rotulo: 'Tipo de conta', valor: 'Consumidor' }];

function Perfil() {
  return <PerfilConta tipo="usuario" campos={campos} informacoesConta={informacoesConta} />;
}

export default Perfil;
