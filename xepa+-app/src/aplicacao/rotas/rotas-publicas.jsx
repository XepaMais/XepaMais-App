import { Route } from 'react-router-dom';
import HomePrincipal from '@/modulos/publico/paginas/inicio/HomePrincipal';
import SobreNos from '@/modulos/publico/paginas/sobre-nos/SobreNos';
import XepAI from '@/components/footer/paginas/XepAI';
import Suporte from '@/components/footer/paginas/Suporte';
import SejaParceiro from '@/components/footer/paginas/SejaParceiro';

export const rotasPublicas = [
  <Route key="inicio" path="/" element={<HomePrincipal />} />,
  <Route key="sobre-nos" path="/sobrenos" element={<SobreNos />} />,
  <Route key="xep-ai" path="/xep-ai" element={<XepAI />} />,
  <Route key="suporte" path="/suporte" element={<Suporte />} />,
  <Route key="seja-parceiro" path="/seja-parceiro" element={<SejaParceiro />} />,
  <Route key="nao-encontrada" path="*" element={<HomePrincipal />} />,
];
