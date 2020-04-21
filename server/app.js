const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const MongoClient = require('mongodb').MongoClient;

const app = express();


const uri = "mongodb+srv://elan:12345@cluster0-k6auz.gcp.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.log("Error on connection", err)
    } else {
        console.log("Connected successfully to server");

        const db = client.db("Playlist")
        console.log("Connected successfully to DB");

        module.exports.db = db
    }
});


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))


app.listen(4000, () => {
    console.log("Listening for requests on port 4000")
})

