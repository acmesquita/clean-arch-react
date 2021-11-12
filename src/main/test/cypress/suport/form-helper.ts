const baseUrl: string = Cypress.config().baseUrl

export const testInputStatus = (field: string, error?: string): void => {
  cy.getByTestId(`${field}-wrap`).should('have.attr', 'data-status', error ? 'invalid' : 'valid')
  const attr = `${error ? '' : 'not.'}have.attr`
  cy.getByTestId(field).should(attr, 'title', error)
  cy.getByTestId(`${field}-label`).should(attr, 'title', error)
}

export const testMainError = (error: string): void => {
  cy.getByTestId('error-wrapper')
    .getByTestId('spinner').should('exist')
    .getByTestId('main-error').should('not.exist')
    .getByTestId('spinner').should('not.exist')
    .getByTestId('main-error').should('contain.text', error)
}

export const testHttpCallsCount = (count: number, wait = true): void => {
  if (wait) cy.wait('@request')
  cy.get('@request.all').should('have.length', count)
}

export const testURl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string, value: any): void => {
  cy.window().then(window => assert.deepEqual(window.localStorage.getItem(key), value))
}
