import React from 'react'
import { render, screen } from '@testing-library/react'
import { SurveryList } from '@/presentation/pages'
import { LoadSurveryList } from '@/domain/usecases'
import { SurveryModel } from '@/domain/models'

class LoadSurveryListSpy implements LoadSurveryList {
  callsCount = 0
  async loadAll (): Promise<SurveryModel[]> {
    this.callsCount++
    return null
  }
}

type SutType = {
  loadSurveryListSpy: LoadSurveryListSpy
}

const makeSut = (): SutType => {
  const loadSurveryListSpy = new LoadSurveryListSpy()
  render(<SurveryList loadSurveryList={loadSurveryListSpy} />)

  return {
    loadSurveryListSpy
  }
}

describe('SurveryList Component', () => {
  test('Should present 4 empyt SurveryItemEmpty components on start', () => {
    makeSut()
    const surveryList = screen.getByTestId('survery-list')
    expect(surveryList.querySelectorAll('li:empty').length).toBe(4)
  })

  test('Should call LoadSurveryList', () => {
    const { loadSurveryListSpy } = makeSut()
    expect(loadSurveryListSpy.callsCount).toBe(1)
  })
})
