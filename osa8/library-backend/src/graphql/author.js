const { gql, AuthenticationError } = require('apollo-server')
const Author = require('../models/author')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int!
    id: ID!
  }

  extend type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  extend type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      return Author.find({}).populate('books', { id: 1 })
    }
  },
  Mutation: {
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })

      if (!author) {
        return null
      }

      author.born = args.setBornTo

      await author.save()
      await Author.populate(author, 'books')

      return author
    }
  },
  Author: {
    bookCount: root => {
      return root.books.length
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
