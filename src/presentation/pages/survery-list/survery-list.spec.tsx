import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveryList } from '@/presentation/pages'

const makeSut = (): void => {
  render(<SurveryList />)
}

describe('SurveryList Component', () => {
  test('Should present 4 empyt SurveryItemEmpty components on start', () => {
    makeSut()
    const surveryList = screen.getByTestId('survery-list')
    expect(surveryList.querySelectorAll('li:empty').length).toBe(4)
  })
})
