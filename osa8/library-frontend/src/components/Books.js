import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = props => {
  const [filter, setFilter] = useState(null)

  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)
  const genreResult = useQuery(ALL_GENRES)

  useEffect(() => {
    if (filter) {
      getBooks({ variables: { genre: filter } })
    } else {
      getBooks()
    }
  }, [filter, getBooks])

  if (!props.show) {
    return null
  }

  if (loading || genreResult.loading) {
    return <div>Loading...</div>
  }

  const books = data.allBooks
  const genres = genreResult.data.allGenres

  const genreButtons = () => {
    return (
      <div>
        <button onClick={() => setFilter(null)}>All genres</button>
        {genres.map(genre => (
          <button key={genre} onClick={() => setFilter(genre)}>
            {genre}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div>
      <h2>Books</h2>
      Now showing <b>{filter === null ? 'All genres' : filter}</b>
      <br />
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h4>Filter books by genre</h4>
      {genreButtons()}
    </div>
  )
}

export default Books
