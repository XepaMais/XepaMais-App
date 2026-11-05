import { Link, useNavigate } from 'react-router-dom';
import Styles from '@/modulos/autenticacao/paginas/estilos/CriarContaF.module.css';

function CriarContaF() {
  const navigate = useNavigate();

  function proximaEtapa(event) {
    event.preventDefault();
    const dados = Object.fromEntries(new FormData(event.target));
    navigate('/CriarContaF2', { state: dados }); //
  }

  return (
    <main className={Styles.container}>
      <section className={Styles.ladoImagem}></section>

      <section className={Styles.ladoForm}>
        <form className={Styles.form} onSubmit={proximaEtapa}>
          <h1>Cadastre sua conta</h1>

          <div className={Styles.linha}>
            <div className={Styles.campo}>
              <label htmlFor="matricula">Matrícula</label>
              <input type="text" id="matricula" name="matricula" required />
            </div>
            <div className={Styles.campo}>
              <label htmlFor="validade">Validade</label>
              <input type="text" id="validade" name="validade" required />
            </div>
          </div>

          <div className={Styles.linha}>
            <div className={Styles.campo}>
              <label htmlFor="cnpj">CNPJ</label>
              <input type="text" id="cnpj" name="cnpj" inputMode="numeric" required />
            </div>
            <div className={Styles.campo}>
              <label htmlFor="ccm">CCM</label>
              <input type="text" id="ccm" name="ccm" required />
            </div>
          </div>

          <div className={Styles.campo}>
            <label htmlFor="titular">Titular</label>
            <input type="text" id="titular" name="titular" required />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="fantasia">Nome Fantasia</label>
            <input type="text" id="fantasia" name="fantasia" required />
          </div>

          <div className={Styles.campo}>
            <label htmlFor="grupo">Grupo de Comércio</label>
            <input type="text" id="grupo" name="grupo" required />
          </div>

          <button type="submit" className={Styles.btnEntrar}>
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

export default CriarContaF;
