import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationStub, AuthenticationSpy, SaveAccessTokenMock, Helper } from '@/presentation/test'
import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  saveAccessTokenMock: SaveAccessTokenMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = null

  const authenticationSpy = new AuthenticationSpy()

  const saveAccessTokenMock = new SaveAccessTokenMock()

  render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock}/>
    </Router>
  )

  return {
    validationStub,
    authenticationSpy,
    saveAccessTokenMock
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

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  populateEmailField(email)
  populatePasswordField(password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
      </Router>
    )

    Helper.testChildCount('error-wrapper', 0)
    Helper.testStatusForField('email', errorMessage)
    Helper.testStatusForField('password', errorMessage)
    Helper.testButtonIsDisabled('submit-btn', true)
  })

  test('Should show email error if validation fails', () => {
    const errorMessage = faker.random.words(5)
    const { validationStub } = makeSut()
    validationStub.errorMessage = errorMessage
    populateEmailField()
    Helper.testStatusForField('email', errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const errorMessage = faker.random.words(5)
    const { validationStub } = makeSut()
    validationStub.errorMessage = errorMessage

    populatePasswordField()
    Helper.testStatusForField('password', errorMessage)
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
    Helper.testButtonIsDisabled('submit-btn', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()

    await simulateValidSubmit()

    const spinner = screen.findByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  test('Should calls Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })

  test('Should calls Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const saveAccessTokenMock = new SaveAccessTokenMock()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} saveAccessToken={saveAccessTokenMock} />
      </Router>
    )

    populateEmailField()
    fireEvent.submit(screen.getByTestId('form'))
    expect(authenticationSpy.callsCount).toBe(0)
  })

  test('Should show errorMessager if Authentication fail', async () => {
    const { authenticationSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error)
    const errorWrapper = screen.getByTestId('error-wrapper')

    await simulateValidSubmit()

    await waitFor(() => errorWrapper)
    Helper.testChildCount('error-wrapper', 1)

    const mainError = screen.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
  })

  test('Should show errorMessager if SaveAccessToken fail', async () => {
    const { saveAccessTokenMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(saveAccessTokenMock, 'save').mockRejectedValueOnce(error)
    const errorWrapper = screen.getByTestId('error-wrapper')

    await simulateValidSubmit()

    await waitFor(() => errorWrapper)
    Helper.testChildCount('error-wrapper', 1)

    const mainError = screen.getByTestId('main-error')
    expect(mainError.textContent).toBe(error.message)
  })

  test('Should call SaveAccessToken with correct value', async () => {
    const { authenticationSpy, saveAccessTokenMock } = makeSut()

    await simulateValidSubmit()

    await waitFor(() => { screen.getByTestId('form') })

    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to signUp page', () => {
    makeSut()

    const register = screen.getByTestId('register')

    userEvent.click(register)
    expect(history.length).toBe(2)
    expect(history.location.pathname).toBe('/signup')
  })
})
