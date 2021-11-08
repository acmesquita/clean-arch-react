import faker from 'faker'
import { fireEvent, screen } from '@testing-library/dom'

export const testChildCount = (field: string, count: number): void => {
  const fieldEl = screen.getByTestId(field)
  expect(fieldEl.childElementCount).toBe(count)
}

export const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const fieldEl = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(fieldEl.disabled).toBe(isDisabled)
}

export const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldEl = screen.getByTestId(`${fieldName}-status`)
  expect(fieldEl.title).toBe(validationError)
  expect(fieldEl.className).toMatch('error')
}

export const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

export const testIfElementExist = (fieldName: string): void => {
  const field = screen.findByTestId(fieldName)
  expect(field).toBeTruthy()
}

export const testTextContentElement = (fieldName: string, text: string): void => {
  const el = screen.getByTestId(fieldName)
  expect(el.textContent).toBe(text)
}
