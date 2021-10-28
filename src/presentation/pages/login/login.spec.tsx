import React from 'react'
import { render, RenderResult, screen } from '@testing-library/react'
import Login from './login'

const makeSut = (): void => {
  render(<Login />)
}

describe('Login', () => {
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
})
