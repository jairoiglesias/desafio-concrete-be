# Desafio - Concrete

Criação de um aplicativo Back-End que exporta uma API RESTful para Sign in / Sign up.

## EndPoints

### Criação de Cadastro (Sign up)

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

### Login (Sign In)

url : (https://desafio-concrete-be.herokuapp.com/signin)  
method: POST  
body: {  
	"email": "[email]",  
	"senha": "[senha]"  
}  