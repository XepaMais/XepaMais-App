import { useNavigate } from 'react-router-dom';
import { abrirConversaDaXepa } from '@/compartilhado/servicos/conversas';
import { carregarPerfil } from '@/compartilhado/servicos/perfil';
import { carregarFeiras } from '@/modulos/feirante/servicos/feirasFeirante';
import styles from '@/modulos/usuario/paginas/detalhe-produto/estilos/PerfilFeirante.module.css';

const NOMES_DIAS = {
  Dom: 'Domingo',
  Seg: 'Segunda',
  Ter: 'Terça',
  Qua: 'Quarta',
  Qui: 'Quinta',
  Sex: 'Sexta',
  Sáb: 'Sábado',
};

function iniciais(nome) {
  return nome
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((parte) => parte[0].toUpperCase())
    .join('');
}

function descreverDias(dias) {
  if (!dias || dias.length === 0) return '';

  const nomes = dias.map((dia) => NOMES_DIAS[dia] || dia);
  if (nomes.length === 1) return nomes[0];

  return `${nomes.slice(0, -1).join(', ')} e ${nomes.at(-1)}`;
}

// Deixa a primeira letra de cada nome maiúscula ("fernanda" vira "Fernanda").
function capitalizar(nome) {
  return nome.trim().replace(/(^|\s)\S/g, (letra) => letra.toUpperCase());
}

function PerfilFeirante({ xepa }) {
  const navegar = useNavigate();

  const nomeFeirante = xepa.feirante || 'Feirante';
  // Sem backend, o perfil salvo neste navegador é o do feirante que cadastrou a xepa.
  const perfil = carregarPerfil('feirante');
  const foto = perfil.nome === nomeFeirante ? perfil.foto : '';
  const barraca = xepa.barraca || (perfil.nome === nomeFeirante ? perfil.barraca : '');

  const feira = carregarFeiras().find((item) => item.nome === xepa.feira);
  const funcionarios = (feira?.funcionarios || []).filter(Boolean).map(capitalizar);
  const dias = descreverDias(xepa.dias || feira?.dias);
  const horario = xepa.horario || feira?.horario || '';

  const informacoes = [
    { rotulo: 'Feira', valor: xepa.feira },
    { rotulo: 'Dias de retirada', valor: dias },
    { rotulo: 'Horário', valor: horario || 'Combine pelo chat' },
    { rotulo: 'Atendimento', valor: funcionarios.length ? [nomeFeirante, ...funcionarios].join(', ') : '' },
  ].filter((item) => item.valor);

  // Abre (ou reaproveita) a conversa sobre esta xepa e leva direto para ela.
  function falarComFeirante() {
    const id = abrirConversaDaXepa(xepa);
    navegar('/HistoricoChatUsuario', { state: { conversa: id } });
  }

  return (
    <section className={styles.perfil}>
      <h2>Perfil do feirante</h2>
      <p className={styles.sub}>Conheça quem preparou sua xepa</p>

      <div className={styles.pessoa}>
        {foto ? (
          <img className={styles.avatar} src={foto} alt="" />
        ) : (
          <span className={styles.avatar} aria-hidden="true">
            {iniciais(nomeFeirante)}
          </span>
        )}
        <div>
          <strong>{nomeFeirante}</strong>
          {barraca && <span>Barraca {barraca}</span>}
        </div>
      </div>

      <dl className={styles.dados}>
        {informacoes.map((item) => (
          <div key={item.rotulo}>
            <dt>{item.rotulo}</dt>
            <dd>{item.valor}</dd>
          </div>
        ))}
      </dl>

      <button type="button" className={styles.botao} onClick={falarComFeirante}>
        Falar com o feirante
      </button>
    </section>
  );
}

export default PerfilFeirante;
