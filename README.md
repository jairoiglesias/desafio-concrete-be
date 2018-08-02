# Desafio - Concrete

Criação de um aplicativo Back-End que exporta uma API RESTful para Sign in / Sign up.

### EndPoints

## Criação de Cadastro

url: (https://desafio-concrete-be.herokuapp.com/create_user) __
method: POST __
body: {
    "nome": "[nome usuario]",
    "email": "[email]",
    "senha": "[senha]",
    "telefones": [{
        "numero" : "[telefone]",
        "ddd": "[ddd]"
    }]
}

