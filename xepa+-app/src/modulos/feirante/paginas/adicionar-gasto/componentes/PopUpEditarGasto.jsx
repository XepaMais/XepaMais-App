import FormularioGasto from './FormularioGasto.jsx';

function PopUpEditarGasto({ aberto, gasto, onFechar, onSalvar }) {
  if (!aberto) return null;

  return <FormularioGasto modo="editar" gasto={gasto} onFechar={onFechar} onSalvar={onSalvar} />;
}

export default PopUpEditarGasto;
