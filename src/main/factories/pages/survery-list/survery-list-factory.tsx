import React from 'react'
import { SurveryList } from '@/presentation/pages'
import { makeRemoveLoadSurveryList } from '@/main/factories/usecases'

export const makeSurveryList: React.FC = () => {
  return (
    <SurveryList
      loadSurveryList={makeRemoveLoadSurveryList()}
    />
  )
}
