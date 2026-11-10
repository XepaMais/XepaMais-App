import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import logoXepa from '@/assets/imagens/gerais/logo-colorida.png';
import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import { geocodificarEndereco } from '@/compartilhado/servicos/localizacao';
import { GOOGLE_MAPS_LOADER } from '@/compartilhado/servicos/googleMaps';
import '@/modulos/publico/paginas/inicio/estilos/MapaFeiras.css';

const CENTRO_PADRAO = { lat: -23.4669, lng: -46.6869 }; // Brasilândia, São Paulo




function MapaFeiras() {

  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_LOADER);

  const [busca, setBusca] = useState('Brasilândia, São Paulo');
  const [centro, setCentro] = useState(CENTRO_PADRAO);
  const [mensagem, setMensagem] = useState('Pesquise um endereço para visualizar a região no mapa.');
  const [feiras] = useState(() =>
    carregarFeiras().filter((feira) => feira.latitude != null)
  );

    async function pesquisarFeiras(evento) {
    evento.preventDefault();
    if (!busca.trim()) return;

    try {
      const local = await geocodificarEndereco(busca.trim());

      if (!local) {
        setMensagem('Não encontramos esse endereço. Tente outro bairro ou rua.');
        return;
      }

      setCentro({ lat: local.latitude, lng: local.longitude });
      setMensagem('Os logos da Xepa no mapa são as feiras cadastradas.');
    } catch {
      setMensagem('Não foi possível buscar agora. Tente novamente.');
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
                   {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={centro}
              zoom={14}
            >
              {feiras.map((feira) => (
                <Marker
                  key={feira.id}
                  position={{ lat: feira.latitude, lng: feira.longitude }}
                  title={feira.nome}
                  icon={{
                    url: logoXepa,
                    scaledSize: new window.google.maps.Size(40, 40),
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <p>Carregando mapa...</p>
          )}
        </div>

        <p className="mapa-observacao">{mensagem}</p>
      </div>
    </section>
  );
}

export default MapaFeiras;
