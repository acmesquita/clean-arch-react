import React from 'react'
import faker from 'faker'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { ValidationStub , Helper, AddAccountSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'
import userEvent from '@testing-library/user-event'
import { AccountModel } from '@/domain/models'
import { ApiContext } from '@/presentation/context'

type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
  setCurrentAccountMock: (account: AccountModel) => void
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/'] })

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()
  const setCurrentAccountMock = jest.fn()

  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp validation={validationStub} addAccount={addAccountSpy} />
      </Router>
    </ApiContext.Provider>
  )

  return {
    validationStub,
    addAccountSpy,
    setCurrentAccountMock
  }
}

const simulateValidSubmit = async (name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password()): Promise<void> => {
  Helper.populateField('name', name)
  Helper.populateField('email', email)
  Helper.populateField('password', password)
  Helper.populateField('passwordConfirmation', password)
  const form = screen.getByTestId('form')
  fireEvent.submit(form)
  await waitFor(() => form)
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    makeSut({ validationError })
    expect(screen.getByTestId('error-wrapper').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
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
    Helper.testStatusForField('name', '')
  })

  test('Should show valid email state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('email')
    Helper.testStatusForField('email', '')
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('password')
    Helper.testStatusForField('password', '')
  })

  test('Should show valid passwordConfirmation state if Validation succeeds', () => {
    makeSut()
    Helper.populateField('passwordConfirmation')
    Helper.testStatusForField('passwordConfirmation', '')
  })

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    const password = faker.internet.password()
    Helper.populateField('name')
    Helper.populateField('email', faker.internet.email())
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)
    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
  })

  test('Should calls AddAccount with correct values', async () => {
    const { addAccountSpy } = makeSut()
    const name = faker.name.findName()
    const email = faker.internet.email()
    const password = faker.internet.password()

    await simulateValidSubmit(name, email, password)

    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    })
  })

  test('Should calls AddAccount only once', async () => {
    const { addAccountSpy } = makeSut()

    await simulateValidSubmit()
    await simulateValidSubmit()

    expect(addAccountSpy.callsCount).toBe(1)
  })

  test('Should not call AddAccount if form is invalid', () => {
    const validationError = faker.random.words(5)
    const { addAccountSpy } = makeSut({ validationError })

    Helper.populateField('email', faker.internet.email())
    fireEvent.submit(screen.getByTestId('form'))

    expect(addAccountSpy.callsCount).toBe(0)
  })

  test('Should show errorMessager if AddAccount fail', async () => {
    const { addAccountSpy } = makeSut()
    const error = new InvalidCredentialsError()
    jest.spyOn(addAccountSpy, 'add').mockRejectedValueOnce(error)
    const errorWrapper = screen.getByTestId('error-wrapper')

    await simulateValidSubmit()

    await waitFor(() => errorWrapper)
    expect(screen.getByTestId('error-wrapper').children).toHaveLength(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  test('Should call UpdateCurrentAccount with correct value', async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccountMock).toHaveBeenLastCalledWith(addAccountSpy.account)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/')
  })

  test('Should go to login page', () => {
    makeSut()

    const loginLink = screen.getByTestId('login')

    userEvent.click(loginLink)
    expect(history.length).toBe(1)
    expect(history.location.pathname).toBe('/login')
  })
})
