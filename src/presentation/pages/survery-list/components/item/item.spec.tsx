import React from 'react'
import { render, screen } from '@testing-library/react'
import { Item } from '@/presentation/pages/survery-list/components'
import { mockSurveryModel } from '@/domain/test'
import { IconName } from '@/presentation/components'

const makeSut = (survery = mockSurveryModel()): void => {
  render(<Item survery={survery}/>)
}

describe('Item Component', () => {
  test('Should render with correct values', () => {
    const survery = Object.assign(mockSurveryModel(), {
      didAnswer: true,
      date: new Date('2020-01-10T00:00:00')
    })
    makeSut(survery)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbUp)
    expect(screen.getByTestId('question')).toHaveTextContent(survery.question)
    expect(screen.getByTestId('day')).toHaveTextContent('10')
    expect(screen.getByTestId('month')).toHaveTextContent('jan')
    expect(screen.getByTestId('year')).toHaveTextContent('2020')
  })
  test('Should render with correct values', () => {
    const survery = Object.assign(mockSurveryModel(), {
      didAnswer: false,
      date: new Date('2019-05-03T00:00:00')
    })
    makeSut(survery)

    expect(screen.getByTestId('icon')).toHaveProperty('src', IconName.thumbDown)
    expect(screen.getByTestId('question')).toHaveTextContent(survery.question)
    expect(screen.getByTestId('day')).toHaveTextContent('03')
    expect(screen.getByTestId('month')).toHaveTextContent('mai')
    expect(screen.getByTestId('year')).toHaveTextContent('2019')
  })
})
