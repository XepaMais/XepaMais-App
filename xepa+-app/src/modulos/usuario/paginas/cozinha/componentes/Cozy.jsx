import { useEffect, useRef, useState } from 'react';
import { CakeSlice, Clock3, GlassWater, Grid2X2, Leaf, Salad, Soup } from 'lucide-react';
import ScrollReveal from 'scrollreveal';
import videoCozinha from '@/assets/videos/cozinha-hero.mp4';
import Style from '@/modulos/usuario/paginas/cozinha/estilos/Cozy.module.css';
import imagemTalos from '@/assets/imagens/gerais/imagem-talos.jpg';
import imagemRefogados from '@/assets/imagens/gerais/imagem-refogados.jpg';
import imagemVitamina from '@/assets/imagens/gerais/imagem-vitamina.jpg';
import imagemBolo from '@/assets/imagens/gerais/imagem-bolo.jpg';
import imagemSaladaF from '@/assets/imagens/gerais/imagem-saladaF.jpg';
import imagemTomates from '@/assets/imagens/gerais/imagem-tomates.jpg';
import imagemSopaV from '@/assets/imagens/gerais/imagem-sopaV.jpg';
import imagemSopaC from '@/assets/imagens/gerais/imagem-sopaC.jpg';
import imagemSaladaC from '@/assets/imagens/gerais/imagem-saladaC.jpg';
import imagemMorangos from '@/assets/imagens/gerais/morangos.png';

const categorias = ['Todas', 'Saladas', 'Sopas', 'Doces', 'Sucos', 'Aproveitamento integral', 'Rápidas'];

const iconesCategoria = {
  Todas: Grid2X2,
  Saladas: Salad,
  Sopas: Soup,
  Doces: CakeSlice,
  Sucos: GlassWater,
  'Aproveitamento integral': Leaf,
  Rápidas: Clock3,
};

const receitas = [
  { nome: 'Salada ceaser', categoria: 'Saladas', tempo: '15 min', dificuldade: 'Fácil', ingredientes: ['tomate', 'cenoura', 'alface'], imagem: imagemSaladaC },
  { nome: 'Caldo verde', categoria: 'Sopas', tempo: '35 min', dificuldade: 'Fácil', ingredientes: ['couve', 'batata', 'cebola'], imagem: imagemSopaV },
  { nome: 'Bolo de banana ', categoria: 'Doces', tempo: '45 min', dificuldade: 'Média', ingredientes: ['banana', 'aveia', 'canela'], imagem: imagemBolo},
  { nome: 'Talos salteados com alho', categoria: 'Aproveitamento integral', tempo: '20 min', dificuldade: 'Fácil', ingredientes: ['couve', 'alho', 'cenoura'], imagem: imagemTalos,},
  { nome: 'Tomates recheados', categoria: 'Rápidas', tempo: '25 min', dificuldade: 'Média', ingredientes: ['tomate', 'arroz', 'queijo'], imagem: imagemTomates },
  { nome: 'Creme de cenoura', categoria: 'Sopas', tempo: '30 min', dificuldade: 'Fácil', ingredientes: ['cenoura', 'batata', 'gengibre'],imagem: imagemSopaC },
  { nome: 'Salada de frutas da estação', categoria: 'Doces', tempo: '12 min', dificuldade: 'Fácil', ingredientes: ['banana', 'mamão', 'laranja'], imagem: imagemSaladaF},
  { nome: 'Refogado colorido', categoria: 'Aproveitamento integral', tempo: '18 min', dificuldade: 'Fácil', ingredientes: ['cenoura', 'couve', 'cebola'], imagem: imagemRefogados},
  { nome: 'Vitamina de banana e mamão', categoria: 'Sucos', tempo: '5 min', dificuldade: 'Fácil', ingredientes: ['banana', 'mamão', 'leite'], imagem: imagemVitamina },
];

// Deixa o texto minúsculo para comparar sem se preocupar com maiúsculas
const normalizar = (texto) => texto.trim().toLocaleLowerCase('pt-BR');

// A receita é da categoria escolhida?
function bateComCategoria(receita, categoria) {
  return categoria === 'Todas' || receita.categoria === categoria;
}

// A receita usa pelo menos um dos ingredientes da sacola?
function bateComIngredientes(receita, ingredientesEscolhidos) {
  if (ingredientesEscolhidos.length === 0) return true;

  return ingredientesEscolhidos.some((escolhido) =>
    receita.ingredientes.some((ingrediente) => normalizar(ingrediente).includes(escolhido) || escolhido.includes(normalizar(ingrediente)))
  );
}
// Cada componente abaixo é um bloco da página.

function Hero() {
  const heroImageRef = useRef(null);
  const heroCopy = useRef(null);
  const morangosRef = useRef(null);

  useEffect(() => {
    const reveal = ScrollReveal();
    const targets = [heroImageRef.current, heroCopy.current, morangosRef.current].filter(Boolean);

    reveal.reveal(heroImageRef.current, {
      origin: 'right',
      duration: 3000,
      distance: '40%',
    });
    reveal.reveal(morangosRef.current, {
      origin: 'right',
      duration: 3000,
      distance: '60%',
    });
    reveal.reveal(heroCopy.current, {
      origin: 'left',
      duration: 3000,
      distance: '40%',
    });

    return () => targets.forEach((target) => reveal.clean(target));
  }, []);

  return (
    <section className={Style.hero} id="inicio">
      <div ref={heroCopy} className={Style.heroCopy}>
        <h1>Receitas com o que você levou da <span className={Style.spanhero}>feira</span></h1>
        <p>Uma sacola cheia de possibilidades. Encontre um jeito gostoso de aproveitar cada ingrediente.</p>
        <a href="#receitas" className={Style.heroLink}>
          Encontrar minha próxima receita <span>→</span>
        </a>
      </div>

      <div ref={heroImageRef} className={Style.heroImage}>
        <video
          src={videoCozinha}
          autoPlay
          loop
          muted
          playsInline
          aria-label="Vídeo de alimentos frescos para a cozinha"
        />
        <span className={Style.photoCaption}>
          Receitas para aproveitar <b>●</b> da feira pra sua mesa
        </span>
      </div>
    </section>
  );
}

