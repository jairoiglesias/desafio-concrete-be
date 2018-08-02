# Desafio - Concrete

Criação de um aplicativo Back-End que exporta uma API RESTful para Sign in / Sign up.

Items utilizados na conclusão do desafio:  

* Express version ~4.14.0
* MongoDb para armazenamento de dados (Serviço MLab)
* Deploy no Heroku com NodeJS + MLab
* Gulp para jsHint e Nodemon para auto-restart do NodeJS (necessario instalar: npm install -g gulp)
* Mocha para testes unitários: (necessario instalar: npm install -g mocha)  
_Total: 9 testes de EndPoint com cada regra do desafio_
* JWT para Token de usuário
* Criptografia HASH não reversível da senha

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
**Onde [id_usuario] é o UUID devolvido via SignIn**  

headers: "Authorization Bearer [token]  
**Onde [token] é o JWT devolvido via SignIn**  

method: GET
```