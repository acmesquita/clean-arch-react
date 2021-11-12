import faker from 'faker'
import * as FormHelper from '../suport/form-helper'
import * as Http from '../suport/sign-up-mock'

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
    FormHelper.testInputStatus('name', 'Campo obrigatório')

    cy.getByTestId('email').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('email', 'Campo obrigatório')

    cy.getByTestId('password').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('password', 'Campo obrigatório')

    cy.getByTestId('passwordConfirmation').should('have.attr', 'readOnly')
    FormHelper.testInputStatus('passwordConfirmation', 'Campo obrigatório')

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present error state if form is invalid', () => {
    cy.visit('signup')

    cy.getByTestId('name').focus().type(faker.datatype.string(2))
    FormHelper.testInputStatus('name', 'Tamanho inválido')

    cy.getByTestId('email').focus().type(faker.random.word())
    FormHelper.testInputStatus('email', "O campo 'email' está com valor inválido")

    cy.getByTestId('password').focus().type(faker.random.alphaNumeric(3))
    FormHelper.testInputStatus('password', 'Tamanho inválido')

    cy.getByTestId('passwordConfirmation').focus().type(faker.random.alphaNumeric(5))
    FormHelper.testInputStatus('passwordConfirmation', "O campo 'passwordConfirmation' está com valor inválido")

    cy.getByTestId('submit').should('have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present valid state if form is valid', () => {
    cy.visit('signup')

    simulateRequestValid()

    FormHelper.testInputStatus('name')
    FormHelper.testInputStatus('email')
    FormHelper.testInputStatus('password')
    FormHelper.testInputStatus('passwordConfirmation')

    cy.getByTestId('submit').should('not.have.attr', 'disabled')
    cy.getByTestId('error-wrapper').should('not.have.descendants')
  })

  it('Should present EmailInUseError on 403', () => {
    Http.mockEmailInUseError()
    cy.visit('signup')

    simulateRequestValid()

    FormHelper.testMainError('Email em uso')
    FormHelper.testURl('/signup')
  })
})
