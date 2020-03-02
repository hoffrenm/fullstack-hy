describe('Blog app', function() {
  const blog1 = {
    title: 'Testing with Cypress',
    author: 'Mysterious tester',
    url: '987654'
  }

  const blog2 = {
    title: 'Second blog about something',
    author: 'Somebody',
    url: '111111'
  }

  const blog3 = {
    title: 'The most liked blog',
    author: 'Mysterious tester',
    url: '998877'
  }

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = { username: 'secret', name: 'tester', password: 'cat' }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Loginform is shown by default', function() {
    cy.contains('Log in to application')
    cy.contains('Username')
    cy.contains('Password')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('secret')
      cy.get('#password').type('cat')
      cy.get('#loginButton').click()

      cy.contains('Blogs')
      cy.contains('Logged in as tester')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('secret')
      cy.get('#password').type('wrongpassword')
      cy.get('#loginButton').click()

      cy.get('#notification').contains('invalid username or password')
      cy.get('html').should('not.contain', 'Logged in as tester')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'secret', password: 'cat' })
    })

    it('blog can be added', function() {
      cy.contains('Add new blog').click()

      cy.get('#title').type('Testing with Cypress')
      cy.get('#author').type('Mysterious tester')
      cy.get('#url').type('987654')
      cy.contains('Submit').click()

      cy.get('#notification').contains(
        'A blog Testing with Cypress by Mysterious tester has been added'
      )

      cy.get('#bloglist').contains('Testing with Cypress Mysterious tester')
    })

    it('blog can be liked', function() {
      cy.addBlog(blog1)

      cy.get('.toggleDetails')
        .click()
        .get('#like-button')
        .click()

      cy.get('#bloglist')
        .get('.blog')
        .contains('1 likes')
    })

    it('blog can be deleted by owner', function() {
      cy.addBlog(blog2)
      cy.wait(500)

      cy.visit('http://localhost:3000')

      cy.get('.toggleDetails').click()

      cy.contains('Remove').click()

      cy.get('#notification').contains(`Blog ´${blog2.title}´ removed`)
      cy.get('#bloglist').should('not.contain', blog2.title)
    })

    it('blogs are sorted by likes in descending order', function() {
      cy.addBlog(blog1)
      cy.addBlog(blog2)
      cy.addBlog(blog3)

      cy.openDetails(0)
        .likeBlog()
        .closeDetails()

      cy.openDetails(2)
        .likeBlog()
        .likeBlog()
        .likeBlog()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).should('contain', blog3.title)
        cy.wrap(blogs[0]).should('contain', '3 likes')
        cy.wrap(blogs[1]).should('contain', blog1.title)
        cy.wrap(blogs[2]).should('contain', blog2.title)
      })
    })
  })
})
