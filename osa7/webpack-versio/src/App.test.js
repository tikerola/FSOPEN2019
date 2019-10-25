import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import App from './App'

jest.mock('./services/blogs')

describe('<App />', () => {

  test('if no user, then no blogs are rendered', async () => {

    const component = render(<App />)

    component.rerender(<App />)

    await waitForElement(() => component.getByText('login'))

    expect(component.container).toHaveTextContent('password')

    expect(component.container).not.toHaveTextContent('Blogs')

  })

  test('if user, then blogs should be visible', async () => {
    const user = {
      username: 'Marko Jantunen',
      name: 'Marko Jantunen',
      token: 'abc123'
    }

    localStorage.setItem('savedUser', JSON.stringify(user))

    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('Blogs'))

    expect(component.container).toHaveTextContent('title1')
    expect(component.container).toHaveTextContent('title2')
    expect(component.container).toHaveTextContent('title3')

    const button = component.getByText('new note')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('Create new')

  })

})