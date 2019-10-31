import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommendations from './components/Recommendations'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient, useSubscription, useQuery } from '@apollo/react-hooks'
import { BOOKS } from './components/Books'

const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
       author {
         name
       }
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const { data } = useQuery(ME)

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('books-token')
    if (tokenFromStorage)
      setToken(tokenFromStorage)

  },[])

  

  const [login] = useMutation(LOGIN)

  const updateCacheWith = async (addedBook) => {
    const includedIn = (set, object) => 
      set.map(p => p.id).includes(object.id)  

    //const dataInStore = await client.readQuery({ query: BOOKS})
    const dataInStore = await client.readQuery({ query: BOOKS, variables: { genre: data.me.favoriteGenre }})
    dataInStore.allBooks.push(addedBook)
    
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: BOOKS,
        variables: { genre: data.me.favoriteGenre },
        data: { allBooks : dataInStore }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      
      alert(`${subscriptionData.data.bookAdded.title} created by ${subscriptionData.data.bookAdded.author.name}`)
      updateCacheWith(addedBook)
    }
  })

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? <span>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button onClick={handleLogout}>logout</button>
        </span>
        :
        <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      { data && <Recommendations 
        show={page === 'recommendations'}
        favoriteGenre={data.me.favoriteGenre}
      />}

      <Login 
        show={page === 'login'}
        login={login}
        setToken={setToken}
      />

    </div>
  )
}

export default App