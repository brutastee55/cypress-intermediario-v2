///<reference types="cypress"/>
import { faker } from '@faker-js/faker'
const options = { env: { snapshotOnly: true } }

describe('create project', options, () => {
    beforeEach(() => { cy.api_deleteProjects() })

    it('create project with success', () => {
        const project = {
            name: `project-${faker.datatype.uuid()}`,
            description: faker.random.words(5),
            initialize_with_readme: true
        }

        cy.api_createProjectFromApi(project)
            .then(response => {
                expect(response.status).to.equal(201)
                expect(response.body.name).to.equal(project.name)
                expect(response.body.description).to.equal(project.description)
            })
    })
})
