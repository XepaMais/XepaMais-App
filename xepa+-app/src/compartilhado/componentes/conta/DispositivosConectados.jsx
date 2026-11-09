import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import estiloModal from '@/compartilhado/componentes/modal/Modal.module.css';
import base from '@/compartilhado/estilos/conta.module.css';
import styles from './DispositivosConectados.module.css';

const ICONES = { computador: Monitor, celular: Smartphone, tablet: Tablet };

// Lê do navegador apenas o que ele informa sobre o próprio aparelho.
function identificarDispositivoAtual() {
  const agente = navigator.userAgent;

  let sistema = 'Sistema não identificado';
  let tipo = 'computador';

  if (agente.includes('iPad')) {
    sistema = 'iPad';
    tipo = 'tablet';
  } else if (agente.includes('iPhone')) {
    sistema = 'iPhone';
    tipo = 'celular';
  } else if (agente.includes('Android')) {
    sistema = 'Android';
    tipo = agente.includes('Mobile') ? 'celular' : 'tablet';
  } else if (agente.includes('Windows')) {
    sistema = 'Windows';
  } else if (agente.includes('Mac OS')) {
    sistema = 'macOS';
  } else if (agente.includes('Linux')) {
    sistema = 'Linux';
  }

  let navegador = 'Navegador não identificado';

  if (agente.includes('Edg/')) {
    navegador = 'Microsoft Edge';
  } else if (agente.includes('OPR/')) {
    navegador = 'Opera';
  } else if (agente.includes('Firefox/')) {
    navegador = 'Firefox';
  } else if (agente.includes('Chrome/')) {
    navegador = 'Google Chrome';
  } else if (agente.includes('Safari/')) {
    navegador = 'Safari';
  }

  return { id: 'atual', nome: sistema, navegador, tipo };
}

// Quando houver sessões no backend, a lista virá da API e cada desconexão fará a chamada real.
function DispositivosConectados() {
  const navigate = useNavigate();
  const dispositivos = [identificarDispositivoAtual()];
  const [selecionado, setSelecionado] = useState(null);

  return (
    <main className={base.pagina}>
      <header className={base.cabecalho}>
        <div>
          <h1>Dispositivos conectados</h1>
          <p>Consulte os aparelhos com acesso à sua conta.</p>
        </div>
      </header>

     

      <ul className={styles.lista}>
        {dispositivos.map((dispositivo) => {
          const Icone = ICONES[dispositivo.tipo];

          return (
            <li className={styles.item} key={dispositivo.id}>
              <Icone size={32} aria-hidden="true" className={styles.icone} />

              <div className={styles.texto}>
                <strong>
                  {dispositivo.nome}
                  <span className={base.status}>Este dispositivo</span>
                </strong>
                <span>{dispositivo.navegador}</span>
                <span>Último acesso: agora</span>
              </div>

              <button
                type="button"
                className={base.botaoPerigoContorno}
                onClick={() => setSelecionado(dispositivo)}
              >
                Desconectar
              </button>
            </li>
          );
        })}
      </ul>

      {selecionado && (
        <Modal titulo={`Desconectar ${selecionado.nome}?`} aoFechar={() => setSelecionado(null)}>
          <p className={estiloModal.descricao}>
            {selecionado.navegador}. Você voltará para a página inicial, como ao clicar em Sair.
          </p>

          <div className={estiloModal.acoes}>
            <button
              type="button"
              className={estiloModal.secundario}
              onClick={() => setSelecionado(null)}
            >
              Cancelar
            </button>
            <button type="button" className={estiloModal.perigo} onClick={() => navigate('/')}>
              Desconectar dispositivo
            </button>
          </div>
        </Modal>
      )}
    </main>
  );
}

export default DispositivosConectados;
