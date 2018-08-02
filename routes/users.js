

let m_connectDb = require('./../libs/connectdb')

const Joi = require('joi')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const moment = require('moment')

// console.log(new Date().toLocaleDateString())

// Schema para criação de usuario
const schemaCreateUser = Joi.object().keys({
  nome: Joi.string().min(3).max(15).required(),
  email: Joi.string().email({ minDomainAtoms: 2 }).required(),
  senha: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  telefones: Joi.array().items([
    Joi.object().keys({
      numero: Joi.string().min(8).max(9).required(),
      ddd: Joi.string().length(2).required()
    }).required()
  ]).required()
  
})

// Schema para Signin
const schemaSignin = Joi.object().keys({
  email: Joi.string().email({minDomainAtoms: 2}).required(),
  senha: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required()
})

module.exports = (app) => {

  app.post('/create_user', (req, res) => {

    // console.log(req.body)

    const result = Joi.validate(req.body, schemaCreateUser);

    if (result.error != null) {
      console.log('Erro de input')
      return res.status(422).json({ mensagem: result.error });
    }
    else{
      
      let newUUID = uuid.v4()
      console.log(newUUID)

      m_connectDb().then(db => {

        let registro = req.body

        const collection = db.collection('users')

        collection.findOne({"email": registro.email}, (err, result) => {
        	if(err) throw err

          console.log(result)
          
          if(result == null){

            // Criptografa a senha com SHA256 e uma SecretKey Customizada
            let cryptoSenha = crypto.createHmac('sha256', process.env.secretPwdKey).update(req.body.senha).digest('hex')

            // Cria um Token via JWT
            let token = jwt.sign(newUUID, process.env.secretJwtKey)

            /* Fiquei na duvida se era necessario isso ... mas está pedindo no desafio! */
            let criptoToken = crypto.createHmac('sha256', process.env.secretJwtKey).update(token).digest('hex')
            
            registro.id_usuario = newUUID
            registro.email = req.body.email
            registro.senha = cryptoSenha
            registro.token = criptoToken
            registro.data_criacao = new Date()
            registro.data_atualizacao = ''
            registro.ultimo_login = ''

            collection.insert(registro, (err, result) => {
              if(err) throw err

              // console.log('Usuario salvo com sucesso')
              console.log(result)

              let resp = {
                id: registro.id_usuario,
                data_criacao: registro.data_criacao,
                data_atualizacao: registro.data_atualizacao,
                ultimo_login: registro.ultimo_login,
                token: token
              }
              
              return res.status(200).json(resp)

            })
          }
          else{

            return res.status(200).json({mensagem: 'Email já existente'})
          }
          

        })

      })

    }


  })

  app.post('/signin', (req, res) => {

    const result = Joi.validate(req.body, schemaSignin);

    if (result.error != null) {
      console.log('Erro de input')
      return res.status(422).json({ mensagem: result.error });
    }
    else{

      let email = req.body.email

      m_connectDb().then(db => {

        const collection = db.collection('users')

        collection.findOne({email: email}, (err, registro) => {

          if(err) throw err;

          // console.log(registro)

          if(registro == null){
            return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"})
          }
          else{

            // Criptografa a senha com SHA256 e uma SecretKey Customizada
            let cryptoSenha = crypto.createHmac('sha256', process.env.secretPwdKey).update(req.body.senha).digest('hex')

            if(registro.senha == cryptoSenha){

              let ultimo_login = new Date().toLocaleString()

              collection.update({id_usuario: registro.id_usuario}, {$set: {ultimo_login: ultimo_login}}, (err) => {

                if(err) throw err

                let resp = {
                  id: registro.id_usuario,
                  data_criacao: registro.data_criacao,
                  data_atualizacao: registro.data_atualizacao,
                  ultimo_login: ultimo_login,
                  token: registro.token
                }
                
                return res.status(200).json(resp);

              })

            }
            else{
              return res.status(401).json({mensagem: "Usuário e/ou senha inválidos"})
            }

          }

        })

      })

    }


  })

  app.get('/find_user/:id_usuario', (req, res) => {

    let auth = req.headers.authorization

    if(!auth || !auth.startsWith('Bearer')){
      return res.status(401).json({mensagem: 'Não autorizado'})
    }

    auth = auth.split('Bearer').pop().trim()
    
    let id_usuario = req.params.id_usuario

    m_connectDb().then(db => {

      const collection = db.collection('users')

      // Pesquisa o registro
      collection.findOne({id_usuario: id_usuario}, (err, result) => {

        if(err) throw err

        console.log(result)

        // Compara Token
        let userToken = result.token

        if(userToken != auth){
          console.log('Token diferente')
          return res.status(401).json({mensagem: 'Não autorizado'})
        }

        // Verifica tempo do ultimo login
        let ultimo_login = result.ultimo_login

        let data1 = moment(new Date(), "DD/MM/YYYY hh:mm");
        let data2 = moment(new Date(ultimo_login), "DD/MM/YYYY hh:mm");
        let diferenca = data1.diff(data2, 'minutes');

        if(diferenca < Number(process.env.limit_min_token)){
          console.log('Token Valido')
          return res.status(200).json(result)
        }
        else{
          console.log('Token Invalido')
          return res.status(401).json({mensagem: "Sessão inválida"})
        }

      })

    })
  
    
    // jwt.verify(auth, process.env.secretJwtKey, (err, data) => {
    //   if(err){
    //     console.log('Token Invalido')
    //     return res.status(401).json({mensagem: 'Não autorizado'})
    //   }
    // })


  })

}

