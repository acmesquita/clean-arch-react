import { AxiosHttpClient } from './axios-http-client'
import { mockAxios } from '@/infra/http/test'
import { mockPostRequest, mockGetRequest } from '@/data/test'
import axios from 'axios'

jest.mock('axios')

type SutTypes = {
  sut: AxiosHttpClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient()
  const mockedAxios = mockAxios()
  return {
    sut,
    mockedAxios
  }
}

describe('AxiosHttpClient', () => {
  describe('post', () => {
    test('Should call axios.post with correct params', async () => {
      const request = mockPostRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.post(request)

      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
    })

    test('Should return correct response axios.post', () => {
      const { sut, mockedAxios } = makeSut()
      const promise = sut.post(mockPostRequest())

      expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
    })
  })
  describe('get', () => {
    test('Should call axios.get with out params', async () => {
      const request = mockGetRequest()
      const { sut, mockedAxios } = makeSut()
      await sut.get(request)

      expect(mockedAxios.get).toHaveBeenCalledWith(request.url)
    })
  })
})
