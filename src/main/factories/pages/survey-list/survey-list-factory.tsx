import React from 'react'
import { SurveyList } from '@/presentation/pages'
import { makeRemoveLoadSurveyList } from '@/main/factories/usecases'

export const MakeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoveLoadSurveyList()}
    />
  )
}
