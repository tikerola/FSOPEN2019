
import React from 'react'
import { useField } from '../hooks/index'

const NewBlogForm = ({ handleSubmit, setShowForm }) => {

  const [title, titleReset] = useField('text')
  const [author, authorReset] = useField('text')
  const [url, urlReset] = useField('text')

  const submit = e => {
    e.preventDefault()
    handleSubmit(title.value, author.value, url.value)
    titleReset()
    authorReset()
    urlReset()
  }

  return (
    <div>
      <h2>Create new</h2>

      <form onSubmit={submit} >
        <div>
          <label htmlFor="title">Title: </label>
          <input {...title} />
        </div>

        <div>
          <label htmlFor="author">Author: </label>
          <input {...author} />
        </div>

        <div>
          <label htmlFor="url">Url: </label>
          <input {...url} />
        </div>

        <button>Send</button>
      </form>
      <button onClick={() => setShowForm(false)}>Cancel</button>
    </div>
  )
}

export default NewBlogForm