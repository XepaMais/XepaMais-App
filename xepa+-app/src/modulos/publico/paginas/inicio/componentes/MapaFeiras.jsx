import { useState } from 'react';
import '@/modulos/publico/paginas/inicio/estilos/MapaFeiras.css';

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
        <div className="mapa-texto">
          <span className="mapa-etiqueta">ENCONTRE PERTO DE VOCÊ</span>
          <h2>Mapa de feiras</h2>
          <p>
            Descubra feiras próximas, encontre novos produtos e conheça os feirantes da sua região.
          </p>
        </div>

        <form className="mapa-busca" onSubmit={pesquisarFeiras}>
          <input
            type="search"
            placeholder="Digite um bairro ou endereço"
            value={busca}
            onChange={(evento) => setBusca(evento.target.value)}
            aria-label="Pesquisar localização"
          />

          <button type="submit">Buscar</button>
        </form>

        <div className="mapa-visual">
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
