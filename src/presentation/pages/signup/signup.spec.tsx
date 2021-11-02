import React from 'react'
import faker from 'faker'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { ValidationStub } from '@/presentation/test'

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  render(<SignUp validation={validationStub} />)

  return {
    validationStub
  }
}

const testChildCount = (field: string, count: number): void => {
  const fieldEl = screen.getByTestId(field)
  expect(fieldEl.childElementCount).toBe(count)
}

const testButtonIsDisabled = (fieldName: string, isDisabled: boolean): void => {
  const fieldEl = screen.getByTestId(fieldName) as HTMLButtonElement
  expect(fieldEl.disabled).toBe(isDisabled)
}

const testStatusForField = (fieldName: string, validationError?: string): void => {
  const fieldEl = screen.getByTestId(`${fieldName}-status`)
  expect(fieldEl.title).toBe(validationError)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const validationStub = new ValidationStub()
    validationStub.errorMessage = validationError
    render(<SignUp validation={validationStub} />)

    testChildCount('error-wrapper', 0)
    testButtonIsDisabled('submit', true)
    testStatusForField('name', validationError)
    testStatusForField('email', validationError)
    testStatusForField('password', validationError)
    testStatusForField('passwordConfirmation', validationError)
  })
})
