import { useState } from 'react';
import { carregarXepasDisponiveis } from '@/compartilhado/servicos/xepas';
import { SecaoUm } from '@/modulos/usuario/paginas/inicio/componentes/SecaoUm.jsx';
import { SecaoDois } from '@/modulos/usuario/paginas/inicio/componentes/SecaoDois.jsx';
import { SecaoTres } from '@/modulos/usuario/paginas/inicio/componentes/SecaoTres.jsx';
import { SecaoQuatro } from '@/modulos/usuario/paginas/inicio/componentes/SecaoQuatro.jsx';

function HomeUsuario() {
  const [xepas] = useState(carregarXepasDisponiveis);
  const [categoria, setCategoria] = useState('');
  const [busca, setBusca] = useState('');

  return (
    <div>
      <SecaoUm
        xepas={xepas}
        categoria={categoria}
        aoEscolherCategoria={setCategoria}
        busca={busca}
        aoBuscar={setBusca}
      />
      <SecaoQuatro xepas={xepas} categoria={categoria} busca={busca} />
      <SecaoDois />
      <SecaoTres xepas={xepas} />
    </div>
  );
}

export default HomeUsuario;
