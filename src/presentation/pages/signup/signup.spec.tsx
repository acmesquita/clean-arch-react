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

    Helper.populateField('name')
    Helper.testStatusForField('name', validationError)
  })

  test('Should show email error if Validation fails', () => {
    const validationError = faker.random.words(5)
    makeSut({ validationError })

    Helper.populateField('email')
    Helper.testStatusForField('email', validationError)
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words(5)
    makeSut({ validationError })

    Helper.populateField('password')
    Helper.testStatusForField('password', validationError)
  })

  test('Should show passwordConfirmation error if Validation fails', () => {
    const validationError = faker.random.words(5)
    makeSut({ validationError })

    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', validationError)
  })

  test('Should show valid name state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('name')

    const emailStatus = screen.getByTestId('name-status')
    expect(emailStatus.className).not.toMatch('error')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.className).not.toMatch('error')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')

    const emailStatus = screen.getByTestId('password-status')
    expect(emailStatus.className).not.toMatch('error')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')

    const emailStatus = screen.getByTestId('passwordConfirmation-status')
    expect(emailStatus.className).not.toMatch('error')
  })
})
