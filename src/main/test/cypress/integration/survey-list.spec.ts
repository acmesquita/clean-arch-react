import * as Helpers from '../utils/helpers'
import * as HttpHelper from '../utils/http-mocks'

const path = /surveys/
const mockUnexpetedError = (): void => HttpHelper.mockServerError('GET', path)
const mockDeniedError = (): void => HttpHelper.mockForbidenError('GET', path)
const mockSuccess = (): void => { cy.fixture('survey-list').then(surveyList => HttpHelper.mockOk('GET', path, surveyList)) }

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

  it('Should present survey items correctly', () => {
    mockSuccess()
    cy.visit('')
    cy.get('li:empty').should('have.length', 4)
    cy.get('li:not(:empty)').should('have.length', 2)
    cy.get('li:nth-child(1)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '09')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2018')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 1')
      cy.fixture('icon').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbUp)
      })
    })
    cy.get('li:nth-child(2)').then(li => {
      assert.equal(li.find('[data-testid="day"]').text(), '09')
      assert.equal(li.find('[data-testid="month"]').text(), 'fev')
      assert.equal(li.find('[data-testid="year"]').text(), '2020')
      assert.equal(li.find('[data-testid="question"]').text(), 'Question 2')
      cy.fixture('icon').then(icon => {
        assert.equal(li.find('[data-testid="icon"]').attr('src'), icon.thumbDown)
      })
    })
  })
})
