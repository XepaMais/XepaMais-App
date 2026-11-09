import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import Styles from '../estilos/MapU.module.css'
import Modal from '@/compartilhado/componentes/modal/Modal'
import logoXepa from '@/assets/imagens/gerais/logo-colorida.png'
import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante'
import { buscarCep, geocodificarEndereco } from '@/compartilhado/servicos/localizacao'

const libraries = ['places'];

function MapPage() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [cep, setCep] = useState('');
  const [aviso, setAviso] = useState('');
  const [feiraSelecionada, setFeiraSelecionada] = useState(null);
  // Só entram no mapa as feiras que têm coordenadas salvas.
  const [feiras] = useState(() =>
    carregarFeiras().filter((feira) => feira.latitude != null)
  );
  
  // O centro do mapa começa na posição padrão, mas mudará para a do usuário
  const [mapCenter, setMapCenter] = useState({
    lat: -23.5280859,
    lng: -46.6917602,
  });

  // ESTADO NOVO: Armazena a posição GPS real capturada do usuário
  const [userPosition, setUserPosition] = useState(null);

  // PEGAR A POSIÇÃO ATUAL AUTOMATICAMENTE AO ABRIR A TELA
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const dadosPosicao = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Centraliza o mapa no usuário e salva a posição dele para o marcador azul
          setMapCenter(dadosPosicao);
          setUserPosition(dadosPosicao);
        },
        () => {
          console.log("O usuário negou a permissão de localização ou o GPS está desligado.");
        }
      );
    }
  }, []);

  // Busca por CEP caso o usuário queira pesquisar outra região
  const buscarRegiaoPorCep = async (e) => {
    e.preventDefault();
    if (!cep.trim()) return;

    try {
      const endereco = await buscarCep(cep);

      if (!endereco) {
        setAviso('Não encontramos este CEP. Tente novamente.');
        return;
      }

      const texto = [endereco.logradouro, `${endereco.cidade} - ${endereco.uf}`, 'Brasil']
        .filter(Boolean)
        .join(', ');
      const local = await geocodificarEndereco(texto);

      if (!local) {
        setAviso('Não conseguimos localizar esse CEP no mapa.');
        return;
      }

      setMapCenter({ lat: local.latitude, lng: local.longitude });
    } catch {
      setAviso('Não foi possível buscar agora. Tente novamente.');
    }
  };

  return (
    <div className={Styles.pageContainer}>
      
      <form onSubmit={buscarRegiaoPorCep} className={Styles.searchForm}>
        <input
          type="text"
          placeholder="Digite um CEP para buscar outra região..."
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          className={Styles.searchInput}
        />
        <button type="submit" className={Styles.searchButton}>
          Buscar
        </button>
      </form>

      {aviso && <Modal titulo="Aviso" descricao={aviso} aoFechar={() => setAviso('')} />}

      <div className={Styles.map}>
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={mapCenter}
            zoom={14}
          >
            {/* MARCADOR DO USUÁRIO (Aparece apenas se ele aceitar a geolocalização) */}
            {userPosition && (
              <Marker
                position={userPosition}
                title="Você está aqui"
                icon={{
                  // Bolinha azul no estilo GPS, desenhada pelo próprio Google Maps
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
              />
            )}

            {/* MARCADORES DAS FEIRAS (Logos da Xepa) */}
            {feiras.map((feira) => (
              <Marker
                key={feira.id}
                position={{ lat: feira.latitude, lng: feira.longitude }}
                onClick={() => setFeiraSelecionada(feira)}
                icon={{
                  url: logoXepa,
                  scaledSize: new window.google.maps.Size(46, 46),
                  anchor: new window.google.maps.Point(23, 23),
                }}
              />
            ))}

            {feiraSelecionada && (
              <InfoWindow
                position={{ lat: feiraSelecionada.latitude, lng: feiraSelecionada.longitude }}
                onCloseClick={() => setFeiraSelecionada(null)}
              >
                <div style={{ padding: '5px', maxWidth: '200px', fontFamily: 'Poppins, sans-serif' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{feiraSelecionada.nome}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666' }}>
                    {feiraSelecionada.endereco}, {feiraSelecionada.cidade}
                  </p>
                  <p style={{ margin: '0 0 5px 0', fontSize: '12px', color: '#666' }}>
                    {feiraSelecionada.dias.join(', ')}
                  </p>
                  <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#4caf50' }}>{feiraSelecionada.horario}</span>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        ) : (
          <div className={Styles.loading}>Carregando Mapa de Feiras...</div>
        )}
      </div>
    </div>
  );
}

export default MapPage;
