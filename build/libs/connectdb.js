
/*
	Arquivo de conexão para o MongoDb da IBM referente ao Addon do Compose do Heroku
*/

let dbInstance = ''

module.exports = function(){

    return new Promise((resolve) => {

        if(dbInstance == ''){

            const MongoClient = require('mongodb').MongoClient

            const url = process.env.MONGODB_URI || 'mongodb://heroku_p9xg2z9t:pku88fcv8d762ji46ak03ph36b@ds263791.mlab.com:63791/heroku_p9xg2z9t'

            const dbName = 'heroku_p9xg2z9t'    

            MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
            
                if(err) throw err

                console.log("Connected successfully to MongoDb");

                const db = client.db(dbName);

                dbInstance = db

                resolve(dbInstance)

            
            //   client.close();

                // TESTE
                // const collection = db.collection('organizations')

                // collection.find().limit(5).toArray(function(err, result){
                // 	if(err) throw err

                // 	console.log(result)
                // })

            })
        }
        else{
            resolve(dbInstance)
        }


    })

}