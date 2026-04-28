# Jogo de Adivinhação

Um mini-game interativo onde o objetivo é adivinhar um número secreto gerado aleatoriamente, com base em feedback visual e tentativas limitadas.

---

## Demonstração

O jogo utiliza um sistema de feedback visual dinâmico:

* 🔵 Número muito baixo
* 🔴 Número muito alto
* 🟡 Próximo do valor correto
* 🟢 Acerto

Além disso, o arco animado reage visualmente a cada tentativa, criando uma experiência mais intuitiva e envolvente.

---

## Como funciona

* O sistema gera um número secreto (`n`)
* O usuário envia tentativas (`x`)
* A cada tentativa:

  * O jogo retorna um feedback visual e textual
  * O número de tentativas restantes diminui
* O jogo termina quando:

  * O usuário acerta o número ✅
  * As tentativas acabam ❌

---

## Funcionalidades

* Feedback visual com cores e animações
* Arco animado com gradiente dinâmico
* Histórico das últimas tentativas
* Sistema de tentativas limitadas
* Interface responsiva e minimalista

---

## Controles

* Digite um número no campo de entrada
* Clique no botão → para enviar (ou use a tecla *Enter*)
* O número de tentativas restantes é exibido no botão

---

## Tecnologias utilizadas

* HTML5
* CSS3 (animações, gradientes, pseudo-elementos)
* JavaScript (ES Modules)

---

## 📁 Estrutura do projeto

/project
│── index.html
│
├── JS/
│   ├── index.js
│   ├── game.js
│   ├── visuals.js
│   └── validation-attemp.js
│
├── CSS/
│   ├── display.css
│   ├── controls.css
│   ├── global.css
│   └── history.css

---

## Conceitos explorados

* Manipulação de DOM
* Gerenciamento de estado no front-end
* Feedback visual orientado à UX
* Animações com CSS (`@keyframes`)
* Organização de código com módulos

---

## Possíveis melhorias futuras

* Sistema de dificuldade (fácil/médio/difícil)
* Modo escuro
* Feedback sonoro
* Melhorias de responsividade mobile
* Sistema de dicas inteligentes

---

## Autor

@VicHugo / victorh1711

---

## Licença

Este projeto é de uso livre para fins de estudo e aprendizado.
