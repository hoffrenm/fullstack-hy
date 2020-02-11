const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('GET', () => {
  test('right amount of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('id format is correct', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST', () => {
  test('blog can be saved', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(titles).toContain('Blog for testing')
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  test('undefined likes defaults to 0', async () => {
    const result = await api
      .post('/api/blogs')
      .send(helper.likelessBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(result.body.likes).toBeDefined()
    expect(result.body.likes).toBe(0)
  })

  test('blog with no title is rejected', async () => {
    await api
      .post('/api/blogs')
      .send(helper.noTitleBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  test('blog with no url is rejected', async () => {
    await api
      .post('/api/blogs')
      .send(helper.noUrlBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()

    expect(blogs.length).toBe(helper.initialBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
