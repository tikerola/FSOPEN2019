import React, {useState, useEffect, useCallback} from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { BOOKS } from './Books'


const Recommendations = (props) => {

  const [booksByGenre, setBooksByGenre] = useState()
  const client = useApolloClient()

  const genreHelper = useCallback(data => {
    setBooksByGenre(data)
  }, [setBooksByGenre])

  useEffect(() => {
    
    const findBooksByGenre = async () => {

      const booksResponse = await client.query({
        query: BOOKS,
        variables: {
          genre: props.favoriteGenre
        }
      })
      
      genreHelper(booksResponse.data.allBooks)
    }

    findBooksByGenre()
   
    
}, [genreHelper, client, props.favoriteGenre])



if (!props.show) {
  return null
}

if (!booksByGenre)
  return <div>loading...</div>


return (
  <div>
    <h2>Recommendations</h2>
    <h3>books in your favorite genre patterns</h3>

    <table>
      <tbody>
        <tr>
          <th></th>
          <th>
            author
            </th>
          <th>
            published
            </th>
        </tr>
        { booksByGenre && booksByGenre.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
      </tbody>
    </table>

  </div>
)
}

export default Recommendations