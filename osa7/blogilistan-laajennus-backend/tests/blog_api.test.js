const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)

  await api
    .post('/api/users')
    .send(helper.user)
    .expect(201)
})

describe('GET', () => {
  test('right amount of blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('blog id defined and formatted correctly', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
  })
})

describe('POST', () => {
  test('blog can be saved with valid token', async () => {
    const loginResult = await api
      .post('/api/login')
      .send(helper.loginCredentials)
      .expect(200)

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(titles).toContain('Blog for testing')
    expect(blogs.length).toBe(helper.initialBlogs.length + 1)
  })

  test('blog cannot be saved without token', async () => {
    await api
      .post('/api/blogs')
      .send(helper.newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const titles = blogs.map(blog => blog.title)

    expect(titles).not.toContain('Blog for testing')
    expect(blogs.length).toBe(helper.initialBlogs.length)
  })

  test('undefined likes defaults to 0', async () => {
    const loginResult = await api
      .post('/api/login')
      .send(helper.loginCredentials)
      .expect(200)

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
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

describe('DELETE', () => {
  test('blog can be deleted by id with valid token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const loginResult = await api
      .post('/api/login')
      .send(helper.loginCredentials)
      .expect(200)

    const savedBlog = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .send(helper.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    console.log(savedBlog)

    const blogsAtMiddle = await helper.blogsInDb()
    expect(blogsAtMiddle.length).toBe(blogsAtStart.length + 1)

    await api
      .delete(`/api/blogs/${savedBlog.body.id}`)
      .set('Authorization', `bearer ${loginResult.body.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(blogsAtEnd.length).toBe(blogsAtStart.length)
    expect(titles).not.toContain(savedBlog.title)
  })

  test('blog cannot be deleted without token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    await api.delete(`/api/blogs/${helper.initialBlogs[1].id}`).expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })
})

describe('PUT', () => {
  test('blog can be updated by id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToBeModified = blogs[1]
    const modifiedBlog = { blogToBeModified, title: 'Modified' }

    const result = await api
      .put(`/api/blogs/${blogToBeModified.id}`)
      .send(modifiedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const titles = blogsAtEnd.map(blog => blog.title)

    expect(result.body.title).toBe('Modified')
    expect(blogsAtEnd.length).toBe(blogs.length)
    expect(titles).toContain(modifiedBlog.title)
    expect(titles).not.toContain(blogToBeModified.title)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
