/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }
describe('Set Milestone in issue', options, () => {
    const issue = {
        title: `issue-${faker.datatype.uuid()}`,
        description: `describe-${faker.random.words(3)}`,
        project: {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: true
        }
    }


    const milestone = {
        title: `milesTone - ${faker.random.word()}`
    }


    beforeEach(() => {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createIssue(issue)
            .then(response => {
                cy.api_createMilestone(response.body.project_id, milestone)
                cy.visit(`${Cypress.env('user_name')}/${issue.project.name}/issues/${response.body.iid}`)
            })
    })

    it('set milestone in issue with success', () => {
        cy.gui_setMilestone(milestone)

        cy.get("[class='bold has-tooltip']").should('contain', milestone.title)

    })
})