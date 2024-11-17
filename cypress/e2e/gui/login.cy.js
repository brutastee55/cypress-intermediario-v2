describe('validando cenários', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const options = { cacheSession: false }

  it('login com sucesso', () => {
    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
  })

  it('logout com sucesso', () => {
    cy.login(user, password, options)

    cy.get('.qa-user-avatar').should('be.visible')
    
    cy.logout()

    cy.url()
      .should('include', '/users/sign_in')
  })

})