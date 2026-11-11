// Funções de data usadas em todo o projeto.

// Transforma uma data no texto AAAA-MM-DD, formato usado para salvar e comparar datas.
export function dataEmTexto(data) {
  const ano = data.getFullYear();
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');

  return `${ano}-${mes}-${dia}`;
}

export function dataDeHoje() {
  return dataEmTexto(new Date());
}

// Transforma AAAA-MM-DD em DD/MM/AAAA.
export function formatarData(data) {
  return data.split('-').reverse().join('/');
}

// Segunda-feira da semana atual, à meia-noite.
export function inicioDaSemana() {
  const inicio = new Date();
  const diaDaSemana = inicio.getDay();

  // domingo é o dia 0.
  if (diaDaSemana === 0) {
    inicio.setDate(inicio.getDate() - 6);
  } else {
    inicio.setDate(inicio.getDate() - (diaDaSemana - 1));
  }

  inicio.setHours(0, 0, 0, 0);
  return inicio;
}

export function estaNaSemanaAtual(data) {
  const inicio = inicioDaSemana();
  const fim = new Date(inicio);
  fim.setDate(fim.getDate() + 7);

  return data >= inicio && data < fim;
}

export function estaNoMesAtual(data) {
  const hoje = new Date();

  return data.getMonth() === hoje.getMonth() && data.getFullYear() === hoje.getFullYear();
}
