
///<reference types="cypress"/>
import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true } }
describe('create project', options, () => {
    const user = Cypress.env('user_name')
    const password = Cypress.env('user_password')
    const options = { cacheSession: true }

    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
        initialize_with_readme: true
    }

    beforeEach(() => {
        cy.api_deleteProjects()
        cy.api_createProjectFromApi(project)
    })

    it('create project with success', () => {
        cy.cli_cloneProjectSsh(project)

        cy.readFile(`cypress/downloads/${project.name}/README.md`)
            .should('contain', `# ${project.name}`)
            .and('contain', project.description)
    })
})