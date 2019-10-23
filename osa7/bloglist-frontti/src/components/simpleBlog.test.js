import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import SimpleBlog from './simpleBlog'

describe('testing simpleBlog', () => {

  const blogMock = {
    title: 'hey you!',
    author: 'mickey mouse',
    likes: 12
  }

  const onClickMock = jest.fn()

  test('renders title, author and likes', () => {

    const component = render(<SimpleBlog blog={blogMock} />)
    const titleDiv = component.container.querySelector('.title')

    expect(titleDiv).toHaveTextContent('hey you! mickey mouse')

    const likesDiv = component.container.querySelector('.likes')

    expect(likesDiv).toHaveTextContent('blog has 12 likes')

  })

  test('onClick called correctly', () => {


    const component = render(<SimpleBlog onClick={onClickMock} blog={blogMock} />)

    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(onClickMock.mock.calls.length).toBe(2)

  })

})