import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { ValidationSpy } from '@/presentation/test'
import Login from './login'

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

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validationSpy.fieldName).toEqual('email')
    expect(validationSpy.fieldValue).toEqual('any_email')
  })

  test('Should call validation with correct password', () => {
    const { validationSpy } = makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(validationSpy.fieldName).toEqual('password')
    expect(validationSpy.fieldValue).toEqual('any_password')
  })
})
