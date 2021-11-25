import faker from 'faker'
import { HttpPostClient, HttpPostClientParams, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export class HttpPostClientSpy<ResponseType = any> implements HttpPostClient<ResponseType> {
  url?: string
  body?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostClientParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return this.response
  }
}

export const mockPostRequest = (): HttpPostClientParams => ({
  url: faker.internet.url(),
  body: faker.random.word
})

export class HttpGetClientSpy<ResponseType = any> implements HttpGetClient {
  url: string
  headers?: any
  response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  }

  async get (params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.headers = params.headers
    return this.response
  }
}

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
})
