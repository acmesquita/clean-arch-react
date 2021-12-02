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
