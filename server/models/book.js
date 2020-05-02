const client = require('../app')
const assert = require('assert');


const insertDoc = async (data) => {

    try {
        return client.db.collection("book").insertOne(data)
    } catch (err) {
        console.log(`Error ao criar Book ${err}`)
    }
}

const FindById = async (id) => {
    try {
        return client.db.collection('book').findOne({ _id: id })
    } catch (err) {
        console.log(`Error ao procurar book: ${err}`)
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

/*
    Promisse é para decidir o que fazer depois que a funcao
    termina de ser executada, contudo se voce quer pegar um valor
    que retorne dela, voce deve utilizar async/await pois são eles
    que irão esperar a funcao terminar de executar para poder retornar
    o valor.
*/