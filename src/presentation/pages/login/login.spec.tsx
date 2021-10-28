import React from 'react'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationStub } from '@/presentation/test'
import Login from './login'
import faker from 'faker'

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = null

  render(<Login validation={validationStub} />)
  return {
    validationStub
  }
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationStub = new ValidationStub()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(<Login validation={validationStub} />)

    const errorWrapper = screen.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(errorMessage)

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(errorMessage)

    const submitBtn = screen.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitBtn.disabled).toBeTruthy()
  })

  test('Should show email error if validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words(5)

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words(5)

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.className).toMatch('error')
  })

  test('Should show valid emails state if Validation succeeds', () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.className).not.toMatch('error')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.className).not.toMatch('error')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitBtn = screen.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitBtn.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    const emailInput = screen.getByTestId('email')
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } })

    const passwordInput = screen.getByTestId('password')
    fireEvent.input(passwordInput, { target: { value: faker.internet.password() } })

    const submitBtn = screen.getByTestId('submit-btn')

    await waitFor(() => {
      userEvent.click(submitBtn)
      const spinner = screen.findByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })
})
