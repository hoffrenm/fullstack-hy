import React, { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, USER_INFO } from '../queries'

const RecommendedBooks = props => {
  const userInfo = useQuery(USER_INFO)
  const [recommendedBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!userInfo.loading && userInfo.data) {
      recommendedBooks({ variables: { genre: userInfo.data.me.favoriteGenre } })
    }
  }, [userInfo, recommendedBooks])

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const recommendations = data.allBooks

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favourite genre <b>{userInfo.data.me.favoriteGenre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {recommendations.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecommendedBooks
