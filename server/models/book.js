const client = require('../app')
const assert = require('assert');


const insertDoc = (data) => {
    client.db.collection("book").insertOne(data, (err, r) => {
        assert.equal(null, err);
        assert.equal(1, r.insertedCount);

    })



}

module.exports.insertBook = insertDoc;