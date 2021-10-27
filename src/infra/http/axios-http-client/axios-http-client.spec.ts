import { AxiosHttpClient } from './axios-http-client'
import axios from 'axios'
import faker from 'faker'
import { HttpPostClientParams, HttpStatusCode } from '@/data/protocols/http'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const axiosHttpResponse = {
  data: faker.random.objectElement(),
  status: faker.datatype.number()
}
mockedAxios.post.mockResolvedValue(axiosHttpResponse)

const makeSut = (): AxiosHttpClient => {
  return new AxiosHttpClient()
}

const mockPostRequest = (): HttpPostClientParams<any> => ({
  url: faker.internet.url(),
  body: faker.random.word
})

describe('AxiosHttpClient', () => {
  test('Should call axios with correct params and verb POST', async () => {
    const request = mockPostRequest()
    const sut = makeSut()
    await sut.post(request)

    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test('Should return the correct statusCode and body', async () => {
    const sut = makeSut()
    const httpResponse = await sut.post(mockPostRequest())

    expect(httpResponse).toEqual({
      statusCode: axiosHttpResponse.status,
      body: axiosHttpResponse.data
    })
  })
})
