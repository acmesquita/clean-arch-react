import React from 'react'
import faker from 'faker'
import 'jest-localstorage-mock'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationStub, AuthenticationSpy } from '@/presentation/test'
import Login from './login'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = null

  const authenticationSpy = new AuthenticationSpy()

  render(<Login validation={validationStub} authentication={authenticationSpy} />)
  return {
    validationStub,
    authenticationSpy
  }
}

const populateEmailField = (email = faker.internet.email()): void => {
  const emailInput = screen.getByTestId('email')
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (password = faker.internet.password()): void => {
  const passwordInput = screen.getByTestId('password')
  fireEvent.input(passwordInput, { target: { value: password } })
}

const simulateValidSubmit = async (callback?: () => void, email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)
  await waitFor(() => {
    userEvent.click(screen.getByTestId('submit-btn'))
    if (callback) {
      callback()
    }
  })
}

describe('Login', () => {
  afterEach(cleanup)
  beforeEach(localStorage.clear)

  test('Should start with initial state', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(<Login validation={validationStub} authentication={authenticationSpy} />)

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

    populateEmailField()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe(validationStub.errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const { validationStub } = makeSut()
    validationStub.errorMessage = faker.random.words(5)
    populatePasswordField()

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe(validationStub.errorMessage)
    expect(passwordStatus.className).toMatch('error')
  })

  test('Should show valid emails state if Validation succeeds', () => {
    makeSut()
    populateEmailField()

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.className).not.toMatch('error')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    populatePasswordField()

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.className).not.toMatch('error')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    populateEmailField()
    populatePasswordField()

    const submitBtn = screen.getByTestId('submit-btn') as HTMLButtonElement
    expect(submitBtn.disabled).toBeFalsy()
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit(() => {
      const spinner = screen.findByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })

  test('Should calls Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(() => {
      expect(authenticationSpy.params).toEqual({
        email,
        password
      })
    }, email, password)
  })

  test('Should calls Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit(() => {
      expect(authenticationSpy.callsCount).toBe(1)
    })
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(<Login validation={validationStub} authentication={authenticationSpy} />)

    populateEmailField()
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should add accessToken to localStorage on success', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()

    await waitFor(() => { screen.getByTestId('form') })

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', authenticationSpy.account.accessToken)
  })
})
