describe('logout', () => {
  const user = Cypress.env('user_name')
  const password = Cypress.env('user_password')
  const options = { cacheSession: true }
  
  beforeEach(() => {
   
    cy.login(user, password, options)
    cy.visit('/')
    

  })

  it('logout com sucesso', () => {

    cy.logout()

    cy.url()
      .should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
  })

})