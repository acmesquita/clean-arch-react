import React from 'react'
import faker from 'faker'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { ValidationStub , Helper, AddAccountSpy } from '@/presentation/test'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  validationStub: ValidationStub
  addAccountSpy: AddAccountSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError

  const addAccountSpy = new AddAccountSpy()
  render(<SignUp validation={validationStub} addAccount={addAccountSpy}/>)

  return {
    validationStub,
    addAccountSpy
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
  afterEach(cleanup)

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

  test('Should enable submit button if form is valid', async () => {
    makeSut()
    const password = faker.internet.password()
    Helper.populateField('name')
    Helper.populateField('email', faker.internet.email())
    Helper.populateField('password', password)
    Helper.populateField('passwordConfirmation', password)

    Helper.testButtonIsDisabled('submit', false)
  })

  test('Should show spinner on submit', async () => {
    makeSut()
    await simulateValidSubmit()
    Helper.testIfElementExist('spinner')
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
    Helper.testChildCount('error-wrapper', 1)
    Helper.testTextContentElement('main-error', error.message)
  })
})
