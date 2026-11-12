import { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import Styles from '../estilos/MapU.module.css'
import Modal from '@/compartilhado/componentes/modal/Modal'
import logoXepa from '@/assets/imagens/gerais/logo-colorida.png'
import { GOOGLE_MAPS_LOADER } from '@/compartilhado/servicos/googleMaps'
import BarraPesquisa from '@/compartilhado/componentes/barra-pesquisa/BarraPesquisa';

// Simulação das feiras cadastradas no sistema
const FEIRAS_CADASTRADAS = [
  {
    id: 1,
    nome: "Feira Livre da Lapa",
    descricao: "Frutas frescas, pastéis e vegetais orgânicos.",
    horario: "Terça a Domingo - 07h às 13h",
    position: { lat: -23.5228, lng: -46.7012 }
  },
  {
    id: 2,
    nome: "Feira de Pinheiros",
    descricao: "Tradicional feira com grande variedade de queijos e pescados.",
    horario: "Quarta e Sábado - 06h às 14h",
    position: { lat: -23.5594, lng: -46.6856 }
  },
  {
    id: 3,
    nome: "Feira Xepa Central",
    descricao: "Ponto original parceiro do app Xepa.",
    horario: "Diariamente - 08h às 17h",
    position: { lat: -23.5280859, lng: -46.6917602 }
  }
];

function MapPage() {
  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_LOADER);

  const [cep, setCep] = useState('');
  const [aviso, setAviso] = useState('');
  const [feiraSelecionada, setFeiraSelecionada] = useState(null);
  
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
  const buscarRegiaoPorCep = () => {
    if (!cep.trim()) return;

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      { 
        address: cep,
        componentRestrictions: { country: 'BR' } 
      }, 
      (results, status) => {
        if (status === 'OK' && results?.[0]) {
          const coords = results[0].geometry.location;
          setMapCenter({
            lat: coords.lat(),
            lng: coords.lng(),
          });
        } else {
          setAviso('Não encontramos este CEP. Tente novamente.');
        }
      }
    );
  };

  return (
    <div className={Styles.pageContainer}>
      
      <BarraPesquisa
        className={Styles.searchForm}
        valor={cep}
        aoMudar={setCep}
        aoBuscar={buscarRegiaoPorCep}
        tipo="text"
        placeholder="Digite um CEP para buscar outra região..."
        rotulo="CEP para buscar outra região"
      />

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
                  // Bolinha azul estilo GPS do Google Maps
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 9,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 3,
                }}
              />
            )}

            {/* MARCADORES DAS FEIRAS (Logos da Xepa) */}
            {FEIRAS_CADASTRADAS.map((feira) => (
              <Marker
                key={feira.id}
                position={feira.position}
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
                position={feiraSelecionada.position}
                onCloseClick={() => setFeiraSelecionada(null)}
              >
                <div style={{ padding: '5px', maxWidth: '200px', fontFamily: 'Poppins, sans-serif' }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>{feiraSelecionada.nome}</h4>
                  <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#666' }}>{feiraSelecionada.descricao}</p>
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
