import { useState } from 'react';
import { X } from 'lucide-react';
import pinIcon from '@/assets/imagens/gerais/PinIcon.png';
import Modal from '@/compartilhado/componentes/modal/Modal';
import base from '@/compartilhado/componentes/modal/Modal.module.css';
import styles from '../estilos/PopUpAdicionarFeira.module.css';
import { buscarCep, geocodificarEndereco } from '@/compartilhado/servicos/localizacao';


const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

// Deixa o CEP no formato 00000-000 enquanto a pessoa digita.
function formatarCep(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 8);

  if (numeros.length > 5) {
    return `${numeros.slice(0, 5)}-${numeros.slice(5)}`;
  }

  return numeros;
}

// Começa com um campo de funcionário vazio quando a feira ainda não tem nenhum.
function funcionariosIniciais(feira) {
  if (feira && feira.funcionarios && feira.funcionarios.length > 0) {
    return feira.funcionarios;
  }

  return [''];
}

// O formulário só existe enquanto o popup está aberto, então basta iniciar o estado com a feira.
// Ao adicionar, não existe feira: por isso os valores iniciais vêm de um objeto vazio.
function FormularioFeira({ modo, feira, onFechar, onSalvar }) {
  const dadosIniciais = feira || {};
  const [nome, setNome] = useState(dadosIniciais.nome || '');
  const [endereco, setEndereco] = useState(dadosIniciais.endereco || '');
  const [cep, setCep] = useState(dadosIniciais.cep || '');
  const [dias, setDias] = useState(dadosIniciais.dias || []);
  const [horarioInicio, setHorarioInicio] = useState(dadosIniciais.horarioInicio || '');
  const [erro, setErro] = useState('');
  const [horarioFim, setHorarioFim] = useState(dadosIniciais.horarioFim || '');
  const [funcionarios, setFuncionarios] = useState(funcionariosIniciais(feira));
  const estaEditando = modo === 'editar';

  // O horário só é salvo quando início e fim foram preenchidos.
  let horario = '';
  if (horarioInicio && horarioFim) {
    horario = `${horarioInicio} às ${horarioFim}`;
  }
    // Formata o CEP e, quando ele fica completo, preenche o endereço pelo ViaCEP.
  async function alterarCep(valor) {
    const cepFormatado = formatarCep(valor);
    setCep(cepFormatado);
    setErro('');

    if (cepFormatado.length !== 9) return;

    try {
      const dados = await buscarCep(cepFormatado);

      if (!dados) {
        setErro('CEP não encontrado. Confira os números ou preencha o endereço manualmente.');
        return;
      }

      setEndereco(dados.logradouro);
    } catch {
      setErro('Não foi possível consultar o CEP agora. Preencha o endereço manualmente.');
    }
  }

  function salvar(evento) {
    evento.preventDefault();
    onSalvar({
      nome: nome.trim(),
      endereco: endereco.trim(),
      cep,
      dias,
      horarioInicio,
      horarioFim,
      horario,
      funcionarios: funcionarios
        .map((funcionario) => funcionario.trim())
        .filter((funcionario) => funcionario !== ''),
    });
  }

  function alternarDia(dia) {
    if (dias.includes(dia)) {
      setDias(dias.filter((item) => item !== dia));
    } else {
      setDias([...dias, dia]);
    }
  }

  function alterarFuncionario(indice, valor) {
    const novaLista = [...funcionarios];
    novaLista[indice] = valor;
    setFuncionarios(novaLista);
  }

  function excluirFuncionario(indice) {
    const novaLista = [...funcionarios];
    novaLista.splice(indice, 1);
    setFuncionarios(novaLista);
  }

  return (
    <Modal titulo={estaEditando ? 'Editar Feira' : 'Adicionar Feira'} aoFechar={onFechar}>
      <form className={base.form} onSubmit={salvar}>
        <div className={base.campo}>
          <label htmlFor="nomeFeira">Nome da Feira</label>
          <input
            id="nomeFeira"
            name="nome"
            value={nome}
            onChange={(evento) => setNome(evento.target.value)}
            placeholder="Fazendinha"
            required
          />
        </div>

        <div className={base.campo}>
          <label htmlFor="enderecoFeira">Endereço</label>
          <input
            id="enderecoFeira"
            name="endereco"
            value={endereco}
            onChange={(evento) => setEndereco(evento.target.value)}
            placeholder="Rua João 123"
            required
          />
        </div>

        <div className={base.campo}>
          <label htmlFor="cepFeira">CEP (opcional)</label>
          <input
            id="cepFeira"
            name="cep"
            inputMode="numeric"
            pattern="[0-9]{5}-[0-9]{3}"
            title="Digite os 8 números do CEP"
            value={cep}
            onChange={(evento) => alterarCep(evento.target.value)}
            placeholder="00000-000"
          />
        </div>

        <fieldset className={styles.selecaoDias}>
          <legend>Dias que você trabalha</legend>
          <div className={styles.dias}>
            {diasDaSemana.map((dia) => (
              <button
                key={dia}
                type="button"
                aria-pressed={dias.includes(dia)}
                className={dias.includes(dia) ? styles.diaSelecionado : styles.dia}
                onClick={() => alternarDia(dia)}
              >
                {dia}
              </button>
            ))}
          </div>
        </fieldset>

        <div className={base.grade}>
          <div className={base.campo}>
            <label htmlFor="horarioInicio">Horário de início (opcional)</label>
            <input
              id="horarioInicio"
              name="horarioInicio"
              type="time"
              value={horarioInicio}
              onChange={(evento) => setHorarioInicio(evento.target.value)}
              required={Boolean(horarioFim)}
            />
          </div>

          <div className={base.campo}>
            <label htmlFor="horarioFim">Horário de fim (opcional)</label>
            <input
              id="horarioFim"
              name="horarioFim"
              type="time"
              min={horarioInicio || undefined}
              value={horarioFim}
              onChange={(evento) => setHorarioFim(evento.target.value)}
              required={Boolean(horarioInicio)}
            />
          </div>
        </div>

        {funcionarios.map((funcionario, indice) => (
          <div className={base.campo} key={indice}>
            <label htmlFor={`func${indice}`}>Funcionário{indice > 0 ? ` ${indice + 1}` : ''}</label>
            <div className={styles.linhaFuncionario}>
              <div className={styles.campoComIcone}>
                <input
                  id={`func${indice}`}
                  name="funcionario"
                  value={funcionario}
                  onChange={(evento) => alterarFuncionario(indice, evento.target.value)}
                  placeholder="Escreva aqui..."
                  required={indice === 0}
                />
                {estaEditando && <img src={pinIcon} alt="" aria-hidden="true" />}
              </div>

              {funcionarios.length > 1 && (
                <button
                  type="button"
                  className={styles.botaoRemover}
                  aria-label={`Excluir ${funcionario.trim() || `funcionário ${indice + 1}`}`}
                  onClick={() => excluirFuncionario(indice)}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          className={base.secundario}
          onClick={() => setFuncionarios([...funcionarios, ''])}
        >
          Cadastrar outro funcionário
        </button>
        {erro && (
          <p role="alert" style={{ color: '#c0392b', margin: 0 }}>
            {erro}
          </p>
        )}

        <div className={base.acoes}>
          <button type="button" className={base.secundario} onClick={onFechar}>
            Cancelar
          </button>
          <button type="submit" className={base.principal}>
            {estaEditando ? 'Salvar' : 'Registrar Feira'}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default FormularioFeira;
