import faker from 'faker'

const baseUrl: string = Cypress.config().baseUrl

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login')
  })

  it('Shuld load with correct initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readOnly')
    cy.getByTestId('email-status').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('password').should('have.attr', 'readOnly')
    cy.getByTestId('password-status').should('have.attr', 'title', 'Campo obrigatório')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Shuld present error state if form is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word())
    cy.getByTestId('email-status').should('have.attr', 'title', "O campo 'email' está com valor inválido")
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    cy.getByTestId('password-status').should('have.attr', 'title', 'Tamanho inválido')
    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Shuld present valid state if form is valid', () => {
    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('email-status').should('have.class', '')
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('email-status').should('have.class', '')
    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Shuld present InvalidPresentError on 401', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 401,
      body: {
        error: faker.random.words(3)
      },
      delay: 200
    }).as('requestLogin')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Credenciais inválidas')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Shuld present UnexpectedError any other error', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: faker.datatype.number({ min: 402, max: 500 }),
      body: {
        error: faker.random.words(3)
      },
      delay: 200
    }).as('requestLogin')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu, tente novamente mais tarde.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Shuld present UnexpectedError if invalid data is returned', () => {
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 200,
      body: {
        invalidParam: faker.random.word()
      },
      delay: 200
    }).as('requestLogin')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))

    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
      .getByTestId('main-error').should('contain.text', 'Algo de errado aconteceu, tente novamente mais tarde.')

    cy.url().should('eq', `${baseUrl}/login`)
  })

  it('Shuld save accessTokne if valid credentiais are provider', () => {
    const accessToken = faker.datatype.uuid()
    cy.intercept({
      method: 'POST',
      url: /login/
    }, {
      statusCode: 200,
      body: {
        accessToken
      },
      delay: 200
    }).as('requestLogin')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    cy.getByTestId('submit').click()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    cy.url().should('eq', `${baseUrl}/`)
    cy.window().then(window => assert.deepEqual(window.localStorage.getItem('accessToken'), accessToken))
  })
})
