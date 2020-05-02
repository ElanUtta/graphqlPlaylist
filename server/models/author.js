const client = require('../app')
const assert = require('assert');


const insertDoc = async (data) => {

    try {
        return client.db.collection("author").insertOne(data)
    } catch (err) {
        console.log(`Error ao criar Book1 ${err}`)
    }
}

const FindById = async (id) => {
    try {
        return client.db.collection('author').findOne({ _id: id })
    } catch (err) {
        console.log(`Error ao procurar Author: ${err}`)
    }
}

const FindAll = async () => {
    try {
        return await client.db.collection('author').find({}).toArray().then(resul => {
            console.log("Roudou o retorno")
            return resul
        })
    } catch (err) {
        console.log(`Error ao procurar todos os Author: ${err}`)
    }
}

module.exports.insertAuthor = insertDoc;
module.exports.FindById = FindById;
module.exports.FindAll = FindAll;