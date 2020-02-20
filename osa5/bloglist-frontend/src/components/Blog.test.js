import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  title: 'Testing a blog-app',
  author: 'Myself',
  url: '9876',
  likes: 36,
  user: {
    name: 'Tester',
    username: 'Secret',
    id: 1
  }
}

test('blog renders title and author by default', () => {
  const component = render(<Blog blog={blog} />)

  const blogDiv = component.container.querySelector('.blog')
  const details = component.container.querySelector('.details')

  expect(blogDiv).toHaveTextContent('Testing a blog-app')
  expect(blogDiv).toHaveTextContent('Myself')
  expect(blogDiv).not.toHaveTextContent('36 likes')
  expect(blogDiv).not.toHaveTextContent('9876')
  expect(details).toBe(null)
})

test('click on show button reveals rest of information', () => {
  const component = render(<Blog blog={blog} />)

  const blogDiv = component.container.querySelector('.blog')
  const details = component.container.querySelector('.details')

  expect(blogDiv).not.toHaveTextContent('36 likes')
  expect(blogDiv).not.toHaveTextContent('9876')
  expect(details).toBe(null)

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(details).toBeDefined()

  expect(blogDiv).toHaveTextContent('36 likes')
  expect(blogDiv).toHaveTextContent('9876')
})

test('clicking like two times causes function to be called twice', () => {
  const likeBlog = jest.fn()

  const component = render(<Blog blog={blog} handleLike={likeBlog} />)

  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  const likeButton = component.getByText('Like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(likeBlog.mock.calls.length).toBe(2)
})
