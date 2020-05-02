const graphql = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')


const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = graphql

var books = [
    { name: "Name of the wind", genre: "Fantasy", id: '1', authorID: '1' },
    { name: "The Final Empire", genre: "Fantasy", id: '2', authorID: '1' },
    { name: "The Long Earth", genre: "Sci-Fi", id: '3', authorID: '3' }
]

var authors = [
    { name: "Patrick Rothfuss", age: 44, id: '1' },
    { name: "Brandom Sanderson", age: 42, id: '2' },
    { name: "Terry Pratchett", age: 66, id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        authorId: { type: GraphQLID },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return authors.find(elem => elem.id === parent.authorID)
                console.log(parent)
                return Author.FindById(parent.authorID).then(result => {
                    return result
                })
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        _id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                //return books.filter(elem => elem.authorID === parent.id)
                console.log("aqui rodou", parent, " e ", args)
                return Book.FindByAuthor(parent._id).then(res => {
                    console.log("O retorno foi ", res)
                    return res
                })
            }

        }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                //return books.find(elem => elem.id === args.id)
                // code to get data from db / other sources
                //return client.db.collection("book").find
                return Book.FindById(args.id).then(res => {
                    return res
                })
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                return Author.FindById(args.id).then(result => {
                    return result
                })
                //return authors.find(elem => elem.id === args.id)
                // code to get data from db / other sources
            }
        },
        books: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return Book.FindAll().then(result => {
                    return result
                })
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            resolve(parent, args) {
                return Author.FindAll().then(result => {
                    return result
                })
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: { type: GraphQLString },
                age: { type: GraphQLInt },
                _id: { type: GraphQLID }
            },
            resolve(parent, args) {
                author = { name: args.name, age: args.age }
                return Author.insertAuthor(author).then(result => {
                    console.log(result)
                    return result.ops[0]
                })
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: { type: GraphQLString },
                genre: { type: GraphQLString },
                authorID: { type: GraphQLID }
            },
            resolve(parent, args) {
                book = { name: args.name, genre: args.genre, authorId: args.authorID }
                return Book.insertBook(book).then((result) => {
                    return result.ops[0]
                })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})