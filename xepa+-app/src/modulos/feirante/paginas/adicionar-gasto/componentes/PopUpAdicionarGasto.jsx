import FormularioGasto from './FormularioGasto.jsx';

function PopUpAdicionarGasto({ aberto, onFechar, onSalvar }) {
  if (!aberto) return null;

  return <FormularioGasto modo="adicionar" onFechar={onFechar} onSalvar={onSalvar} />;
}

export default PopUpAdicionarGasto;
