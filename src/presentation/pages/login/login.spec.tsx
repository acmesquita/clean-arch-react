import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ValidationStub, AuthenticationSpy, UpdateCurrentAccountMock, Helper } from '@/presentation/test'
import { Login } from '@/presentation/pages'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  validationStub: ValidationStub
  authenticationSpy: AuthenticationSpy
  updateCurrentAccountMock: UpdateCurrentAccountMock
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = null

  const authenticationSpy = new AuthenticationSpy()

  const updateCurrentAccountMock = new UpdateCurrentAccountMock()

  render(
    <Router history={history}>
      <Login validation={validationStub} authentication={authenticationSpy} updateCurrentAccount={updateCurrentAccountMock}/>
    </Router>
  )

  return {
    validationStub,
    authenticationSpy,
    updateCurrentAccountMock
  }
}

const simulateValidSubmit = async (email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
  await waitFor(async () => screen.findByTestId('error-wrapper'))
}

describe('Login', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const updateCurrentAccountMock = new UpdateCurrentAccountMock()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} updateCurrentAccount={updateCurrentAccountMock} />
      </Router>
    )

    Helper.testChildCount('error-wrapper', 0)
    Helper.testStatusForField('email', errorMessage)
    Helper.testStatusForField('password', errorMessage)
    Helper.testButtonIsDisabled('submit', true)
  })

  test('Should show email error if validation fails', () => {
    const errorMessage = faker.random.words(5)
    const { validationStub } = makeSut()
    validationStub.errorMessage = errorMessage
    Helper.populateField('email', faker.internet.email())
    Helper.testStatusForField('email', errorMessage)
  })

  test('Should show password error if validation fails', () => {
    const errorMessage = faker.random.words(5)
    const { validationStub } = makeSut()
    validationStub.errorMessage = errorMessage

    Helper.populateField('password', faker.internet.password())
    Helper.testStatusForField('password', errorMessage)
  })

  test('Should show valid emails state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email', faker.internet.email())
    Helper.testStatusForField('email', '')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password', faker.internet.password())
    Helper.testStatusForField('password', '')
  })

  test('Should enable submit button if form is valid', () => {
    makeSut()
    Helper.populateField('email', faker.internet.email())
    Helper.populateField('password', faker.internet.password())

    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testIfElementExist('spinner')
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
  }, 1000)

  test('Should calls Authentication only once', async () => {
    const { authenticationSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(authenticationSpy.callsCount).toBe(1)
  })

  test('Should not call Authentication if form is invalid', () => {
    const validationStub = new ValidationStub()
    const authenticationSpy = new AuthenticationSpy()
    const updateCurrentAccountMock = new UpdateCurrentAccountMock()
    const errorMessage = faker.random.words(5)
    validationStub.errorMessage = errorMessage

    render(
      <Router history={history}>
        <Login validation={validationStub} authentication={authenticationSpy} updateCurrentAccount={updateCurrentAccountMock} />
      </Router>
    )

    Helper.populateField('email', faker.internet.email())
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
    Helper.testTextContentElement('main-error', error.message)
  })

  test('Should show errorMessager if UpdateCurrentAccount fail', async () => {
    const { updateCurrentAccountMock } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(updateCurrentAccountMock, 'save').mockRejectedValueOnce(error)
    const errorWrapper = screen.getByTestId('error-wrapper')

    await simulateValidSubmit()

    await waitFor(() => errorWrapper)
    Helper.testChildCount('error-wrapper', 1)
    Helper.testTextContentElement('main-error', error.message)
  })

  test('Should call UpdateCurrentAccount with correct values', async () => {
    const { authenticationSpy, updateCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    await waitFor(() => { screen.getByTestId('form') })

    expect(updateCurrentAccountMock.account).toEqual(authenticationSpy.account)
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
