const {
  gql,
  AuthenticationError,
  UserInputError,
  PubSub
} = require('apollo-server')
const Book = require('../models/book')
const Author = require('../models/author')

const pubsub = new PubSub()

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  extend type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allGenres: [String!]!
  }

  extend type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
  }

  extend type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}

      if (args.author) {
        const author = await Author.findOne({ name: args.author })

        if (author) {
          query = { author: author.id }
        }
      }

      if (args.genre) {
        query = { ...query, genres: { $in: args.genre } }
      }

      return Book.find(query).populate('author', { name: 1, id: 1, born: 1 })
    },
    allGenres: () => {
      return Book.distinct('genres')
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      try {
        if (!context.currentUser) {
          throw new AuthenticationError('not authenticated')
        }

        var author = await Author.findOne({ name: args.author })

        if (!author) {
          author = new Author({ name: args.author })
          await author.save()
        }

        const book = new Book({ ...args, author: author._id })

        await book.save()
        author.books = author.books.concat(book._id)
        await author.save()
        await Book.populate(book, 'author')

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message, { invalidArgs: args })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = {
  typeDefs,
  resolvers
}
