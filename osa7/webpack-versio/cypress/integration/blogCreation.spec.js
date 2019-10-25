

/* eslint-disable no-undef */


describe('Blog-app login', () => {

  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const newUser = {
      name: 'Timo',
      username: 'Timo',
      password: 'kalaisa'
    }

    cy.request('POST', 'http://localhost:3003/api/users', newUser)

    cy.visit('http://localhost:3000')

    cy.get('input:first')
      .type('Timo')

    cy.get('input:last')
      .type('kalaisa')

    cy.contains('login')
      .click()

  })

  it('should be able to create and manipulate a blog', function() {
    cy.contains('Create a new Blog').click()

    cy.get('#title')
      .type('Timon blogi')

    cy.get('#author')
      .type('Timo')

    cy.get('#url')
      .type('www.heivaan.com')

    cy.contains('Send').click()

    cy.contains('Timon blogi by Timo')
      .click()

    cy.contains('comments')

    cy.get('input')
      .type('This is a comment')

    cy.contains('add comment')
      .click()

    cy.contains('This is a comment')

    cy.get('#like')
      .click()

    cy.contains('1 likes')

    cy.contains('Remove')
      .click()

    cy.contains('Timon blogi by Timo').not()

  })

})