import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostClientParams } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct URL and verb POST', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url)
  })
})
