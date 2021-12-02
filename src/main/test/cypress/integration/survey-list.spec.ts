import faker from 'faker'
import * as Helpers from '../suport/helpers'
import * as Http from '../suport/survey-list-mock'
import { mockAccountModel } from '../suport/account-mock'

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.setLocalStorageItem('account', mockAccountModel())
  })

  afterEach(() => {
    localStorage.removeItem('account')
  })

  it('Should present error on UnexpectedError', () => {
    Http.mockUnexpetedError()
    cy.visit('')

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu, tente novamente mais tarde.')
  })

  it('Should logout on AccessDeniedError', () => {
    Http.mockDeniedError()
    cy.visit('')

    Helpers.testURl('/login')
  })
})
