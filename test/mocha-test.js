
let chai = require('chai')
let server = require('../bin/www')
let chaiHttp = require('chai-http')

let should = chai.should();
chai.use(chaiHttp)

let m_connectDb = require('./../libs/connectdb')

let userData = ''

process.env.secretJwtKey = "desafio-concrete-be-301547"
process.env.secretPwdKey = "desafio-concrete-be-superPwd"

describe('Users', function(){

    this.timeout(10000);

    before(function(){

        return new Promise((resolve, reject) => {

            m_connectDb().then(db => {
        
                const collection = db.collection('users')
        
                collection.remove({}, (err, result) => {
                    if(err) throw err
                    console.log('Deletado')
                    resolve()
                })
    
            })
        })

    })
    
        it('Novo Usuario Não Existente', (done) => {
    
            let newReg = {
                "nome": "jairo iglesias",
                "email": "jairohighwind@hotmail.com",
                "senha": "wizard360210",
                "telefones": [{
                    "numero" : "997963602",
                    "ddd": "11"
                }]
            }	
    
            chai.request(server)
            .post('/create_user')
            .send(newReg)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(200)
    
                res.body.should.have.property('id')
                res.body.should.have.property('data_criacao')
                res.body.should.have.property('data_atualizacao')
                res.body.should.have.property('ultimo_login')
                res.body.should.have.property('token')
                
                done()
            })
            
        })
    
        it('Novo Usuario Já Existente', (done) => {
    
            let newReg = {
                "nome": "jairo iglesias",
                "email": "jairohighwind@hotmail.com",
                "senha": "wizard360210",
                "telefones": [{
                    "numero" : "997963602",
                    "ddd": "11"
                }]
            }	
    
            chai.request(server)
            .post('/create_user')
            .send(newReg)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(200)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Email já existente')
                
                done()
            })
            
        })
    
        it('Signin Success', (done) => {
    
            let signinData = {
                "email": "jairohighwind@hotmail.com",
                "senha": "wizard360210",
            }	
    
            chai.request(server)
            .post('/signin')
            .send(signinData)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(200)
    
                res.body.should.have.property('id')
                res.body.should.have.property('data_criacao')
                res.body.should.have.property('data_atualizacao')
                res.body.should.have.property('ultimo_login')
                res.body.should.have.property('token')
    
                userData = res.body
                
                done()
            })
            
        })
    
        it('Signin Email Errado', (done) => {
    
            let signinData = {
                "email": "jairohighwindestaerrado@hotmail.com",
                "senha": "wizard360210",
            }	
    
            chai.request(server)
            .post('/signin')
            .send(signinData)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(401)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Usuário e/ou senha inválidos')
                
                done()
            })
            
        })
    
        it('Signin Password Errado', (done) => {
    
            let signinData = {
                "email": "jairohighwind@hotmail.com",
                "senha": "wizard360210estaerrado",
            }	
    
            chai.request(server)
            .post('/signin')
            .send(signinData)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(401)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Usuário e/ou senha inválidos')
                
                done()
            })
            
        })
    
        it('Busca Usuario Sucesso', (done) => {
    
            process.env.limit_min_token = 30
    
            chai.request(server)
            .get('/find_user/'+userData.id)
            .set('Authorization', 'Bearer ' + userData.token)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(200)
    
                res.body.should.have.property('_id')
                res.body.should.have.property('nome')
                res.body.should.have.property('email')
                res.body.should.have.property('senha')
                res.body.should.have.property('telefones')
                res.body.should.have.property('id_usuario')
                res.body.should.have.property('token')
                res.body.should.have.property('data_criacao')
                res.body.should.have.property('data_atualizacao')
                res.body.should.have.property('ultimo_login')
                
                done()
            })
            
        })
    
        it('Busca Usuario Erro Token Vazio', (done) => {
            
            chai.request(server)
            .get('/find_user/'+userData.id)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(401)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Não autorizado')
                
                done()
            })
            
        })
    
        it('Busca Usuario Erro Token Diferente', (done) => {
            
            chai.request(server)
            .get('/find_user/'+userData.id)
            .set('Authorization', 'Bearer wydgauydafwdwayfdawidfwaufdwadwutafdyatwdwadfwadyta fake token')
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(401)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Não autorizado')
                
                done()
            })
            
        })
    
        it('Busca Usuario Erro Token Expirado', (done) => {
    
            // Força tempo de  expiracao do token
            process.env.limit_min_token = 0
            
            chai.request(server)
            .get('/find_user/'+userData.id)
            .set('Authorization', 'Bearer ' + userData.token)
            .end(function(err, res){
    
                if(err) throw err
                
                res.should.have.status(401)
    
                res.body.should.have.property('mensagem')
                res.body.mensagem.should.be.equal('Sessão inválida')
                
                done()
            })
            
        })


    

})





