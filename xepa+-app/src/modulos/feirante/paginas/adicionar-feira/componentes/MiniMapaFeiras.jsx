import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import { useNavigate } from 'react-router-dom'
import logoXepa from '@/assets/imagens/gerais/logo-colorida.png'
import styles from '@/modulos/feirante/paginas/adicionar-feira/estilos/MiniMapas.module.css'
import { GOOGLE_MAPS_LOADER } from '@/compartilhado/servicos/googleMaps'

const CENTRO_PADRAO = { lat: -23.5505, lng: -46.6333 }; // São Paulo

function MiniMapaFeiras({ feiras }) {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader(GOOGLE_MAPS_LOADER);

  // TODO 1: só as feiras que têm coordenada
  const feirasNoMapa = feiras
    .filter((feira) => feira.latitude != null)
    .map((feira) => ({
      ...feira,
      position: { lat: feira.latitude, lng: feira.longitude },
    }));

  // TODO 2: o caminho (rota) da página do mapa grande
  const abrirMapa = () => navigate('/mapa');

  if (!isLoaded) return <p>Carregando mapa...</p>;

  return (
    <section className={styles.secaoMiniMapa}>
      <h2 className={`${styles.tituloLista} titulo-cartao`}>Suas Feiras no Mapa:</h2>

      <div className={styles.miniMapa}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={feirasNoMapa[0]?.position ?? CENTRO_PADRAO}
          zoom={12}
          onClick={abrirMapa}
          options={{
            disableDefaultUI: true,   // esconde botões de zoom etc.
            gestureHandling: 'none',  // não deixa arrastar
            clickableIcons: false,    // ignora pontos do próprio Google
          }}
        >
          {feirasNoMapa.map((feira) => (
            <Marker
              key={feira.id}
              position={feira.position}
              onClick={abrirMapa}
              icon={{
                url: logoXepa,
                scaledSize: new window.google.maps.Size(36, 36),
              }}
            />
          ))}
        </GoogleMap>
      </div>

      <button type="button" className={styles.botaoMapa} onClick={abrirMapa}>
        Ver mapa completo
      </button>
    </section>
  );
}

export default MiniMapaFeiras;