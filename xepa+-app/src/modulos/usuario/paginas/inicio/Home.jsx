import { useState } from 'react';
import { carregarXepasDisponiveis } from '@/compartilhado/servicos/xepas';
import { Saudacao, SecaoUm } from '@/modulos/usuario/paginas/inicio/componentes/SecaoUm.jsx';
import { SecaoDois } from '@/modulos/usuario/paginas/inicio/componentes/SecaoDois.jsx';
import { SecaoTres } from '@/modulos/usuario/paginas/inicio/componentes/SecaoTres.jsx';
import { SecaoQuatro } from '@/modulos/usuario/paginas/inicio/componentes/SecaoQuatro.jsx';

function HomeUsuario() {
  const [xepas] = useState(carregarXepasDisponiveis);
  const [categoria, setCategoria] = useState('');
  const [busca, setBusca] = useState('');

  return (
    <div>
      <Saudacao />
      <SecaoDois />
      <SecaoUm
        xepas={xepas}
        categoria={categoria}
        aoEscolherCategoria={setCategoria}
        busca={busca}
        aoBuscar={setBusca}
      />
      <SecaoTres xepas={xepas} />
      <SecaoQuatro xepas={xepas} categoria={categoria} busca={busca} />
    </div>
  );
}

export default HomeUsuario;
