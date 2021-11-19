import faker from 'faker'
import { fireEvent, screen } from '@testing-library/dom'

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const wrapEl = screen.getByTestId(`${fieldName}-wrap`)
  const fieldLabelEl = screen.getByTestId(`${fieldName}-label`)
  const fieldEl = screen.getByTestId(fieldName)
  expect(fieldLabelEl).toHaveProperty('title', validationError)
  expect(fieldEl).toHaveProperty('title', validationError)
  expect(wrapEl).toHaveAttribute('data-status', validationError ? 'invalid' : 'valid')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}
