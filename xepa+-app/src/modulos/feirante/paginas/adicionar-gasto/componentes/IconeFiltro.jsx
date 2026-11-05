// Ícone de filtro do campo de busca (três linhas alinhadas à direita)
function IconeFiltro({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 2h20M9 8h13M16 14h6" />
    </svg>
  );
}

export default IconeFiltro;
