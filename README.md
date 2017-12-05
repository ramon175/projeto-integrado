# Node.js Server para aplicação do Projeto Integrado

Esta aplicação foi desenvolvida para o projeto integrado dos alunos do 6o semestre do curso de Sistemas de Informação da Universidade Anhembi Morumbi. Esta aplicação utiliza as tecnologias Bootstrap, Jquery e JquerySession no front-end, e Node.js utilizando padrão DAO no backend.

Beatriz Alves
Lucas Hoberty
Ramon Castan

## Rodar o app localmente

1. Instale o [Node.js][]
+ acesse o diretório raiz do projeto
+ execute `npm install` para instalar as dependências do projeto
+ execute `npm start` para iniciar o app localmente
+ Acesse o app através do browser na porta disponibilizada no console <http://localhost:porta>

2. Apos acessar a rota, você chegará na tela inicial da aplicação, clique em "Cadastrar":

![alt text](screenshots/1.png "Tela inicial")

3. Preencha os dados conforme solicitado e clique em cadastrar:

![alt text](screenshots/2.png "Cadastro")

4. Um pop-up deve aparecer caso o cadastro dê certo:

![alt text](screenshots/3.png "Cadastro sucesso")

5. Clique no botão azul para retornar à tela inicial

6. Na tela inicial, clique em "Produtos Nacionais" para ativar o filtro de produtos:

![alt text](screenshots/4.png "Produtos Nacionais")
![alt text](screenshots/6.png "Produtos Nacionais")

7. Na tela inicial, clique em "Produtos Importado" para ativar o filtro de produtos:

![alt text](screenshots/5.png "Produtos Importados")
![alt text](screenshots/7.png "Produtos Importados")

8. Na tela inicial, clique em "Login".:

![alt text](screenshots/8.png "Login")

9. Deverá aparecer um pop-up com informações para login. Preencha-o com as informações de cadastro e clique em "Entrar":

![alt text](screenshots/9.png "Login Modal")

10. Percebe-se o uso da Sessão através do uso do nome de usuário na tela inicial e a adição dos ícones de carrinho nos produtos:

![alt text](screenshots/10.png "Logado")


[Install Node.js]: https://nodejs.org/en/download/
