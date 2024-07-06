<p align="center">
  <img src="https://github.com/JsnEvt/Ign_Habit/blob/main/img/nlw_ignite.png"alt="Logo do Projeto"/>
</p>
<h3 align="center">
Você no controle da sua rotina!
</h3>

## 🛈 Sobre
O programa tem o intuito de monitorar os compromissos assumidos pelo próprio usuário na tentativa de fazê-lo seguir uma rotina 
pré estabelecida.

Uma caixa de verificação na tela inicial tem uma cor que indica o progesso do cumprimento das atividades daquele dia.
0% sem cor, até o (roxo claro) que indica que todas atividades foram completadas.

## Telas 
<p align="center">
  <b>Aplicação WEB</b>
  <br>
    <img alt="Web"  title="Página inicial Web" src="img/web_index.jpg">
    <img alt="Cadastro de habito"  title="Página cadastro de hábito" src="img/web_cad_habit.jpg">
</p>

A rotina é criada e os dias que deverão ser cumpridos, são definidos na ocasião da criação.

<p align="center">
  <b>Aplicação Mobile</b>
  <br>
    <img alt="Mobile"  title="Página inicial Mobile" src="img/mobile_index.png">
    <img alt="Cadastro de habito mobile"  title="Página mobile cadastro de hábito" src="img/mobile_cad_habit.png">
    <img alt="Status mobile"  title="Status dos compromissos" src="img/mobile_stat.png">
    <img alt="Confirmacao mobile"  title="Confirmacao mobile" src="img/mobile_confirm.png">
</p>


A lista de hábitos é cumulativa.
Caso o usuário insira um novo hábito em um dia qualquer, à partir daquele dia, na lista de hábitos conterá este último hábito cadastrado, além dos hábitos já registrados.

## 👨‍💻 Para Devs
### Instalação

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/) no computador e [Expo](https://expo.dev/) no celular ([Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=pt_BR&gl=US), [IOS](https://apps.apple.com/us/app/expo-go/id982107779)).
Além disso é bom ter um editor de código-fonte para trabalhar com o código como [VSCode](https://code.visualstudio.com/).

> ⚠ Antes de executar o frontend e mobile verificar o IP da máquina que irá rodar o backend (pasta server) e configurar no arquivo de setup do axios presente na pasta lib dos respectivos projetos

- Rodando o Back End (servidor)

```bash
# Clone este repositório.
$ git clone https://github.com/JsnEvt/Ign_Habit.git

# Acesse a pasta do projeto no terminal.
$ cd NLW-Habits-Ignite

# Vá para a pasta server.
$ cd server

# Instale as dependências.
$ npm install

# Execute a aplicação em modo de desenvolvimento inicializando o prisma.
$ npx prisma migrate dev

# Execute a aplicação em modo de desenvolvimento.
$ npm run dev

```

- Rodando o FrontEnd (Web)

```bash
# Em outro terminal acesse a pasta do projeto.
$ cd web

# Instale as dependências.
$ npm install

# Execute a aplicação em modo de desenvolvimento.
$ npm run dev

```

- Rodando o App (Mobile)

```bash
# Vá para a pasta mobile.
$ cd mobile

# Instale as dependências
$ npm install

# Execute a aplicação
$ npx expo start

# Será aberto no terminal o menu do Expo onde poderá scanear o QR Code para executar o app diretamente no seu celular ou as opções de executar no emulador android ou iOS
```


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- HTML e CSS
- Figma
- Fastify
- JavaScript
- Typescript
- NodeJS
- ReactJS
- React Native
- Vite
- Tailwind CSS
- Expo
- Prisma
- SQLite
- Git e Github

## :memo: Licença
Esse projeto está sob a licença MIT.

### Instrutor: CTO da [Rocketseat](https://rocketseat.com.br/) :rocket: Diego Fernandes
<td align="center"><a href="https://rocketseat.com.br"><img style="border-radius: 50%;" src="https://avatars2.githubusercontent.com/u/2254731?s=400&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4" width="100px;" alt=""/><br /><sub><b>Diego Fernandes</b></sub>
</a><br /><a href="https://rocketseat.com.br/" title="Rocketseat"></a></td>

## 🦸 Autor

[![Linkedin Badge](https://img.shields.io/badge/-Jason-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/jason-everton/)](https://www.linkedin.com/in/jason-everton/)

[![Gmail Badge](https://img.shields.io/badge/-jasonemsw10@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:jasonemsw10@gmail.com)](mailto:jasonemsw10@gmail.com)

Feito por Jason Everton 👋🏽 [Entre em contato!](https://www.linkedin.com/in/jason-everton)

