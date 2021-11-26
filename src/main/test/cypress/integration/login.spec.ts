import faker from 'faker'
import * as FormHelpers from '../suport/form-helpers'
import * as Helpers from '../suport/helpers'
import * as Http from '../suport/login-mock'
import { mockAccountModel } from '../suport/account-mock'

const simulateRequestValid = (): void => {
  cy.getByTestId('email').focus().type(faker.internet.email())
  cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
  cy.getByTestId('submit').click()
}

describe('Login', () => {
  it('Should load with correct initial state', () => {
    cy.visit('login')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelpers.testInputStatus('email', "O campo 'email' está com valor inválido")

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'Tamanho inválido')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email())
    FormHelpers.testInputStatus('email')

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('password')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present InvalidPresentError on 401', () => {
    Http.mockInvalidCredentialsError()
    cy.visit('login')

    simulateRequestValid()

    FormHelpers.testMainError('Credenciais inválidas')
    Helpers.testURl('/login')
  })

  it('Should present UnexpectedError any other error', () => {
    Http.mockUnexpetedError()
    cy.visit('login')

    simulateRequestValid()

    FormHelpers.testMainError('Algo de errado aconteceu, tente novamente mais tarde.')
    Helpers.testURl('/login')
  })

  it('Should save account if valid credentiais are provider', () => {
    const account = mockAccountModel()
    Http.mockOk(account.accessToken, account.name)
    cy.visit('login')

    simulateRequestValid()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    Helpers.testURl('/')
    Helpers.testLocalStorageItem('account', JSON.stringify(account))
  })

  it('Should not calls submit id form is invalid', () => {
    Http.mockOk()
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0, false)
  })

  it('Should calls submit form when enter pressed', () => {
    Http.mockOk()
    cy.visit('login')

    cy.getByTestId('email').focus().type(faker.internet.email())
    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(5)).type('{enter}')

    Helpers.testHttpCallsCount(1)
  })

  it('Should prevent multiple submit', () => {
    Http.mockOk()
    cy.visit('login')

    simulateRequestValid()
    cy.getByTestId('submit').click()

    Helpers.testHttpCallsCount(1)
  })
})
