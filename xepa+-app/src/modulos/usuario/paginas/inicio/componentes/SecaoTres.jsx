import { useNavigate } from 'react-router-dom';
import { CalendarDays, MapPin } from 'lucide-react';
import styles from '@/modulos/usuario/paginas/inicio/estilos/Home.module.css';

// Mostra apenas as feiras que têm xepas disponíveis agora.
function agruparPorFeira(xepas) {
  const feiras = [];

  for (const xepa of xepas) {
    if (!xepa.feira) continue;

    let feira = feiras.find((item) => item.nome === xepa.feira);

    if (!feira) {
      feira = { nome: xepa.feira, local: xepa.local, dias: xepa.dias, total: 0 };
      feiras.push(feira);
    }

    feira.total += 1;
  }

  return feiras;
}

export function SecaoTres({ xepas }) {
  const navigate = useNavigate();
  const feiras = agruparPorFeira(xepas);

  if (feiras.length === 0) return null;

  return (
    <section className={styles.secaoXepasPerto}>
      <h2 className={styles.tituloSecao}>Feiras com xepas</h2>

      <div className={styles.containerCardsXepas}>
        {feiras.map((feira) => (
          <article className={styles.cardFeira} key={feira.nome}>
            <h3>{feira.nome}</h3>
            <p>
              <MapPin size={18} aria-hidden="true" /> {feira.local}
            </p>
            {feira.dias && feira.dias.length > 0 && (
              <p>
                <CalendarDays size={18} aria-hidden="true" /> {feira.dias.join(' e ')}
              </p>
            )}
            <span className={styles.selo}>
              {feira.total === 1 ? '1 xepa disponível' : `${feira.total} xepas disponíveis`}
            </span>
            <button
              type="button"
              className={styles.botaoSecundario}
              onClick={() => navigate('/mapa')}
            >
              Ver no Mapa
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
