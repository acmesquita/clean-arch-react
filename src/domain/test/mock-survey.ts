import faker from 'faker'
import { LoadSurveyList } from '@/domain/usecases'

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
  question: faker.random.words(8)
})

export const mockSurveyListModel = (): LoadSurveyList.Model[] => Array.from({ length: 2 }, mockSurveyModel)

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0
  surveries = mockSurveyListModel()

  async loadAll (): Promise<LoadSurveyList.Model[]> {
    this.callsCount++
    return this.surveries
  }
}
