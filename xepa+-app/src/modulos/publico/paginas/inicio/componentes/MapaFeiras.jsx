import { useState } from 'react';
import '@/modulos/publico/paginas/inicio/estilos/MapaFeiras.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

function MapaFeiras() {
  const [busca, setBusca] = useState('Brasilândia, São Paulo');

  const [localizacao, setLocalizacao] = useState('Brasilândia, São Paulo');

  function pesquisarFeiras(evento) {
    evento.preventDefault();

    if (busca.trim()) {
      setLocalizacao(busca.trim());
    }
  }

  return (
    <section className="mapa-feiras" id="mapa">
      <div className="mapa-conteudo">
        <div className="mapa-texto" data-revelar>
          <h2>
            Mapa de <Rabisco cor="#e4f04a">feiras</Rabisco>
          </h2>
          <p>
            Descubra feiras próximas, encontre novos produtos e conheça os feirantes da sua região.
          </p>
        </div>

        <form className="mapa-busca" onSubmit={pesquisarFeiras} data-revelar style={{ '--atraso': '0.1s' }}>
          <input
            type="search"
            placeholder="Digite um bairro ou endereço"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            aria-label="Pesquisar localização"
          />

          <button type="submit">Buscar</button>
        </form>

        <div className="mapa-visual" data-revelar="zoom" style={{ '--atraso': '0.2s' }}>
          <iframe
            title={`Mapa de ${localizacao}`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(localizacao)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <p className="mapa-observacao">Pesquise um endereço para visualizar a região no mapa.</p>
      </div>
    </section>
  );
}

export default MapaFeiras;
