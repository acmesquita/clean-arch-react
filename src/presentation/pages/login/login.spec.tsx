import React from 'react'
import { render, screen } from '@testing-library/react'

import Login from './login'

describe('Login', () => {
  test('Should no render spinner when initialize Login page', () => {
    render(<Login />)
    const errorWrapper = screen.getByTestId('error-wrapper')
    expect(errorWrapper.childElementCount).toBe(0)
  })
})
