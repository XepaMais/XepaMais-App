import { Route } from 'react-router-dom';

import RecursoPlano from '@/modulos/feirante/componentes/RecursoPlano';

import HomeFeirante from '@/modulos/feirante/paginas/inicio/Home';
import Financeiro from '@/modulos/feirante/paginas/financeiro/Financeiro';
import AddGasto from '@/modulos/feirante/paginas/adicionar-gasto/AddGasto';
import AdicionarProduto from '@/modulos/feirante/paginas/adicionar-produto/AddProduto';
import AdicionarFeira from '@/modulos/feirante/paginas/adicionar-feira/AddFeira';
import HistoricoChat from '@/modulos/feirante/paginas/historico-chat/HistoricoChat';
import ChatIA from '@/modulos/feirante/paginas/chat-ia/ChatIA';
import PerfilFeirante from '@/modulos/feirante/paginas/perfil/PerfilFeirante';
import HistoricoVendas from '@/modulos/feirante/paginas/historico-vendas/HistoricoVendas';
import HistoricoProdutos from '@/modulos/feirante/paginas/historico-produtos/HistoricoProdutos';
import DispositivosFeirante from '@/modulos/feirante/paginas/dispositivos/DispositivosFeirante';
import Planos from '@/modulos/feirante/paginas/planos/Planos';
import Planilhas from '@/modulos/feirante/paginas/planilhas/Planilhas';

export const rotasFeirante = [
  <Route key="demo-feirante" path="/demo/feirante" element={<HomeFeirante />} />,
  <Route key="inicio-feirante" path="/homeF" element={<HomeFeirante />} />,
  <Route
    key="financeiro"
    path="/financeiro"
    element={
      <RecursoPlano recurso="financeiro">
        <Financeiro />
      </RecursoPlano>
    }
  />,

  <Route
    key="gastos"
    path="/adicionar-gasto"
    element={
      <RecursoPlano recurso="financeiro">
        <AddGasto />
      </RecursoPlano>
    }
  />,

  <Route key="adicionar-produto" path="/adicionar-produto" element={<AdicionarProduto />} />,
  <Route key="adicionar-feira" path="/adicionar-feira" element={<AdicionarFeira />} />,
  <Route
    key="chat-ia"
    path="/chat-ia"
    element={
      <RecursoPlano recurso="ia">
        <ChatIA />
      </RecursoPlano>
    }
  />,

  <Route key="historico-chat" path="/HistoricoChat" element={<HistoricoChat />} />,
  <Route key="historico-chat-usuario" path="/HistoricoChatUsuario" element={<HistoricoChat perfil="consumidor" />} />,

  <Route key="perfil-feirante" path="/perfil-feirante" element={<PerfilFeirante />} />,
  <Route key="historico-vendas" path="/historico-vendas" element={<HistoricoVendas />} />,
  <Route key="historico-produtos" path="/historico-produtos" element={<HistoricoProdutos />} />,
  <Route
    key="dispositivos-feirante"
    path="/dispositivos-feirante"
    element={<DispositivosFeirante />}
  />,
  
  <Route key="planos" path="/planos" element={<Planos />} />,
  <Route
    key="planilhas"
    path="/planilhas"
    element={
      <RecursoPlano recurso="planilhas">
        <Planilhas />
      </RecursoPlano>
    }
  />,
];
