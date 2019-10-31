require('dotenv').config()
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const uuid = require('uuid/v1')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'Taivas lyö tulta'
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(err => {
    console.log('error connecting to database: ', err.message)
  })

const typeDefs = gql`

  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    hello: String!,
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    genres: [String]!
  }

  type Mutation {
    addBook(
      title: String!,
      author: String!,
      published: Int!,
      genres: [String]!
    ): Book!,

    editAuthor(name: String!, setBornTo: Int!): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    genres: async (root, args) => {
      return Book.find({}).distinct('genres')

    },
    me: (root, args, { currentUser }) => {
      return currentUser
    },
    hello: () => { return "world" },
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let returnedBooks = await Book.find({}).populate('author')

      if (args.author)
        returnedBooks = returnedBooks.filter(book => book.author.name === args.author)

      if (args.genre)
        returnedBooks = returnedBooks.filter(book => book.genres.includes(args.genre))


      return returnedBooks

    },
    allAuthors: () => Author.find({}),
  },
  // Author: {
  //   bookCount: async (root) => {

  //     //const authorsBooks = await Book.find({ author: root.id })

  //     return root.books.length
  //   }
  

  Mutation: {
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })

      try {
        return user.save()
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'salasana') {
        throw new UserInputError('Wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }

      const token = jwt.sign(userForToken, JWT_SECRET)

      return { value: token }

    },
    addBook: async (root, { author, ...otherArgs }, { currentUser }) => {

      if (!currentUser)
        throw new AuthenticationError('Not Authenticated')

      const authorExists = await Author.findOne({ name: author })
      

      try {
        let savedAuthor
        if (!authorExists) {
          const authorToSave = new Author({
            name: author,
            bookCount: 1
          })

          savedAuthor = await authorToSave.save()
        }

        else {
          authorExists.bookCount = authorExists.bookCount + 1
          authorExists.save()
        }
        
        const book = new Book({
          ...otherArgs,
          author: authorExists ? authorExists._id : savedAuthor
        })

        await book.save()
        const populatedBook = await Book.findOne({ title: otherArgs.title }).populate('author')

        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })

        return populatedBook

      } catch (error) {
        throw new UserInputError('error.message', {
          invalidArgs: { author, ...otherArgs }
        })
      }
    },

    editAuthor: async (root, args, { currentUser }) => {


      if (!currentUser)
        throw new AuthenticationError('Not Authenticated')

      const authorFound = await Author.findOne({ name: args.name })

      try {
        if (authorFound) {
          authorFound.born = args.setBornTo
          return authorFound.save()
        }

        return null
      }
      catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null

    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const token = jwt.verify(auth.substring(7), JWT_SECRET)

      const currentUser = await User.findById(token.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscription ready at ${subscriptionsUrl}`)
})