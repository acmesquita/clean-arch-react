import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveryItem } from '@/presentation/pages/survery-list/components'
import { mockSurveryModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

describe('SurveryItem Component', () => {
  test('Should render with correct values', () => {
    const survery = mockSurveryModel()
    survery.didAnswer = true
    survery.date = new Date('2020-01-10T00:00:00')
    render(<SurveryItem survery={survery}/>)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survery.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
})
