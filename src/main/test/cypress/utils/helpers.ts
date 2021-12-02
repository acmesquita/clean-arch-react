const baseUrl: string = Cypress.config().baseUrl

export const testHttpCallsCount = (count: number, wait = true): void => {
  if (wait) cy.wait('@request')
  cy.get('@request.all').should('have.length', count)
}

export const testURl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`)
}

export const testLocalStorageItem = (key: string): void => {
  cy.window().then(window => assert.isOk(window.localStorage.getItem(key)))
}

export const setLocalStorageItem = (key: string, value: any): void => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorageItem = (key: string): { name: string, accessToken: string } => {
  return JSON.parse(localStorage.getItem(key))
}
