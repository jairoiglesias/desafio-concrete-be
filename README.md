# Desafio - Concrete

Criação de um aplicativo Back-End que exporta uma API RESTful para Sign in / Sign up.

Items que foram concluídos no desafio:

* Express version ~4.14.0
* MongoDb para armazenamento de dados (Serviço MLab)
* Deploy no Heroku com NodeJS + MLab
* Gulp para JSHint e Nodemon para auto-restart do NodeJS e Build (necessario instalar: npm install -g gulp)
* Mocha para testes unitários: (necessario instalar: npm install -g mocha)  
**Foram feitos 9 testes de EndPoint de acordo com as regras do desafio**
* JWT para Token de usuário
* Criptografia Hash não reversível da senha e token

## Usando Gulp

* Executar comando "gulp" na raiz do projeto irá iniciar o Nodemon com JSHint para desenvolvimento
* Executar comando "gulp build" na raiz do projeto para gerar o build

## Usando Mocha

* Executar comando "mocha" na raiz do projeto para iniciar os testes

## EndPoints

### Criação de Usuario (Sign up)

```json
url: (https://desafio-concrete-be.herokuapp.com/create_user)  
method: POST  
body: {  
    "nome": "[nome usuario]",  
    "email": "[email]",  
    "senha": "[senha]",  
    "telefones": [{  
        "numero" : "[telefone]",  
        "ddd": "[ddd]"  
    }]  
}  
```

### Login (Sign In)

```json
url : (https://desafio-concrete-be.herokuapp.com/signin)  
method: POST  
body: {  
	"email": "[email]",  
	"senha": "[senha]"  
}  
```
### Busca de Usuario

```json
url : (https://desafio-concrete-be.herokuapp.com/find_user/[id_usuario]  
=> Onde [id_usuario] é o UUID devolvido via SignIn 

headers: "Authorization Bearer [token]  
=> Onde [token] é o JWT devolvido via SignIn  

method: GET
```