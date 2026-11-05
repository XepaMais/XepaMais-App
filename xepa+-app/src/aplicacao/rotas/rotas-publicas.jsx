import { Route } from 'react-router-dom';
import HomePrincipal from '@/modulos/publico/paginas/inicio/HomePrincipal';
import SobreNos from '@/modulos/publico/paginas/sobre-nos/SobreNos';

export const rotasPublicas = [
  <Route key="inicio" path="/" element={<HomePrincipal />} />,
  <Route key="sobre-nos" path="/sobrenos" element={<SobreNos />} />,
  <Route key="nao-encontrada" path="*" element={<HomePrincipal />} />,
];
