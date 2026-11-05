import FormularioFeira from './FormularioFeira.jsx';

function PopUpEditarFeira({ aberto, feira, onFechar, onSalvar }) {
  if (!aberto) return null;

  return <FormularioFeira modo="editar" feira={feira} onFechar={onFechar} onSalvar={onSalvar} />;
}

export default PopUpEditarFeira;
