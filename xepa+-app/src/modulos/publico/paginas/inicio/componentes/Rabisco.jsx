// Sublinhado feito "à mão" embaixo de uma palavra do título.
// O traço se desenha quando o título (com data-revelar) aparece na tela.
export default function Rabisco({ children, cor = '#9bc000' }) {
  return (
    <span className="rabisco">
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M3 13 C 40 5, 80 4, 120 8 S 180 14, 197 6"
          pathLength="1"
          stroke={cor}
          strokeWidth="5"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
    </span>
  );
}
