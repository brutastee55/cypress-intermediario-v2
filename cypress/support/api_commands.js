const acessToken = `Bearer ${Cypress.env("gitlab_access_token")}`

Cypress.Commands.add('api_createProjectFromApi', (project) => {
    const request = {
        method: 'POST',
        url: '/api/v4/projects/',
        body: project,
        headers: { Authorization: acessToken }
    }
    cy.request(request)//.as('response_endpoint')

    // cy.get("@response_endpoint").then(response => {
    //     cy.captureApiScreenshot(request, response)
    // })
})


Cypress.Commands.add('api_returnAllProjects', () => {
    cy.request({
        method: 'GET',
        url: '/api/v4/projects/',
        headers: { Authorization: acessToken }
    })
})

Cypress.Commands.add('api_deleteProjects', () => {
    cy.api_returnAllProjects().then(res => {
        res.body.forEach(project => cy.request({
            method: 'DELETE',
            url: `/api/v4/projects/${project.id}`,
            headers: { Authorization: acessToken }
        }));
    })
})

Cypress.Commands.add('api_createIssue', issue => {
    cy.api_createProjectFromApi(issue.project)
        .then(response => {
            cy.request({
                method: 'POST',
                url: `/api/v4/projects/${response.body.id}/issues`,
                body: {
                    title: issue.title,
                    description: issue.description
                },
                headers: { Authorization: acessToken }
            })
        })
})

Cypress.Commands.add('api_createLabel', (projectId, label) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/labels`,
        body: {
            name: label.name,
            color: label.color
        },
        headers: { Authorization: acessToken }
    })
})

Cypress.Commands.add('api_createMilestone', (projectId, milesTone) => {
    cy.request({
        method: 'POST',
        url: `/api/v4/projects/${projectId}/milestones`,
        body: {
            title: milesTone.title
        },
        headers: { Authorization: acessToken }  
    })
})

Cypress.Commands.add('captureApiScreenshot', (request, response) => {

    cy.readFile("./visualize-api.html").then(html => {
        cy.document().then(doc => {
            doc.write(html);

            // Agora que o conteúdo do HTML foi inserido, você pode fazer as modificações necessárias
            doc.getElementById('request').textContent = JSON.stringify(request, null, 2);
            doc.getElementById('status').textContent = response.status;
            doc.getElementById('response').textContent = JSON.stringify(response.body, null, 2);

            // Espera para garantir que o conteúdo foi renderizado antes da captura
            cy.wait(500);

            // Captura a tela
            cy.screenshot('api-request');
        });
    });

});