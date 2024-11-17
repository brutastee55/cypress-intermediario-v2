/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'

describe('create issue com sucesso', () => {
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
    })

    it('create issue with success', () => {
        cy.api_createIssue(issue)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.title).to.equal(issue.title)
                expect(response.body.description).to.equal(issue.description)
            })
    })
})