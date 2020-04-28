# Boas vindas ao projeto Crypto Index!

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo, e se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir deste repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

Você vai desenvolver um app full-stack! Isso significa que você vai construir tanto a API quanto o front-end (Server Side Rendered 😃)!

A aplicação a ser contruída é um "index" para vermos o preço do BitCoin em diferentes moedas.

---

## Desenvolvimento

Começando pela API, você vai desenvolver alguns endpoints conectando APIs externas e arquivos JSON locais do projeto.

A API externa que vamos utilizar é a da **CoinDesk**. A [documentação está disponível aqui](https://www.coindesk.com/coindesk-api).

O front-end, renderizado no servidor, vai basicamente servir como expositor para a API que você vai criar. São três telas simples que você precisará desenvolver.

Você pode acessar um protótipo das telas [neste link](https://www.figma.com/file/7TbyLzHSCpMRNxHEAN0QOi/Crypto-Index?node-id=0%3A1).

---

## Requisitos do projeto

#### Endpoints

### 1 - A URL base da API deve ser `localhost:3001` para todos os endpoints

A API deve ser iniciada com o comando `node api` a partir da raiz da aplicação.

### 2 - O endpoint `/login` deve receber uma requisição do tipo `POST`. O corpo da request deve conter um e-mail e uma senha válidos

Um email será considerado válido se tiver o formato `<prefixo>@<domínio>`.

A senha deverá conter 6 caracteres, todos números.

O corpo da requisição deverá seguir o formato abaixo:

```json
{
  "email": "email@mail.com",
  "password": "135982"
}
```

### 3 - Caso algum desses campos seja inválido, retorne um código de status 400 com o corpo `{ message: "Campos inválidos" }`.

### 4 - Caso esteja tudo certo com o login, a resposta deve ser um token de 16 caracteres, contendo letras e números aleatórios

A resposta da requisição deve ter o seguinte formato:

```json
{
  "token": "token-aqui"
}
```

### 5 - O endpoint `/cryto/btc` deve retornar a cotação de câmbio

Esse endpoint deve receber uma requisição do tipo `GET` e retornar o mesmo objeto retornado por [este endpoint](https://api.coindesk.com/v1/bpi/currentprice/BTC.json) da API do CoinDesk. A única diferença é que você deverá adicionar algumas chaves na resposta.

Na resposta desse endpoint, você vai adicionar as chaves `BRL`, `EUR` e `CAD` (Real, Euro e Dólar Canadense). O valor dessas moedas será calculado sobre à cotação do dólar em relação a elas e à cotação do Bitcoin em dólares. 

O valor da cotação do dólar nessas moedas **será fixo em um dado momento e deverá ser salvo em um arquivo** chamado `currencies.json` na sua API. Inicialmente, esse arquivo deverá ter o conteúdo abaixo:

> currencies.json
```json
{
  "BRL": "5.400",
  "EUR": "0.920",
  "CAD": "1.440"
}
```

Isso significa, por exemplo, que a cotação inicial do dólar será de 5,40 reais.

O valor das chaves `rate` e `rate_float`, na resposta, devem ser calculados a partir dos valores no arquivo `currencies.json` e da cotação do Bitcoin em dólares retornado pela API do CoinDesk. Esses campos devem também respeitar a tipagem (`string` e `float`, respectivamente). Os valores dos demais campos podem ser vistos no exemplo abaixo.

O cálculo deverá ser realizado da seguinte forma, para cada uma das três moedas adicionais:

- 1 dólar = 5,40 reais (salvo no arquivo);

- 1 BTC em dolares = 6,506.6717 dólares (campo `rate_float` de USD no resultado da API)

- 1 BTC em reais = 5,40 (`rate_float` de BRL) * 6,506.6717 (`rate_float` de USD) = 35,136.02718 reais.

Lembre-se de que os retornos da API são no padrão americano.

**Exemplo de retorno:**

```json
/* Retorno do endpoint `/crypto/btc` */
{
  "time": {
    "updated": "Mar 22, 2020 23:54:00 UTC",
    "updatedISO": "2020-03-22T23:54:00+00:00",
    "updateduk": "Mar 22, 2020 at 23:54 GMT"
  },
  "disclaimer": "This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org",
  "bpi": {
    "USD": {
      "code": "USD",
      "rate": "6,506.6717",
      "description": "United States Dollar",
      "rate_float": 6506.6717
    },
    "BRL": {
      "code": "BRL",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Brazilian Real",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "EUR": {
      "code": "EUR",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Euro",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "CAD": {
      "code": "CAD",
      "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
      "description": "Canadian Dollar",
      "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
    },
    "BTC": {
      "code": "BTC",
      "rate": "1.0000",
      "description": "Bitcoin",
      "rate_float": 1
    }
  }
}
```

### 6 - O endpoint `/crypto/btc` deve atualizar o valor da cotação das moedas `BRL`, `EUR` e `CAD`

O endpoint deve aceitar requisições `POST` e **atualizar o valor da cotação da moeda no arquivo** `currencies.json`.

O corpo da requisição deverá ter o seguinte formato:

```json
{
  "currency": "BRL",
  "value": 10000.0
}
```

O valor de `currency` só poderá ser `BRL`, `EUR` e `CAD`. `value` deve ser inteiro e maior que zero. Ambos os campos são obrigatórios.

A resposta de uma requisição feita com sucesso será da seguinte forma:

```json
{
  "message": "Valor alterado com sucesso!"
}
```

### 7 - Caso o valor passado para atualização no endpoint `/crypto/btc` seja inválido, o endpoint deve retornar um código 400

Se o valor de `currency` for inválido, o corpo da resposta deve ser `{ message: "Moeda inválida" }`.

Se o valor do campo `value` for inválido, o corpo da resposta deve ser `{ message: "Valor inválido" }`.

### 8 - Requisições para o endpoint `/crypto/btc` devem conter um token no cabeçalho na chave `Authorization`

A chave deve ser preenchida com o valor do token que foi fornecido ao usuário no login, da seguinte forma: `Authorization: <TOKEN_DO_LOGIN>`.

Caso um token não esteja disponível ou seja inválido, deve ser retornado um erro 401, com o seguinte corpo:

```json
{
  "message": "Token inválido"
}
```

### 9 - Uma requisição para um endpoint que não exista deve retornar um código 404

O corpo da resposta deve ser o seguinte:

```json
{
  "message": "Endpoint não encontrado"
}
```

### Front-end

### 10 - A URL base do front-end deve ser `localhost:3000`

O servidor do front-end ser iniciado com o comando `node server` a partir da raiz da aplicação.

### 11 - O front-end deve ser construído usando React e deve ser renderizado no servidor (SSR)

### 12 - Crie uma página de login, com a rota `login`

Essa página deve conter um formulário de e-mail e senha e um botão "Entrar".

Ao clicar no botão, deve ser feita uma requisição para o endpoint de `/login` da API.

Caso a requisição seja bem sucedida, o token retornado deve ser salvo no `localStorage`, e a página deve ser redirecionada para a raiz da aplicação `("/")`.

Caso contrário, a mensagem de erro deve ser exibida na tela.

Consulte o [protótipo](https://www.figma.com/file/7TbyLzHSCpMRNxHEAN0QOi/Crypto-Index?node-id=0%3A1) para ter uma ideia de como sua tela deve se parecer.

### 13 - Crie a página home, com a cotação do Bitcoin em várias moedas

Essa página é onde será possível ver a conversão de Bitcoin em outras moedas.

Ao carregar, a página deve fazer uma requisição `GET` para o endpoint `/crypto/btc` para obter os valores de conversão.

A página deve conter um input onde será possível digitar um valor em Bitcoins e quatro campos com os valores correspondentes em `USD`, `BRL`, `EUR` e `CAD`. Ao digitar o valor no input, os quatros campos devem ser atualizados.

Consulte o [protótipo](https://www.figma.com/file/7TbyLzHSCpMRNxHEAN0QOi/Crypto-Index?node-id=0%3A1) para ter uma ideia de como sua tela deve se parecer.

### 14 - Crie uma página para atualizar o valor da cotação de uma moeda

A página deverá conter:

- Um select onde deverá ser possível selecionar a moeda cuja cotação se deseja atualizar. Os valores possíveis devem ser `BRL`, `EUR` e `CAD`;

- Após ter selecionado uma moeda, um texto deve mostrar o valor atual da cotação;

- Um input onde o novo valor de cotação poderá ser digitado;

- Um botão "Atualizar". Ao clicar nesse botão, deve ser feita uma requisição `POST` para o endpoint `/crypto/btc`, com o novo valor da moeda selecionada. Caso a requisição seja bem sucedida, a página deverá ser redirecionada para a **home**. Caso contrário, a mensagem de erro retornada pela API deve ser exibida na página;

- Um botão "Voltar" que, quando clicado, redireciona para a **home**, sem atualizar o valor da moeda selecionada.

Consulte o [protótipo](https://www.figma.com/file/7TbyLzHSCpMRNxHEAN0QOi/Crypto-Index?node-id=0%3A1) para ter uma ideia de como sua tela deve se parecer.

## BÔNUS

### 15 - Adicione testes cobrindo todos os requisitos da API

### 16 - Adicione testes cobrindo todos os requisitos do front-end

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  - `git clone git@github.com:tryber/sd-01-block29-crypto-index-starter.git`.
  - Entre na pasta do repositório que você acabou de clonar:
    - `cd sd-01-block29-crypto-index-starter`

2. Instale as dependências
  - `npm install`

3. Crie uma branch a partir da branch `master`
  - Verifique que você está na branch `master`
    - Exemplo: `git branch`
  - Se não estiver, mude para a branch `master`
    - Exemplo: `git checkout master`
  - Agora crie uma branch à qual você vai submeter os `commits` do seu projeto
    - Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    - Exemplo: `git checkout -b joaozinho-crypto-index`

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  - Verifique que as mudanças ainda não estão no _stage_
    - Exemplo: `git status` (deve aparecer listado o arquivo alterado em vermelho)
  - Adicione o arquivo alterado ao _stage_ do Git
    - Exemplo:
      - `git add .` (adicionando todas as mudanças - _que estavam em vermelho_ - ao stage do Git)
      - `git status` (deve aparecer listado o arquivo adicionado em verde)
  - Faça o `commit` inicial
    - Exemplo:
      - `git commit -m 'iniciando o projeto Crypto Index'` (fazendo o primeiro commit)
      - `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

5. Adicione a sua branch com o novo `commit` ao repositório remoto
  - Usando o exemplo anterior: `git push -u origin joaozinho-crypto-index`

6. Crie um novo `Pull Request` _(PR)_
  - Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/crypto-index-starter/pulls)
  - Clique no botão verde _"New pull request"_
  - Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  - Clique no botão verde _"Create pull request"_
  - Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  - **Não se preocupe em preencher mais nada por enquanto!**
  - Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/crypto-index-starter/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

- Faça `commits` das alterações que você fizer no código regularmente

- Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

- Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  4. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  5. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

- Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  - No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  - No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  - No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-02`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros alunos forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
