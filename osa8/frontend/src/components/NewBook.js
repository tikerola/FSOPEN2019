import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'
import { BOOKS, GENRES } from './Books'
import { AUTHORS } from './Authors'

const NewBook = (props) => {

  const NEW_BOOK = gql`
    mutation createNewBook($title: String!, $author: String!, $published: Int!, $genres: [String]!) {
      addBook(title: $title, author: $author, published: $published, genres: $genres) {
        title
        author {
          name
        }
        published
        genres
      }
    }
  `

  const [addBook] = useMutation(NEW_BOOK, {
    refetchQueries: [{query: BOOKS}, {query: AUTHORS}, {query: GENRES}]
  })


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()

    await addBook({
      variables: {
        title,
        author,
        published: +published,
        genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook