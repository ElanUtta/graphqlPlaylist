const graphql = require('graphql')
const Book = require('../models/book')

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
                console.log(parent)
                return authors.find(elem => elem.id === parent.authorID)
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
                return books.filter(elem => elem.authorID === parent.id)
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

                return books.find(elem => elem.id === args.id)
                // code to get data from db / other sources
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
                return books
            }
        },
        authors: {
            type: new GraphQLList(BookType),
            resolve(parent, args) {
                return authors
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
                book = { name: args.name, age: args.age }
                console.log(Book.insertBook(book))

            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})