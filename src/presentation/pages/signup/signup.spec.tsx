import React from 'react'
import faker from 'faker'
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { SignUp } from '@/presentation/pages'
import { ValidationStub , Helper } from '@/presentation/test'

type SutTypes = {
  validationStub: ValidationStub
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  render(<SignUp validation={validationStub} />)

  return {
    validationStub
  }
}

describe('SignUp Component', () => {
  test('Should start with initial state', () => {
    const validationError = 'Campo obrigatório'
    const validationStub = new ValidationStub()
    validationStub.errorMessage = validationError
    render(<SignUp validation={validationStub} />)

    Helper.testChildCount('error-wrapper', 0)
    Helper.testButtonIsDisabled('submit', true)
    Helper.testStatusForField('name', validationError)
    Helper.testStatusForField('email', validationError)
    Helper.testStatusForField('password', validationError)
    Helper.testStatusForField('passwordConfirmation', validationError)
  })
})
