Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username,
    password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('addBlog', blog => {
  cy.contains('Add new blog').click()

  cy.get('#title').type(blog.title)
  cy.get('#author').type(blog.author)
  cy.get('#url').type(blog.url)
  cy.contains('Submit').click()
  cy.wait(150)
})

Cypress.Commands.add('openDetails', index => {
  cy.get('.blog')
    .eq(index)
    .contains('view')
    .click()
})

Cypress.Commands.add('closeDetails', index => {
  cy.contains('hide').click()
})

Cypress.Commands.add('likeBlog', index => {
  cy.get('#like-button').click()
  cy.wait(150)
})
