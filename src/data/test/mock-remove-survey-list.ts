import faker from 'faker'
import { RemoteLoadSurveyList } from '@/data/usecases'

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
  question: faker.random.words(8)
})

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] => Array.from({ length: 3 }, mockRemoteSurveyModel)
