/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }

describe('create issue com sucesso', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: `describe-${faker.random.words(3)}`,
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: true
        }
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.api_createProjectFromApi(issue.project)
        cy.login()

        //cy.gui_createProject(issue.project)
    })

    it('create issue with success', () => {
        cy.gui_createIssue(issue)

        cy.get('.issue-details').
            should('contain', issue.title)
            .and('contain', issue.description)
    })
})