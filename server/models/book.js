const client = require('../app')
const assert = require('assert');
const ObjectID = require('mongodb').ObjectID

const insertDoc = async (data) => {

    try {
        return client.db.collection("book").insertOne(data)
    } catch (err) {
        console.log(`Error ao criar Book ${err}`)
    }
}

const FindById = async (id) => {
    try {
        return await client.db.collection('book').findOne({ "_id": ObjectID(id) }).then(re => re)
    } catch (err) {
        console.log(`Error ao procurar Book: ${err}`)
    }
}

const FindByAuthor = async (id) => {
    try {
        return await client.db.collection('book').findOne({ "authorId": "5eaddb77a2591944690dfe91" }).then(re => {
            console.log("valor do id", typeof toString(id))
            console.log("valor do re", re)
            return re
        })
    } catch (err) {
        console.log(`Error ao procurar Book: ${err}`)
    }
}

const FindAll = async () => {
    try {
        return await client.db.collection('book').find({}).toArray().then(resul => {
            console.log("Roudou o retorno")
            return resul
        })

    } catch (err) {
        console.log(`Error ao procurar todos os Books: ${err}`)
    }
}

/* 
const insertDoc = async (data) => {
    let a = await client.db.collection("book").insertOne(data)
    console.log(a)
}*/


module.exports.insertBook = insertDoc;
module.exports.FindById = FindById;
module.exports.FindAll = FindAll;
module.exports.FindByAuthor = FindByAuthor;

/*
    Promisse é para decidir o que fazer depois que a funcao
    termina de ser executada, contudo se voce quer pegar um valor
    que retorne dela, voce deve utilizar async/await pois são eles
    que irão esperar a funcao terminar de executar para poder retornar
    o valor.
*/