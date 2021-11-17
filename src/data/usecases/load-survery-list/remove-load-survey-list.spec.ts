import faker from 'faker'
import { HttpGetClientSpy } from '@/data/test'
import { RemoveLoadSurveyList } from './remove-load-survey-list'

describe('RemoveLoadSurveyList', () => {
  test('Should call HttpGetClient with correct url', async () => {
    const url = faker.internet.url()
    const httpGetClientSpy = new HttpGetClientSpy()
    const sut = new RemoveLoadSurveyList(url, httpGetClientSpy)
    await sut.loadAll()

    expect(httpGetClientSpy.url).toBe(url)
  })
})
