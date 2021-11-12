import faker from 'faker'
import * as FormHelper from '../suport/form-helper'
import * as Http from '../suport/login-mock'

const simulateRequestValid = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  it('Should load with correct initial state', () => {
    cy.visit('login')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', "O campo 'email' está com valor inválido")

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Tamanho inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelper.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present InvalidPresentError on 401', () => {
    Http.mockInvalidCredentialsError()
    cy.visit('login')

    simulateRequestValid()

    FormHelper.testMainError('Credenciais inválidas')
    FormHelper.testURl('/login')
  })

  it('Should present UnexpectedError any other error', () => {
    Http.mockUnexpetedError()
    cy.visit('login')

    simulateRequestValid()

    FormHelper.testMainError('Algo de errado aconteceu, tente novamente mais tarde.')
    FormHelper.testURl('/login')
  })

  it('Should present UnexpectedError if invalid data is returned', () => {
    Http.mockInvalidReturn()
    cy.visit('login')

    simulateRequestValid()
    FormHelper.testMainError('Algo de errado aconteceu, tente novamente mais tarde.')

    FormHelper.testURl('/login')
  })

  it('Should save accessToken if valid credentiais are provider', () => {
    const accessToken = faker.datatype.uuid()
    Http.mockOk(accessToken)
    cy.visit('login')

    simulateRequestValid()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    FormHelper.testURl('/')
    FormHelper.testLocalStorageItem('accessToken', accessToken)
  })

  it('Should not calls submit id form is invalid', () => {
    Http.mockOk()
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    FormHelper.testHttpCallsCount(0, false)
  })

  it('Should calls submit form when enter pressed', () => {
    Http.mockOk()
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')

    FormHelper.testHttpCallsCount(1)
  })

  it('Should prevent multiple submit', () => {
    Http.mockOk()
    cy.visit('login')

    simulateRequestValid()
    cy.getByTestId('submit').click()

    FormHelper.testHttpCallsCount(1)
  })
})
