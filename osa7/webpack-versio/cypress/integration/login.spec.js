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
  })

  it('Login-page can be opened', function() {
    cy.contains('Blog app')
  })

  it('Login success with legit username and password and logout works', function() {
    cy.get('input:first')
      .type('Timo')

    cy.get('input:last')
      .type('kalaisa')

    cy.contains('login')
      .click()

    cy.contains('Timo logged in')

    cy.contains('logout')
      .click()

    cy.contains('login')
  })

  it('should show error, when credentials wrong', function() {
    cy.get('input:first')
      .type('Veikko')

    cy.get('input:last')
      .type('kalaisa')

    cy.contains('login')
      .click()

    cy.contains('Wrong username')
  })


})