import FormularioFeira from './FormularioFeira.jsx';

function PopUpAdicionarFeira({ aberto, onFechar, onSalvar }) {
  if (!aberto) return null;

  return <FormularioFeira modo="adicionar" onFechar={onFechar} onSalvar={onSalvar} />;
}

export default PopUpAdicionarFeira;
