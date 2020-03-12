const { gql, makeExecutableSchema } = require('apollo-server')
const author = require('./author')
const book = require('./book')
const user = require('./user')

const Query = gql`
  type Query
`

const Mutation = gql`
  type Mutation
`

const Subscription = gql`
  type Subscription
`

const typeDefs = [
  Query,
  Mutation,
  Subscription,
  author.typeDefs,
  book.typeDefs,
  user.typeDefs
]

const resolvers = [author.resolvers, book.resolvers, user.resolvers]

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = { schema }
