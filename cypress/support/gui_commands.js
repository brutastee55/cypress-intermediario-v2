Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
    { cacheSession = true } = {}
) => {
    const login = () => {
        cy.visit('/users/sign_in')
        cy.get('input[name="user[login]"]').type(user)
        cy.get('input[name="user[password]"]').type(password, { log: false })
        cy.get('input[value="Sign in"]').click()

    }

    const validate = () => {
        cy.visit('/')
        cy.location('pathname', { timeout: 1000 })
            .should('not.eq', '/users/sign_in')
    }

    const options = {
        cacheAcrossSpecs: true, //possibilita compartilhada a sessão com outros specs
        validate,
    }

    if (cacheSession) {
        cy.session(user, login, options)
    } else {
        login()
    }

})

Cypress.Commands.add('logout', () => {
    cy.get("li[data-qa-selector=user_menu]").click()
    cy.get('a[data-qa-selector=sign_out_link]').click()
})

Cypress.Commands.add('gui_createProject', project => {
    cy.visit("/projects/new")
    cy.get("#blank-project-name #project_name").type(project.name)
    cy.get("#blank-project-pane #project_description").type(project.description)

    cy.get("#project_initialize_with_readme").click()

    cy.get("#blank-project-pane #new_project  > .btn-success").click()
})

Cypress.Commands.add('gui_createIssue', issue => {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.get("[name='commit']").click()
})

Cypress.Commands.add('gui_setLabelOnIssue', (label) => {
    cy.get("[data-track-property='labels']").click()

    cy.contains(label.name).click()
    cy.get("body").click()
})

Cypress.Commands.add('gui_setMilestone', (milestone) => {
    cy.get("[data-track-property='milestone']").click()

    cy.contains(milestone.title).click()
    cy.get('body').click()
})

