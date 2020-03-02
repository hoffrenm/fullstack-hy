import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './Blogform'

test('<Blogform /> submit passes object to parent with provided input', () => {
  const createBlog = jest.fn()

  const component = render(<BlogForm createBlog={createBlog} />)

  const form = component.container.querySelector('.blogForm')

  const titleInput = component.container.querySelector('#title')
  const authorInput = component.container.querySelector('#author')
  const urlInput = component.container.querySelector('#url')

  fireEvent.change(titleInput, {
    target: { value: 'Adding a blog while testing' }
  })
  fireEvent.change(authorInput, {
    target: { value: 'Mysterious Test' }
  })
  fireEvent.change(urlInput, {
    target: { value: '112233' }
  })

  fireEvent.submit(form)

  expect(createBlog.mock.calls.length).toBe(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Adding a blog while testing')
  expect(createBlog.mock.calls[0][0].author).toBe('Mysterious Test')
  expect(createBlog.mock.calls[0][0].url).toBe('112233')
})
