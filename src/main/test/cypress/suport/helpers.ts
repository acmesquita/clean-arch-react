const baseUrl: string = Cypress.config().baseUrl

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

export const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}
