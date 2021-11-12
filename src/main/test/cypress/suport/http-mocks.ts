import faker from 'faker'

export const mockInvalidCredentialsError = (url: RegExp): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    statusCode: 401,
    body: {
      error: faker.random.words(3)
    },
    delay: 100
  }).as('request')
}

export const mockEmailInUseError = (url: RegExp): void => {
  cy.intercept({
    method: 'POST',
    url
  }, {
    statusCode: 403,
    body: {
      error: faker.random.words(3)
    },
    delay: 100
  }).as('request')
}

export const mockUnexpetedError = (method: string, url: RegExp): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: faker.datatype.number({ min: 402, max: 500 }),
    body: {
      error: faker.random.words(3)
    },
    delay: 100
  }).as('request')
}

export const mockOk = (method: string, url: RegExp, response: any): void => {
  cy.intercept({
    method,
    url
  }, {
    statusCode: 200,
    body: response,
    delay: 100
  }).as('request')
}
