import { Titulo } from '@/modulos/usuario/paginas/impacto/componentes/Titulo.jsx';
import { Dashboard } from '@/modulos/usuario/paginas/impacto/componentes/Dashboard.jsx';
import styles from '@/modulos/usuario/paginas/impacto/estilos/Impacto.module.css';

export function Impacto() {
  return (
    <div className={styles.pagina}>
      <Titulo />
      <Dashboard />
    </div>
  );
}

export default Impacto;
