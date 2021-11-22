import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveryList } from '@/presentation/pages'

describe('SurveryList Component', () => {
  test('Should present 4 empyt SurveryItemEmpty components on start', () => {
    render(<SurveryList />)
    const surveryList = screen.getByTestId('survery-list')
    expect(surveryList.querySelectorAll('li:empty').length).toBe(4)
  })
})
