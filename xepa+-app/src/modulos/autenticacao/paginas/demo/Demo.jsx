import { useNavigate } from 'react-router-dom';
import { Crown, ShoppingBasket, Sprout, Store } from 'lucide-react';
import Modal from '@/compartilhado/componentes/modal/Modal';
import Crumb from '@/modulos/autenticacao/paginas/Crumb';
import { salvarPlanoSelecionado } from '@/modulos/feirante/servicos/planoFeirante';
import Styles from '@/modulos/autenticacao/paginas/demo/demo.module.css';

const PERFIS = [
  {
    nome: 'Consumidor',
    etiqueta: 'Compra de xepas',
    descricao: 'Encontre xepas perto de você, monte seu carrinho e acompanhe o seu impacto.',
    Icone: ShoppingBasket,
    cor: Styles.verde,
    destino: '/demo/consumidor',
  },
  {
    nome: 'Feirante',
    etiqueta: 'Plano Grátis',
    descricao: 'Cadastre suas feiras e xepas e converse com os clientes.',
    Icone: Store,
    cor: Styles.limao,
    destino: '/demo/feirante',
    plano: 'gratis',
  },
  {
    nome: 'Feirante',
    etiqueta: 'Plano Crescer',
    descricao: 'Tudo do Grátis, com gestão financeira básica e Xep.AI.',
    Icone: Sprout,
    cor: Styles.amarelo,
    destino: '/demo/feirante',
    plano: 'crescer',
  },
  {
    nome: 'Feirante',
    etiqueta: 'Plano Pro',
    descricao: 'Acesso a tudo: gestão financeira completa, planilhas e Xep.AI.',
    Icone: Crown,
    cor: Styles.laranja,
    destino: '/demo/feirante',
    plano: 'pro',
  },
];

function Demo() {
  const navigate = useNavigate();

  function entrar(perfil) {
    // O consumidor não tem plano: só o feirante guarda a escolha.
    if (perfil.plano) {
      salvarPlanoSelecionado(perfil.plano);
    }

    navigate(perfil.destino);
  }

  return (
    <>
      <div className={Styles.telaDesfocada}>
        <Crumb />
      </div>

      <Modal
        classeFundo={Styles.fundoDemo}
        classeJanela={Styles.janelaDemo}
        titulo="Demonstração do Xepa+"
        descricao="Escolha um perfil para conhecer a plataforma. Cada plano de feirante libera recursos diferentes."
        aoFechar={() => navigate('/Crumb')}
      >
        <div className={Styles.lista}>
          {PERFIS.map((perfil) => (
            <button
              key={perfil.etiqueta}
              type="button"
              className={`${Styles.opcao} ${perfil.cor}`}
              onClick={() => entrar(perfil)}
            >
              <span className={Styles.icone}>
                <perfil.Icone size={24} aria-hidden="true" />
              </span>

              <span className={Styles.texto}>
                <span className={Styles.topo}>
                  <strong>{perfil.nome}</strong>
                  <span className={Styles.etiqueta}>{perfil.etiqueta}</span>
                </span>
                <span className={Styles.descricao}>{perfil.descricao}</span>
              </span>
            </button>
          ))}
        </div>

        <p className={Styles.rodape}>
          <span>Projeto Xepa+</span>
          <span>Modo demonstração</span>
        </p>
      </Modal>
    </>
  );
}

export default Demo;
