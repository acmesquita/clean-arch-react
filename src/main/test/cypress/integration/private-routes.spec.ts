import * as Helpers from '../suport/helpers'

describe('PrivateRoutes', () => {
  it('Should logout if survey-list has no token', () => {
    cy.visit('')

    Helpers.testURl('/login')
  })
})
