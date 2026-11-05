import { useState } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Styles from '../estilos/MapPage.module.css';
import logoXepa from '@/assets/imagens/gerais/logo-colorida.png';

const libraries = ['places'];

function MapPage() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey || '',
    libraries,
  });

  // Posição inicial padrão (suas coordenadas originais)
  const [position, setPosition] = useState({
    lat: -23.5280859,
    lng: -46.6917602,
  });

  // Estados para os campos do formulário do feirante
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [nomeFeira, setNomeFeira] = useState('');
  const [erroMapa, setErroMapa] = useState('');

  // Estado para simular os dados salvos com sucesso
  const [feiraSalva, setFeiraSalva] = useState(null);

  // Função para pesquisar o CEP e salvar os dados da feira
  const salvarEMarcarFeira = (e) => {
    e.preventDefault();

    if (!cep.trim()) {
      alert('Por favor, digite o CEP da feira.');
      return;
    }

    if (!window.google?.maps?.Geocoder) {
      setErroMapa('O mapa não está disponível. Verifique a chave da API do Google Maps.');
      return;
    }

    const geocoder = new window.google.maps.Geocoder();

    // Faz a geocodificação do CEP limitando os resultados ao Brasil
    geocoder.geocode(
      {
        address: cep,
        componentRestrictions: { country: 'BR' }
      },
      (results, status) => {
        if (status === 'OK' && results && results[0]) {
          const coords = results[0].geometry.location;
          const enderecoFormatado = results[0].formatted_address;

          // 1. Atualiza a posição do mapa e do marcador na tela
          const novaPosicao = {
            lat: coords.lat(),
            lng: coords.lng(),
          };
          setPosition(novaPosicao);

          // 2. Agrupa todos os dados que você enviará para o banco de dados futuramente
          const dadosDaFeira = {
            nome: nomeFeira || 'Feira sem nome',
            cep: cep,
            numero: numero,
            enderecoCompleto: numero
              ? `${enderecoFormatado}, Nº ${numero}`
              : enderecoFormatado,
            latitude: novaPosicao.lat,
            longitude: novaPosicao.lng
          };

          setFeiraSalva(dadosDaFeira);
          // Mostra no console do navegador para confirmar que capturou tudo certo
          console.log('Dados prontos para enviar ao backend Java:', dadosDaFeira);
          alert(`Sucesso! Feira "${dadosDaFeira.nome}" demarcada no mapa.`);

        } else {
          alert('Não conseguimos localizar este CEP. Por favor, confira o número informado.');
        }
      }
    );
  };

  return (
    <div className={Styles.pageContainer}>
      
      {/* CARD FLUTUANTE DE INFORMAÇÕES DO FEIRANTE */}
      <div className={Styles.infoCard}>
        <div className={Styles.cardHeader}>
          <img src={logoXepa} alt="Logo Xepa" className={Styles.cardLogo} />
          <h3>Cadastro da Feira</h3>
        </div>

        <form onSubmit={salvarEMarcarFeira} className={Styles.feiraForm}>
          <div className={Styles.inputGroup}>
            <label>Nome da Feira / Ponto de Referência</label>
            <input
              type="text"
              placeholder="Ex: Feira de Domingo - Lapa"
              value={nomeFeira}
              onChange={(e) => setNomeFeira(e.target.value)}
            />
          </div>

          <div className={Styles.rowInputs}>
            <div className={Styles.inputGroup} style={{ flex: 2 }}>
              <label>CEP da Feira</label>
              <input
                type="text"
                placeholder="00000-000"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
                maxLength={9}
              />
            </div>

            <div className={Styles.inputGroup} style={{ flex: 1 }}>
              <label>Número</label>
              <input
                type="text"
                placeholder="S/N"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className={Styles.saveButton}>
            Salvar e Marcar Feira
          </button>
        </form>

        {/* FEEDBACK VISUAL DE DADOS SALVOS */}
        {feiraSalva && (
          <div className={Styles.savedAlert}>
            <p><strong>📍 Cadastrado ativo:</strong></p>
            <p size="small">{feiraSalva.enderecoCompleto}</p>
          </div>
        )}
        {erroMapa && <p className={Styles.mapError}>{erroMapa}</p>}
      </div>

      {/* CONTAINER DO MAPA DA API */}
      <div className={Styles.map}>
        {!apiKey ? (
          <div className={Styles.mapError}>
            Configure VITE_GOOGLE_MAPS_API_KEY no arquivo .env.local para carregar o mapa.
          </div>
        ) : loadError ? (
          <div className={Styles.mapError}>
            Não foi possível carregar o Google Maps. Confira se a chave é válida, se a
            Maps JavaScript API está habilitada e se o faturamento e as restrições da
            chave estão configurados corretamente.
          </div>
        ) : isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={position}
            zoom={16}
          >
            <Marker
              position={position}
              icon={{
                url: logoXepa,
                scaledSize: new window.google.maps.Size(48, 48),
                anchor: new window.google.maps.Point(24, 24),
              }}
            />
          </GoogleMap>
        ) : (
          <div className={Styles.loadingContainer} role="status">Carregando mapa...</div>
        )}
      </div>

    </div>
  );
}

export default MapPage;
