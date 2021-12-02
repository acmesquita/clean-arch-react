import * as Helpers from '../utils/helpers'
import * as HttpHelper from '../utils/http-mocks'

const mockUnexpetedError = (): void => HttpHelper.mockServerError('GET', /surveys/)
const mockDeniedError = (): void => HttpHelper.mockForbidenError('GET', /surveys/)

describe('SurveyList', () => {
  beforeEach(() => {
    cy.fixture('account').then(account => {
      Helpers.setLocalStorageItem('account', account)
    })
  })

  afterEach(() => {
    localStorage.removeItem('account')
  })

  it('Should present error on UnexpectedError', () => {
    mockUnexpetedError()
    cy.visit('')

    cy.getByTestId('error').should('contain.text', 'Algo de errado aconteceu, tente novamente mais tarde.')
  })

  it('Should logout on AccessDeniedError', () => {
    mockDeniedError()
    cy.visit('')

    Helpers.testURl('/login')
  })

  it('Should present correct username', () => {
    mockUnexpetedError()
    cy.visit('')
    const { name } = Helpers.getLocalStorageItem('account')

    cy.getByTestId('username').should('contain.text', name)
  })

  it('Should logout on logoutLink click', () => {
    mockUnexpetedError()
    cy.visit('')
    cy.getByTestId('logout').click()
    Helpers.testURl('/login')
  })
})
