import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ValidationStub } from '@/presentation/test'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = faker.random.words(5)

  render(<Login validation={validationStub} />)
  return {
    validationStub
  }
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const { validationStub } = makeSut()

    const errorWrapper = screen.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitBtn = screen.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitBtn.disabled).toBeTruthy()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show email error if validation fails', () => {
    const { validationStub } = makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { validationStub } = makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
  })
})
