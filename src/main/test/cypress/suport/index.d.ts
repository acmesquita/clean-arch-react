declare module Cypress {
  interface Chainable {
    getByTestId: (id: string) => Chainable<Element>
  }
}
