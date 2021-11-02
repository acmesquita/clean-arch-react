import { screen } from '@testing-library/dom'

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
