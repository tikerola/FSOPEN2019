import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Select from 'react-select'

export const AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

const Authors = (props) => {

  const [born, setBorn] = useState('')

  const [selectedOption, setSelectedOption] = useState()

  const UPDATE_AUTHOR = gql`
    mutation updateYear($name: String!, $setBornTo: Int!) {
      editAuthor(name: $name, setBornTo: $setBornTo) {
        name
        born
        bookCount
      }
    }
  `

  const authorsData = useQuery(AUTHORS)
  const [editAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  if (authorsData.loading)
    return <div>loading...</div>

  const authors = authorsData.data.allAuthors
  let options = []

  for (let author of authors) {
    options.push({
      value: author.name,
      label: author.name
    })
  }


  const updateAuthor = async e => {
    e.preventDefault()

    await editAuthor({ variables: { name: selectedOption.value, setBornTo: +born } })
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={updateAuthor}>
        <Select
          value={selectedOption}
          onChange={selected => setSelectedOption(selected)}
          options={options}
        />

        <div>born: <input value={born} onChange={(e) => setBorn(e.target.value)} /></div>
        <button>update author</button>
      </form>

    </div>
  )
}

export default Authors