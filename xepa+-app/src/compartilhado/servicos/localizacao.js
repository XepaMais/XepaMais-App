export async function buscarCep(cep) {
  const numeros = cep.replace(/\D/g, '');

  if (numeros.length !== 8) return null;

  const resposta = await fetch(`https://viacep.com.br/ws/${numeros}/json/`);
  const dados = await resposta.json();

  if (dados.erro) return null;

  return {
    logradouro: dados.logradouro,
    bairro: dados.bairro,
    cidade: dados.localidade,
    uf: dados.uf,
  };
}

export async function geocodificarEndereco(endereco) {
  const parametros = new URLSearchParams({
    q: endereco,
    format: 'json',
    limit: '1',
    countrycodes: 'br',
  });

  const resposta = await fetch(`https://nominatim.openstreetmap.org/search?${parametros}`);
  const dados = await resposta.json();

  if (!dados[0]) return null;

  return {
    latitude: Number(dados[0].lat),
    longitude: Number(dados[0].lon),
  };
}
