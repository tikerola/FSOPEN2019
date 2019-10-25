
import React from 'react'
import { useField } from '../hooks/index'
import { Button } from './Header.styles'
import { ButtonContainer, Input, FormContainer, Label } from './newBlogForm.styles'

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
    <FormContainer>
      <h2>Create new</h2>

      <form >
        <div>
          <Label htmlFor="title">Title: </Label>
          <Input {...title} id='title' />
        </div>

        <div>
          <Label htmlFor="author">Author: </Label>
          <Input {...author} id='author' />
        </div>

        <div>
          <Label htmlFor="url">Url: </Label>
          <Input {...url} id='url' />
        </div>
        <ButtonContainer>
          <Button onClick={submit}>Send</Button>
          <Button onClick={() => setShowForm(false)}>Cancel</Button>
        </ButtonContainer>
      </form>

    </FormContainer>
  )
}

export default NewBlogForm