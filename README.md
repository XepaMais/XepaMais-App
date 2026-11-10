<div align="center">

<img src="xepa+-app/src/assets/imagens/marca/logo.png" alt="Xepa+" width="180" />

# Xepa+

**Conectamos feirantes e consumidores para que o alimento da feira chegue à mesa, e não ao lixo.**

![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)
![Status](https://img.shields.io/badge/status-em_desenvolvimento-FF5200?style=for-the-badge)

[Sobre](#-quem-somos) · [O problema](#-o-desperdício-na-feira-é-maior-do-que-parece) · [Funcionalidades](#-funcionalidades) · [Como rodar](#-como-rodar) · [Time](#-conheça-nosso-time)

</div>

---

## 🧺 Quem somos

O **Xepa+** é um projeto acadêmico contra o desperdício de alimentos nas feiras livres e na CEAGESP, na cidade de São Paulo.

Somos estudantes que se uniram para dar um novo destino à **xepa**: os alimentos que sobram no fim da feira e que ainda estão ótimos para o consumo. O nome vem da prática em que os feirantes baixam os preços no fim do dia para vender o que sobrou.

<table>
  <tr>
    <td width="33%" valign="top">
      <h3>🍉 Missão</h3>
      <b>Dar um novo destino ao que sobra da feira.</b><br /><br />
      Reduzir o desperdício de frutas, verduras e legumes das feiras livres, conectando feirantes a consumidores e tornando esses alimentos mais acessíveis.
    </td>
    <td width="33%" valign="top">
      <h3>🍍 Visão</h3>
      <b>Ser referência no aproveitamento pós-feira.</b><br /><br />
      Construir um modelo sustentável, acessível e eficiente, que gere valor para consumidores, feirantes e parceiros.
    </td>
    <td width="33%" valign="top">
      <h3>🍒 Valores</h3>
      <b>O que guia cada decisão.</b><br /><br />
      🌱 <b>Sustentabilidade:</b> alimento bom não vira lixo.<br />
      🤝 <b>Acessibilidade:</b> comida de qualidade a preço justo.<br />
      💚 <b>Compromisso social:</b> cuidado com quem vive da feira e com quem depende dela.
    </td>
  </tr>
</table>

---

## 📊 O desperdício na feira é maior do que parece

<div align="center">

| 🗑️ **33 mil toneladas** | 🍽️ **19 milhões de brasileiros** | 🧑‍🌾 **95% dos feirantes** |
| :---: | :---: | :---: |
| de alimentos vão para o lixo por ano nas feiras da capital paulista | poderiam fazer 3 refeições ao dia com esse volume | relatam desperdício no fim da feira |

<sub>Fonte: estudo da Unesp sobre o desperdício de alimentos nas feiras livres de São Paulo.</sub>

</div>

---

## ✨ Funcionalidades

<table>
  <tr>
    <td width="50%" valign="top">
      <h3>🛒 Para o consumidor</h3>
      <ul>
        <li>Vitrine de xepas disponíveis perto de você</li>
        <li>Mapa das feiras livres da cidade</li>
        <li>Carrinho, pagamento e histórico de pedidos</li>
        <li>Chat direto com o feirante</li>
        <li>Painel de impacto: quanto alimento você salvou</li>
        <li>Receitas para aproveitar cada alimento</li>
      </ul>
    </td>
    <td width="50%" valign="top">
      <h3>🧑‍🌾 Para o feirante</h3>
      <ul>
        <li>Cadastro de feiras e produtos</li>
        <li>Controle financeiro de rendas e gastos, com exportação em PDF</li>
        <li>Histórico de vendas e de produtos</li>
        <li>Assistente com inteligência artificial para o dia a dia da banca</li>
        <li>Planos de assinatura</li>
      </ul>
    </td>
  </tr>
</table>

---

## 🚀 Como rodar

> Pré-requisito: [Node.js](https://nodejs.org/) instalado.

```bash
git clone https://github.com/XepaMais/XepaMais-App.git
cd XepaMais-App/xepa+-app
npm install
```

Crie um arquivo `.env` a partir do `.env.example` e preencha a chave do Google Maps:

```env
VITE_GOOGLE_MAPS_API_KEY=sua-chave-aqui
```

Depois, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Inicia o app em modo de desenvolvimento |
| `npm run build` | Gera a versão de produção em `dist/` |
| `npm run preview` | Abre localmente a versão de produção |
| `npm run lint` | Verifica o código com o ESLint |

### 🧰 Tecnologias

React · Vite · React Router · Google Maps (`@react-google-maps/api`) · Leaflet · jsPDF · Lucide · NumberFlow · ScrollReveal

---

## 👥 Conheça nosso time

Estudantes de diferentes áreas com um mesmo objetivo: levar o alimento da feira à mesa, e não ao lixo.

<table>
  <tr>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/gabriel.jpeg" width="110" alt="Gabriel Carneiro" /><br />
      <b>Gabriel Carneiro</b><br />
      <sub>Product Owner · Marketing</sub><br />
      <a href="https://www.linkedin.com/in/gabriel-carneiro-5459b6303/">LinkedIn</a> · <a href="https://github.com/carneirogabri">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/jamilly.jpeg" width="110" alt="Jamilly Moreira" /><br />
      <b>Jamilly Moreira</b><br />
      <sub>Scrum Master · Vendas</sub><br />
      <a href="https://www.linkedin.com/in/jamillymoreira/">LinkedIn</a> · <a href="https://github.com/milly-m-dev">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/fernanda.jpeg" width="110" alt="Fernanda Ribeiro" /><br />
      <b>Fernanda Ribeiro</b><br />
      <sub>Documentarista · Financeiro</sub><br />
      <a href="https://www.linkedin.com/in/f3f3h/">LinkedIn</a> · <a href="https://github.com/f3f3h">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/hadson.jpeg" width="110" alt="Hadson de Jesus" /><br />
      <b>Hadson de Jesus</b><br />
      <sub>Desenvolvedor · Vendas</sub><br />
      <a href="https://www.linkedin.com/in/hadson-ferreira-068088271/">LinkedIn</a> · <a href="https://github.com/fhadson">GitHub</a>
    </td>
  </tr>
  <tr>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/henrique.jpeg" width="110" alt="Henrique Mazza" /><br />
      <b>Henrique Mazza</b><br />
      <sub>Desenvolvedor · IA</sub><br />
      <a href="https://www.linkedin.com/in/henriquemazzavalle/">LinkedIn</a> · <a href="https://github.com/HenriqueMazza">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/igor.jpeg" width="110" alt="Igor Aguiar" /><br />
      <b>Igor Aguiar</b><br />
      <sub>Desenvolvedor · Dados</sub><br />
      <a href="https://www.linkedin.com/in/igor-aguiar-ab193132b/">LinkedIn</a> · <a href="https://github.com/Igordevice">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/matheus.jpeg" width="110" alt="Matheus Barros" /><br />
      <b>Matheus Barros</b><br />
      <sub>Desenvolvedor · Dados</sub><br />
      <a href="https://www.linkedin.com/in/matheus-barros-13b652330/">LinkedIn</a> · <a href="https://github.com/MatheusSouzaBarros">GitHub</a>
    </td>
    <td align="center" width="25%">
      <img src="xepa+-app/src/assets/imagens/sobre-nos/murilo.jpg" width="110" alt="Murilo Verissimo" /><br />
      <b>Murilo Verissimo</b><br />
      <sub>Desenvolvedor · Marketing</sub><br />
      <a href="https://www.linkedin.com/in/murilo-verissimo-44a958372/">LinkedIn</a> · <a href="https://github.com/verissimoMuh">GitHub</a>
    </td>
  </tr>
</table>

---

## 💛 Agradecimentos

Às nossas famílias, aos professores e orientadores e aos feirantes que abriram suas bancas para a gente. Este projeto também é de vocês.

<div align="center">
  <sub>Feito com 🍊 pelo time Xepa+ · São Paulo</sub>
</div>
