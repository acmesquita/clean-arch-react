import React from 'react'
import faker from 'faker'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { ValidationStub , Helper } from '@/presentation/test'

type SutTypes = {
  validationStub: ValidationStub
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  render(<SignUp validation={validationStub} />)

  return {
    validationStub
  }
}

const populateField = (fieldName: string, value = faker.random.word()): void => {
  const input = screen.getByTestId(fieldName)
  fireEvent.input(input, { target: { value } })
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut({ validationError })

    Helper.testChildCount('error-wrapper', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.random.words(5)
    makeSut({ validationError })

    populateField('name')
    Helper.testStatusForField('name', validationError)
  })
})
