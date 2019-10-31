import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

export const BOOKS = gql`
  query allBooks($author: String, $genre: String) {
     allBooks(author: $author, genre: $genre) {
       title
       published
       author {
         name
       }
      genres
     }
   }
  `

export const GENRES = gql`
   {
     genres 
   }
  `

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('')
  const [genres, setGenres] = useState()
  const [booksByGenre, setBooksByGenre] = useState()

  const client = useApolloClient()

  useEffect(() => {
    const fetchGenres = async () => {

      const genresData = await client.query({
        query: GENRES
      })
      setGenres(genresData.data.genres)
    }

    fetchGenres()
  })

  useEffect(() => {
    const findBooksByGenre = async () => {
      console.log('päivittyy')
      let booksData
      if (selectedGenre) {

      booksData = await client.query({
        query: BOOKS,
        variables: {
          genre: selectedGenre
        }
      })
    }

    else {
      booksData = await client.query({query: BOOKS})
    }
      
      setBooksByGenre(booksData.data.allBooks)
    }

    findBooksByGenre()

  }, [selectedGenre, client])


  if (!props.show) {
    return null
  }

  if (!booksByGenre)
    return <div>loading...</div>


  return (
    <div>
      <h2>books</h2>
      <h3>in genre patterns</h3>

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
          {booksByGenre.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.length > 0 && genres.map(genre => <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>)}
      <span><button onClick={() => setSelectedGenre('')}>all genres</button></span>
    </div>
  )
}

export default Books