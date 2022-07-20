# <img src="https://app-vlc.hotmart.com/images/icons/hotmart-logo.svg" alt="Hotmart" width="220">

[![JS Hotmart Style](https://img.shields.io/badge/code%20style-hotmart-F04E23.svg)](https://www.npmjs.com/package/eslint-config-hotmart)

[![Build Status](https://drone.integration.hotmart.com/api/badges/Hotmart-Org/hotmart-authentication-guide/status.svg)](https://drone.integration.hotmart.com/Hotmart-Org/hotmart-authentication-guide)

Guia de implementação de uma aplicação back-end, em Node, com o sistema de SSO Hotmart Authentication.

## Pré-requisitos

Para implementar o Hotmart Authentication você precisa solicitar a criação de um serviço de autenticação [preenchendo este formulário](https://docs.google.com/document/d/19wQyIHhNPbjWyutHgtvDTtSbsGxyQPKOuWRZVzE3XM0/edit#heading=h.urt713xjbyw).

## Instalação

Para instalar as dependências necessárias basta executar:

```
npm install
```

## Setup

- Crie um arquivo `.env` seguindo o exemplo `.env-sample`
- Se necessário, altere o `API_HOST` e `API_PORT`
- Com o serviço de autenticação criado, acesse https://app-vlc.hotmart.com/tools/credentials e use as chaves do serviços para preencher as variáveis com prefixo `CLIENT_`

<img src="https://user-images.githubusercontent.com/96084861/180067065-6f2d853d-2e97-42e8-a423-f6e2eb1d8305.png" alt="Credential SSO Card" />


## Execução

Para inicializar a aplicação basta executar:

```
npm start
```

Após inicializar a aplicação, você pode acessa-la por http://localhost:3000 ou o host configurado na variável de ambiente `API_HOST`

# Fluxos

Ao realizar a autenticação utilizando a solução de SSO Hotmart Authentication, será disponibilizado dois fluxos:

- `Autenticação`: Viabiliza a autenticação do usuário Hotmart no site do parceiro, além de prover os recursos de atualização de tokens para manter o mesmo autenticado;
- `Integração`: Possibilita o acesso à dados mais profundos do usuário, como a área de membros, vendas e assinaturas.

A divisão desses dois fluxos tem como principal finalidade prover acesso aos dados de _integração_ mesmo após o usuário ter encerrado acesso na aplicação em questão (`/logout`)

### Rotas

- `/`: O root verifica se existe um usuário autenticado em cache para prover a rota de login ou as rotas de usuário autenticado;
- `/login`: É a única rota que renderizamos um HTML, nela exibimos o botão de [Entrar com a Hotmart](https://www.npmjs.com/package/@hotmart/hot-login) para que o usuário possa ser redirecionado para fluxo de autenticação da Hotmart;
- `/profile`: Com o usuário autenticado em cache, fazemos uma decodificação do token para disponibilizar os dados básicos de perfil;
- `/club/*`: Referente a Área de membros, esses endpoints possibilitam que você obtenha as informações dos módulos e páginas, além de dados de alunos e seus respectivos progressos. [Documentação](https://developers.hotmart.com/docs/pt-BR/v1/club/about-club/);
- `/sales/*`: Aqui você terá acesso às informações detalhadas de todas as suas vendas realizadas na Hotmart [Documentação](https://developers.hotmart.com/docs/pt-BR/v1/sales/about-sales/);
- `/subscriptions/*`: Esses endpoints entregam dados relacionados a cobrança recorrente por assinatura de algum determinado produto. [Documentação](https://developers.hotmart.com/docs/pt-BR/v1/subscription/about-subscription/);
- `/logout`: Rota utilizada para encerrar o fluxo de autenticação do usuário. Isso encerra o acesso a rota `/profile` mas mantém disponível o acesso aos endpoints de integração (`club`, `sales`, `subscriptions`);
- `/revoke`: Essa é a rota destinada ara encerrar ambos os fluxos e realizar o logout completo, tanto de `/profile` quanto `/club`, `/sales` e `/subscriptions`;

Pra mais detalhes das APIs do fluxo de integração, acesse: [Hotmart Developers](https://developers.hotmart.com/)

## Botão de Entrar com a Hotmart

Neste guia de implementação usamos o botão [Entrar com a Hotmart](https://www.npmjs.com/package/@hotmart/hot-login) na rota `/login` para redirecionar o usuário para a área de autenticação da Hotmart.

Este componente está disponível no pacote NPM [@hotmart/hot-login](https://www.npmjs.com/package/@hotmart/hot-login). Para instala-lo basta executar o seguinte comando:

```
npm i @hotmart/hot-login
```

## To-do

- Projeto front-end para comunicar-se com a api back-end, tornando a implementação mais próxima do cenário real;
- Testes unitários;
- Testes E2E.

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

MIT. Copyright 2022 Hotmart
