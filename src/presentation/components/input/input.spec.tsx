import { Input } from '@/presentation/components'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import { render, fireEvent, screen } from '@testing-library/react'
import React from 'react'
import faker from 'faker'

const makeSut = (fieldName: string): void => {
  render(
    <FormLoginContext.Provider value={{ state: {} }}>
      <Input name={fieldName} />
    </FormLoginContext.Provider>
  )
}

describe('Input Component', () => {
  test('Should begin with readOnly', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    expect(input.readOnly).toBe(true)
  })

  test('Should remove readOnly on focus', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field) as HTMLInputElement

    fireEvent.focus(input)

    expect(input.readOnly).toBe(false)
  })

  test('Should focus input on label click', () => {
    const field = faker.database.column()
    makeSut(field)
    const input = screen.getByTestId(field)
    const label = screen.getByTestId(`${field}-label`)

    fireEvent.click(label)

    expect(document.activeElement).toBe(input)
  })
})
