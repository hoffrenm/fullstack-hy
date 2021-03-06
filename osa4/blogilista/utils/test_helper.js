const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url:
      'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  }
]

const newBlog = {
  title: 'Blog for testing',
  author: 'Sample Text',
  url: 'irrelevant',
  likes: 5
}

const likelessBlog = {
  title: 'Blog with no likes',
  author: 'Placeholder',
  url: 'irrelevant'
}

const noTitleBlog = {
  author: 'Some Body',
  url: 'Very relevant'
}

const noUrlBlog = {
  title: 'How to forget url',
  author: 'Placeholder'
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})

  return blogs.map(blog => blog.toJSON())
}

const usersInDB = async () => {
  const users = await User.find({})

  return users.map(user => user.toJSON())
}

const user = {
  name: 'Api tester',
  username: 'test',
  password: 'testword'
}

const loginCredentials = {
  username: 'test',
  password: 'testword'
}

module.exports = {
  initialBlogs,
  newBlog,
  blogsInDb,
  likelessBlog,
  noTitleBlog,
  noUrlBlog,
  usersInDB,
  user,
  loginCredentials
}
