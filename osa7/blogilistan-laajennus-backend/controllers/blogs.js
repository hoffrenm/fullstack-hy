const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', {
      username: 1,
      name: 1,
      id: 1
    })
    .populate('comments', { content: 1, id: 1 })

  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token

  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    ...request.body,
    likes: request.body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).end()
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(400).end()
  }

  const comment = new Comment({
    content: body.content
  })

  await comment.save()

  blog.comments = blog.comments.concat(comment._id)

  const savedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
    .populate('user', { id: 1, name: 1, username: 1 })
    .populate('comments', { id: 1, content: 1 })

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  if (!token || !decodedToken) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({ error: 'unauthorized action' })
  }

  await blog.remove()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = { ...request.body }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true
  })
    .populate('user', { id: 1, username: 1, name: 1 })
    .populate('comments', { id: 1, content: 1 })

  console.log('updated: ', updatedBlog)

  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter
