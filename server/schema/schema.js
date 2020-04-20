const graphql = require('graphql')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt
} = graphql

var books = [
    { name: "Name of the wind", genre: "Fantasy", id: '1' },
    { name: "The Final Empire", genre: "Fantasy", id: '2' },
    { name: "The Long Earth", genre: "Sci-Fi", id: '3' }
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
        genre: { type: GraphQLString }
    })
})

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {

                return _.find(books, { id: args.id })
                // code to get data from db / other sources
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                console.log("Pesquisando Autores")

                return _.find(authors, { id: args.id })
                // code to get data from db / other sources
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})