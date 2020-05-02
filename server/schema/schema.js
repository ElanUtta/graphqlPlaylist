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
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                //return authors.find(elem => elem.id === parent.authorID)
                return Book.FindAll()
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: GraphQLList(BookType),
            resolve(parent, args) {
                //return books.filter(elem => elem.authorID === parent.id)
                return Author.FindAll()
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
                    console.log("aqui", res)
                    return res
                })

            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                return authors.find(elem => elem.id === args.id)
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
                age: { type: GraphQLInt }
            },
            resolve(parent, args) {
                author = { name: args.name, age: args.age }
                return Author.insertAuthor(author).then(result => {
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