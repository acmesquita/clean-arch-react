import faker from 'faker'
import * as FormHelpers from '../suport/form-helpers'
import * as Helpers from '../suport/helpers'
import * as Http from '../suport/sign-up-mock'
import { mockAccountModel } from '../suport/account-mock'

const simulateRequestValid = (): void => {
  cy.getByTestId('name').focus().type(faker.name.findName())
  cy.getByTestId('email').focus().type(faker.internet.email())
  const password = faker.random.alphaNumeric(5)
  cy.getByTestId('password').focus().type(password)
  cy.getByTestId('passwordConfirmation').focus().type(password)
  cy.getByTestId('submit').click()
}

describe('SignUp', () => {
  it('Should load with correct initial state', () => {
    cy.visit('signup')

    cy.getByTestId('name').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelpers.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.visit('signup')

    cy.getByTestId('name').focus().type(faker.datatype.string(2))
    FormHelpers.testInputStatus('name', 'Tamanho inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelpers.testInputStatus('email', "O campo 'email' está com valor inválido")

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelpers.testInputStatus('password', 'Tamanho inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(5))
    FormHelpers.testInputStatus('passwordConfirmation', "O campo 'passwordConfirmation' está com valor inválido")

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.visit('signup')

    simulateRequestValid()

    FormHelpers.testInputStatus('name')
    FormHelpers.testInputStatus('email')
    FormHelpers.testInputStatus('password')
    FormHelpers.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    cy.visit('signup')

    simulateRequestValid()

    FormHelpers.testMainError('Email em uso')
    Helpers.testURl('/signup')
  })

  it('Should present UnexpectedError any other error', () => {
    Http.mockUnexpetedError()
    cy.visit('signup')

    simulateRequestValid()

    FormHelpers.testMainError('Algo de errado aconteceu, tente novamente mais tarde.')
    Helpers.testURl('/signup')
  })

  it('Should save account if valid values are provider', () => {
    const account = mockAccountModel()
    Http.mockOk(account.accessToken, account.name)
    cy.visit('signup')

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
    cy.visit('signup')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0, false)
  })

  it('Should calls submit form when enter pressed', () => {
    Http.mockOk()
    cy.visit('signup')

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}')

    Helpers.testHttpCallsCount(1)
  })

  it('Should prevent multiple submit', () => {
    Http.mockOk()
    cy.visit('signup')

    simulateRequestValid()
    cy.getByTestId('submit').click()

    Helpers.testHttpCallsCount(1)
  })
})