function CategoryFilters({ categoriaAtual, setCategoria }) {
  return (
    <div className={Style.filters} role="group" aria-label="Filtrar por categoria">
      {categorias.map((nome) => {
        const Icone = iconesCategoria[nome];
        const classe = nome === categoriaAtual ? `${Style.filter} ${Style.selected}` : Style.filter;

        return (
          <button key={nome} type="button" className={classe} onClick={() => setCategoria(nome)}>
            <Icone className={Style.filterIcon} size={21} strokeWidth={1.7} aria-hidden="true" />
            {nome}
          </button>
        );
      })}
    </div>
  );
}

function IngredientPicker({ ingredientes, setIngredientes }) {
  function adicionar(event) {
    event.preventDefault();
    const campo = event.currentTarget.elements.ingrediente;
    const nome = normalizar(campo.value);

    if (nome && !ingredientes.includes(nome)) {
      setIngredientes([...ingredientes, nome]);
    }
    campo.value = '';
  }

  function remover(nome) {
    setIngredientes(ingredientes.filter((item) => item !== nome));
  }

  function irParaReceitas() {
    document.getElementById('receitas').scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section className={Style.pantry}>
      <div>
        <span className={Style.eyebrow}>ENCONTRE SUA PRÓXIMA IDEIA</span>
        <h2>O que você comprou?</h2>
        <p>Adicione o que veio na sua sacola e descubra o que preparar.</p>
      </div>

      <div className={Style.pantryForm}>
        <form onSubmit={adicionar} className={Style.add}>
          <span>＋</span>
          <input name="ingrediente" placeholder="Digite um ingrediente e aperte Enter" aria-label="Adicionar ingrediente" />
          <button type="submit">Adicionar</button>
        </form>

        <div className={Style.chips} aria-label="Ingredientes escolhidos">
          {ingredientes.map((item) => (
            <button type="button" key={item} className={Style.chip} onClick={() => remover(item)}>
              {item}
              <span aria-label={`Remover ${item}`}>×</span>
            </button>
          ))}
        </div>

        <button className={Style.match} type="button" onClick={irParaReceitas}>
          Ver receitas possíveis <span>→</span>
        </button>
      </div>
    </section>
  );
}

function RecipeCard({ receita }) {
  return (
    <article className={Style.card}>
      <div
        className={`${Style.cardImage} ${receita.imagem ? Style.cardImageWithImage : ''}`}
        style={{ backgroundColor: receita.cor }}
      >
        {receita.imagem ? (
          <img src={receita.imagem} alt={receita.nome} />
        ) : (
          <span aria-hidden="true">{receita.emoji}</span>
        )}
      </div>

      <div className={Style.cardBody}>
        <span className={Style.tag}>{receita.categoria}</span>
        <h3>{receita.nome}</h3>

        <div className={Style.meta}>
          <span>◷ {receita.tempo}</span>
          <span>·</span>
          <span>{receita.dificuldade}</span>
        </div>

        <div className={Style.ingredients}>{receita.ingredientes.join(' · ')}</div>
      </div>
    </article>
  );
}

function RecipeGrid({ lista }) {
  if (lista.length === 0) {
    return (
      <div className={Style.grid}>
        <div className={Style.empty}>
          <strong>Nenhuma receita por aqui ainda</strong>
          Experimente outro ingrediente ou categoria.
        </div>
      </div>
    );
  }

  return (
    <div className={Style.grid}>
      {lista.map((receita) => (
        <RecipeCard key={receita.nome} receita={receita} />
      ))}
    </div>
  );
}

// Página principal: guarda o estado e junta todos os blocos.

export default function Cozy() {
  const [categoria, setCategoria] = useState('Todas');
  const [ingredientes, setIngredientes] = useState(['tomate', 'banana', 'cenoura', 'couve']);

  // Só ficam as receitas que passam nos filtros de categoria e ingredientes
  const receitasFiltradas = receitas.filter(
    (receita) =>
      bateComCategoria(receita, categoria) &&
      bateComIngredientes(receita, ingredientes)
  );

  return (
    <div className={Style.page}>
      <Hero />

      <main>
        <section className={Style.recipes} id="receitas">
          <CategoryFilters categoriaAtual={categoria} setCategoria={setCategoria} />
          <IngredientPicker ingredientes={ingredientes} setIngredientes={setIngredientes} />

          <div className={Style.sectionHeading}>
            <div>
              <span className={Style.eyebrow}>INSPIRAÇÃO PARA HOJE</span>
              <h2>Receitas para aproveitar</h2>
              <p>Pratos simples, ingredientes frescos e sem desperdício.</p>
            </div>
            <span className={Style.count}>{receitasFiltradas.length} receitas</span>
          </div>

          <RecipeGrid lista={receitasFiltradas} />

          <button className={Style.more} type="button">
            Ver mais receitas <span>→</span>
          </button>
        </section>
      </main>
    </div>
  );
}
