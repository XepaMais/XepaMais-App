import '@/modulos/publico/paginas/inicio/estilos/Hero.css';
import FaixaXepa from '@/modulos/publico/paginas/inicio/componentes/FaixaXepa.jsx';
// Vídeo de fundo da apresentação (Pexels 15645011)
import videoFeira from '@/assets/videos/feira-hero.mp4';

// Palavras que passam na faixa. Adicione ou remova quantas quiser.
const palavras = [
  'Venha ver',
  'Xepa+',
  'Menos desperdício',
  'Feira fresquinha',
  'Preço justo',
  'Mais alimento',
  'Mais futuro',
];


export default function Hero() {
  return (
    <>
      <section className="secao-inicio" id="inicio">
        {/* Vídeo de fundo: mudo e em loop, como pano de fundo da apresentação */}
        <video
          className="video-inicio"
          src={videoFeira}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="video-inicio__sombra" aria-hidden="true" />

        <div className="conteudo-inicio">
          {/* Cada linha ganha sua própria faixa de fundo, como um letreiro */}
          <h1 className="titulo-inicio">
            <span className="titulo-inicio__linha">Menos</span>
            <span className="titulo-inicio__linha">desperdício,</span>
            <span className="titulo-inicio__linha">mais alimento,</span>
            <span className="titulo-inicio__linha">mais futuro!</span>
          </h1>

          <p className="lead-inicio">
            O Xepa+ conecta feirantes e consumidores para que o alimento fresquinho chegue à mesa
            das pessoas, e não ao lixo.
          </p>

          <a className="botao-inicio" href="#como-funciona">
            Veja como funciona
          </a>
        </div>

        <p className="selo-inicio" aria-hidden="true">
          Feira fresquinha com preço justo, direto da xepa pra sua mesa.
        </p>
      </section>

      {/* Faixa em carrossel embaixo do vídeo */}
      <FaixaXepa palavras={palavras} />
    </>
  );
}
