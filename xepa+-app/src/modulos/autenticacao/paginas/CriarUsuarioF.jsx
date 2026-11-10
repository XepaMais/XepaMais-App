import { Link, useNavigate } from 'react-router-dom';
import Styles from '@/modulos/autenticacao/paginas/estilos/CriarUsuarioF.module.css';

function CriarConta() {
  const navigate = useNavigate();

  function proximaEtapa(event) {
    event.preventDefault();
    const dados = Object.fromEntries(new FormData(event.target));
    navigate('/CriarContaC2', { state: dados }); // ajuste para a sua próxima rota
  }

  return (
    <main className={Styles.container}>
      <section className={Styles.ladoImagem}></section>

      <section className={Styles.ladoForm}>
        <form className={Styles.form} onSubmit={proximaEtapa}>
          <h1>Cadastre-se</h1>

          <div className={Styles.campo}>
            <label htmlFor="nome">Nome completo</label>
            <input type="text" id="nome" name="nome" required />
          </div>

          <div className={Styles.linha}>
            <div className={Styles.campo}>
              <label htmlFor="cpf">CPF</label>
              <input type="text" id="cpf" name="cpf" inputMode="numeric" required />
            </div>
            <div className={Styles.campo}>
              <label htmlFor="telefone">Telefone</label>
              <input type="tel" id="telefone" name="telefone" required />
            </div>
          </div>

          <div className={Styles.campo}>
            <label htmlFor="nascimento">Data de Nascimento</label>
            <input type="date" id="nascimento" name="nascimento" required />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="senha">Senha</label>
            <input type="password" id="senha" name="senha" required />
          </div>

          <button
            type="button"
            className={Styles.btnEntrar}
            onClick={() => navigate('/CriarContaF')}
          >
            Próxima etapa
          </button>

          <p className={Styles.cadastro}>
            Já tem conta? <Link to="/Crumb">Entrar</Link>
          </p>
        </form>
      </section>
    </main>
  );
}

export default CriarConta;
