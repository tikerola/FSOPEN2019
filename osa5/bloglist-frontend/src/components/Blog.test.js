import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('testing <Blog>', () => {

  const blogMock = {
    title: 'hey you!',
    author: 'mickey mouse',
    likes: 12,
    url: 'heimoi.com',
    user: {
      username: 'mickey'
    }
  }

  const userMock = {
    username: 'mickey'
  }

  test('blog info maximize and minimize', () => {
    const component = render(<Blog blog={blogMock} user={userMock} />)

    const maximizeDiv = component.container.querySelector('.maximize')

    expect(component.container).not.toHaveTextContent('Added by mickey')

    fireEvent.click(maximizeDiv)
    expect(component.container).toHaveTextContent('Added by mickey')

    const minimizeDiv = component.container.querySelector('.minimize')

    fireEvent.click(minimizeDiv)
    expect(component.container).not.toHaveTextContent('Added by mickey')

  })

})