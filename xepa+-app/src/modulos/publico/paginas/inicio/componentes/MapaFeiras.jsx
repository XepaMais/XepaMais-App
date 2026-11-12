import { useState } from 'react';
import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import { buscarCep, geocodificarEndereco } from '@/compartilhado/servicos/localizacao';
import '@/modulos/publico/paginas/inicio/estilos/MapaFeiras.css';
import Rabisco from '@/modulos/publico/paginas/inicio/componentes/Rabisco.jsx';

const CENTRO_PADRAO = { lat: -23.4669, lng: -46.6869 }; // Brasilândia, São Paulo

// Distância em km entre dois pontos (fórmula de Haversine)
function distanciaKm(a, b) {
  const rad = (graus) => (graus * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.asin(Math.sqrt(h));
}

// Aplica a máscara 00000-000 enquanto a pessoa digita um CEP
function formatarBusca(valor) {
  const numeros = valor.replace(/\D/g, '');
  const pareceCep = /^[\d\s-]*$/.test(valor) && numeros.length > 0;
  if (!pareceCep) return valor;
  const cep = numeros.slice(0, 8);
  return cep.length > 5 ? `${cep.slice(0, 5)}-${cep.slice(5)}` : cep;
}

function MapaFeiras() {
  const [busca, setBusca] = useState('');
  const [centro, setCentro] = useState(CENTRO_PADRAO);
  const [buscando, setBuscando] = useState(false);
  const [mensagem, setMensagem] = useState(
    'Digite seu CEP para ver as feiras cadastradas perto de você.',
  );
  const [feiras] = useState(() => carregarFeiras().filter((feira) => feira.latitude != null));

  async function pesquisarFeiras(evento) {
    evento.preventDefault();
    const termo = busca.trim();
    if (!termo) return;

    setBuscando(true);

    try {
      let endereco = termo;
      const somenteNumeros = termo.replace(/\D/g, '');
      const ehCep = /^[\d\s-]+$/.test(termo);

      if (ehCep) {
        if (somenteNumeros.length !== 8) {
          setMensagem('O CEP precisa ter 8 números. Ex.: 02860-000');
          return;
        }

        const dadosCep = await buscarCep(somenteNumeros);
        if (!dadosCep) {
          setMensagem('CEP não encontrado. Confira os números e tente de novo.');
          return;
        }

        endereco = [dadosCep.logradouro, dadosCep.bairro, dadosCep.cidade, dadosCep.uf]
          .filter(Boolean)
          .join(', ');
      }

      const local =
        (await geocodificarEndereco(endereco)) ||
        // Se a rua não for encontrada, tenta só pelo CEP
        (ehCep ? await geocodificarEndereco(`${somenteNumeros}, Brasil`) : null);

      if (!local) {
        setMensagem('Não encontramos esse local. Tente outro CEP, bairro ou rua.');
        return;
      }

      const posicao = { lat: local.latitude, lng: local.longitude };
      setCentro(posicao);

      const maisProxima = feiras
        .map((feira) => ({
          ...feira,
          distancia: distanciaKm(posicao, { lat: feira.latitude, lng: feira.longitude }),
        }))
        .sort((a, b) => a.distancia - b.distancia)[0];

      setMensagem(
        maisProxima
          ? `Feira mais próxima: ${maisProxima.nome}, a ${maisProxima.distancia.toFixed(1).replace('.', ',')} km de você. Os logos da Xepa no mapa são as feiras cadastradas.`
          : 'Ainda não há feiras cadastradas no mapa. Quando houver, elas aparecem com o logo da Xepa.',
      );
    } catch {
      setMensagem('Não foi possível buscar agora. Tente novamente.');
    } finally {
      setBuscando(false);
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
            inputMode="search"
            placeholder="Digite seu CEP ou endereço"
            value={busca}
            onChange={(evento) => setBusca(formatarBusca(evento.target.value))}
            aria-label="CEP ou endereço"
          />

          <button type="submit" disabled={buscando}>
            {buscando ? 'Buscando...' : 'Buscar'}
          </button>
        </form>

        <div className="mapa-visual" data-revelar="zoom" style={{ '--atraso': '0.2s' }}>
          <iframe
            title={`Mapa próximo de ${centro.lat}, ${centro.lng}`}
            src={`https://maps.google.com/maps?q=${centro.lat},${centro.lng}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <p className="mapa-observacao" aria-live="polite">
          {mensagem}
        </p>
      </div>
    </section>
  );
}

export default MapaFeiras;
