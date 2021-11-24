import { SurveryModel } from '@/domain/models'
import faker from 'faker'

export const mockSurveryModel = (): SurveryModel => ({
  id: faker.datatype.uuid(),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
  question: faker.random.words(8),
  answers: [{
    answer: faker.random.words(2),
    image: faker.internet.url()
  },{
    answer: faker.random.words(2),
    image: faker.internet.url()
  }]
})

export const mockSurveryListModel = (): SurveryModel[] => Array.from({ length: 2 }, mockSurveryModel)
