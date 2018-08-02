# Desafio - Concrete

Criação de um aplicativo Back-End que exporta uma API RESTful para Sign in / Sign up.

## EndPoints

### Criação de Usuario (Sign up)

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

### Busca de Usuario

url : (https://desafio-concrete-be.herokuapp.com/find_user/[id_usuario]  
Onde [id_usuario] é o GUID devolvido via SignIn

headers: "Authorization Bearer [token]
Onde [token] é o JWT devolvido via SignIn
method: GET