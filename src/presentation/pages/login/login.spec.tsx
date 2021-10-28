import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  render(<Login validation={validationSpy} />)
  return {
    validationSpy
  }
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    makeSut()

    const errorWrapper = screen.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const submitBtn = screen.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitBtn.disabled).toBeTruthy()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Campo obrigatório')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Campo obrigatório')
  })

  test('Should call validation with correct email', () => {
    const { validationSpy } = makeSut()
    const email = faker.internet.email()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: email } })

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual(email)
  })

  test('Should call validation with correct password', () => {
    const { validationSpy } = makeSut()
    const password = faker.internet.password()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: password } })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual(password)
  })
})
