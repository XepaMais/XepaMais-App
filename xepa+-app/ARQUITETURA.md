# Como o projeto Xepa+ está organizado

Este arquivo explica onde encontrar cada parte do programa. A ideia principal é simples: **cada área guarda suas próprias telas e peças; o que for realmente usado por várias áreas fica em `compartilhado`; imagens e outros recursos ficam em `assets`.**

## Como uma tela aparece no site

Quando alguém abre um endereço, o programa segue este caminho:

1. `src/main.jsx` inicia o site.
2. `src/App.jsx` reúne as listas de endereços disponíveis.
3. `src/aplicacao/rotas/` relaciona cada endereço à tela que deve aparecer.
4. A tela fica dentro da área correspondente em `src/modulos/`.
5. A tela monta as partes menores que ficam em suas pastas `componentes/` e carrega seus estilos e imagens.

Por isso, `App.jsx` não contém todas as telas. Ele funciona como um ponto de ligação entre as rotas.

## Mapa das pastas

```text
src/
├── main.jsx                  # Ponto de início do site
├── App.jsx                   # Reúne as rotas
├── aplicacao/
│   └── rotas/                # Endereços e telas correspondentes
├── modulos/
│   ├── autenticacao/         # Entrar, criar conta e escolher perfil
│   ├── feirante/             # Área de quem vende nas feiras
│   ├── usuario/              # Área de quem compra ou usa o serviço
│   └── publico/              # Páginas abertas, como início e sobre nós
├── compartilhado/            # Peças e recursos usados por mais de uma área
└── assets/                   # Imagens, ícones, vídeos e fontes do site
```

Dentro de cada módulo, `paginas/` guarda telas. Uma tela pode ter suas próprias pastas `componentes/` e `estilos/`. Assim, as peças específicas de uma tela ficam próximas dela.

Exemplo reduzido:

```text
modulos/
└── feirante/
    └── paginas/
        └── financeiro/
            ├── Financeiro.jsx       # Tela financeira
            ├── componentes/         # Partes usadas nessa tela
            └── estilos/             # Aparência dessa tela
```

## Onde colocar cada coisa

Antes de criar um arquivo, pergunte: **quem usa isso?**

- Só quem vende? Coloque em `src/modulos/feirante/`.
- Só quem compra ou usa o serviço? Coloque em `src/modulos/usuario/`.
- Entrar, criar conta ou escolher perfil? Coloque em `src/modulos/autenticacao/`.
- Qualquer pessoa, sem entrar em uma área? Coloque em `src/modulos/publico/`.
- Duas ou mais áreas usam a mesma peça? Coloque em `src/compartilhado/`.
- É imagem, ícone, vídeo ou fonte? Coloque em `src/assets/`, na pasta correspondente.

Não coloque em `compartilhado/` algo usado por uma área só. E um módulo não deve buscar arquivos diretamente dentro de outro módulo. Se duas áreas precisarem da mesma peça, ela deve ser movida para `compartilhado/`.

## Exemplos do projeto

- A tela inicial de quem vende está em `src/modulos/feirante/paginas/inicio/`.
- A tela inicial de quem usa o serviço está em `src/modulos/usuario/paginas/inicio/`.
- A página pública de apresentação está em `src/modulos/publico/paginas/inicio/`.
- As listas de endereços ficam em `src/aplicacao/rotas/`, separadas por área.
- Os recursos visuais ficam reunidos em `src/assets/`.

## Como adicionar uma tela

1. Crie uma pasta em `paginas/` dentro da área correta. Use um nome curto que explique a tela, como `meus-pedidos`.
2. Crie o arquivo da tela dentro dessa pasta, com nome iniciado por letra maiúscula, como `MeusPedidos.jsx`.
3. Se a tela tiver partes menores ou estilos próprios, crie as pastas `componentes/` e `estilos/` ali dentro.
4. Registre o endereço da tela no arquivo de rotas da mesma área em `src/aplicacao/rotas/`.
5. Se precisar de imagens, use arquivos de `src/assets/`.

Exemplo: uma nova tela exclusiva do usuário ficaria em `src/modulos/usuario/paginas/meus-pedidos/MeusPedidos.jsx`, e seu endereço seria registrado em `rotas-usuario.jsx`.

## Nomes e imports

- Telas e componentes começam com letra maiúscula e usam palavras juntas, como `MeusPedidos.jsx`.
- Funções reutilizáveis chamadas hooks começam com `use`, como `useCarrinho.js`.
- Serviços e funções auxiliares usam nomes descritivos em camelCase, como `buscarFeiras.js`.
- Pastas usam nomes em português e letras minúsculas; se houver mais de uma palavra, separe com hífen.
- Para importar arquivos de `src/`, use o atalho `@/`. Por exemplo: `@/modulos/usuario/paginas/inicio/Home`.

## Observação sobre acesso

As rotas foram separadas por área, mas o projeto ainda não identifica se a pessoa conectada é feirante ou usuário. Para impedir que um perfil abra a área do outro, primeiro será necessário implementar uma sessão e guardar o perfil de quem entrou.
