import faker from 'faker'
import * as FormHelpers from '../utils/form-helpers'
import * as Helpers from '../utils/helpers'
import * as HttpHelper from '../utils/http-mocks'

const path = /signup/
const mockEmailInUseError = (): void => HttpHelper.mockForbidenError('POST', path)
const mockUnexpetedError = (): void => HttpHelper.mockServerError('POST', path)
const mockSuccess = (): void => HttpHelper.mockOk('POST', path, 'fx:account')

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
    mockEmailInUseError()
    cy.visit('signup')

    simulateRequestValid()

    FormHelpers.testMainError('Email em uso')
    Helpers.testURl('/signup')
  })

  it('Should present UnexpectedError any other error', () => {
    mockUnexpetedError()
    cy.visit('signup')

    simulateRequestValid()

    FormHelpers.testMainError('Algo de errado aconteceu, tente novamente mais tarde.')
    Helpers.testURl('/signup')
  })

  it('Should save account if valid values are provider', () => {
    mockSuccess()
    cy.visit('signup')

    simulateRequestValid()

    cy.getByTestId('error-wrapper')
      .getByTestId('spinner').should('exist')
      .getByTestId('main-error').should('not.exist')
      .getByTestId('spinner').should('not.exist')
    Helpers.testLocalStorageItem('account')
  })

  it('Should not calls submit id form is invalid', () => {
    mockSuccess()
    cy.visit('signup')

    cy.getByTestId('email').focus().type(faker.internet.email()).type('{enter}')

    Helpers.testHttpCallsCount(0, false)
  })

  it('Should calls submit form when enter pressed', () => {
    mockSuccess()
    cy.visit('signup')

    cy.getByTestId('name').focus().type(faker.name.findName())
    cy.getByTestId('email').focus().type(faker.internet.email())
    const password = faker.random.alphaNumeric(5)
    cy.getByTestId('password').focus().type(password)
    cy.getByTestId('passwordConfirmation').focus().type(password).type('{enter}')

    Helpers.testHttpCallsCount(1)
  })

  it('Should prevent multiple submit', () => {
    mockSuccess()
    cy.visit('signup')

    simulateRequestValid()
    cy.getByTestId('submit').click()

    Helpers.testHttpCallsCount(1)
  })
})
