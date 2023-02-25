
describe('template spec', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.request('POST', 'http://localhost:3001/api/users/', {
      name: 'midudev',
      username: 'midudev',
      password: 'lamidupassword'
    })
  })

  it('frontpage can opened', () => {
    cy.contains('h1', 'Notes')
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
  })

  it('login form can be opened', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('lamidupassword')
    cy.get('button[type="submit"]').click()
    cy.get('button:contains("New Note")').click()
    cy.contains('h3', 'Create a new note')
  })

  it('login fails with wrong password', () => {
    cy.contains('Show login').click()
    cy.get('[placeholder="Username"]').type('midudev')
    cy.get('[placeholder="Password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
    cy.get('html').should('not.contain', 'midudev logged-in')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.login({ username: 'midudev', password: 'lamidupassword' })
    })

    it('a new note can be created', () => {
      cy.contains('button', 'New Note').click()
      cy.get('input').type('a note created by cypress')
      cy.contains('button', 'save').click()
      cy.contains('li', 'a note created by cypress')
    })

    describe('and a note exists', () => {
      beforeEach(() => {
        cy.createNote({ content: 'another note cypress', important: false })
        cy.createNote({ content: 'another note cypress2', important: false })
        cy.createNote({ content: 'another note cypress3', important: false })
      })

      it('it can be made important', () => {
        cy.contains('li', 'another note cypress')
          .find('button')
          .as('theButton')
        cy.get('@theButton').click()
        cy.get('@theButton').should('contain', 'make not important')
      })
    })
  })
})
