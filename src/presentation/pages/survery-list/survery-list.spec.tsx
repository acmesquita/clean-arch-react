import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { SurveryList } from '@/presentation/pages'
import { LoadSurveryList } from '@/domain/usecases'
import { SurveryModel } from '@/domain/models'
import { mockSurveryListModel } from '@/domain/test'

class LoadSurveryListSpy implements LoadSurveryList {
  callsCount = 0
  surveries = mockSurveryListModel()

  async loadAll (): Promise<SurveryModel[]> {
    this.callsCount++
    return this.surveries
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
  test('Should present 4 empyt SurveryItemEmpty components on start', async () => {
    makeSut()
    const surveryList = screen.getByTestId('survery-list')
    expect(surveryList.querySelectorAll('li:empty')).toHaveLength(4)
    await waitFor(() => surveryList)
  })

  test('Should call LoadSurveryList', async () => {
    const { loadSurveryListSpy } = makeSut()
    expect(loadSurveryListSpy.callsCount).toBe(1)
    await waitFor(() => screen.getByRole('heading'))
  })

  test('Should render SurveryItems on success', async () => {
    makeSut()
    const surveryList = screen.getByTestId('survery-list')
    await waitFor(() => surveryList)
    expect(surveryList.querySelectorAll('li.surveryItemWrapper')).toHaveLength(2)
  })
})
