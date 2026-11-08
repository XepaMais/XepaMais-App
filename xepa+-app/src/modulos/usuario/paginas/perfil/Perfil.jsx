import PerfilConta from '@/compartilhado/componentes/conta/PerfilConta';

// Mesmos campos do cadastro (a senha não aparece aqui).
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
];

const informacoesConta = [{ rotulo: 'Tipo de conta', valor: 'Consumidor' }];

function Perfil() {
  return <PerfilConta tipo="usuario" campos={campos} informacoesConta={informacoesConta} />;
}

export default Perfil;
