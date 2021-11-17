import faker from 'faker'
import { HttpPostClient, HttpPostClientParams, HttpResponse, HttpStatusCode, HttpGetClient, HttpGetParams } from '@/data/protocols/http'

export class HttpPostClientSpy<ResponseType> implements HttpPostClient<ResponseType> {
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

export class HttpGetClientSpy implements HttpGetClient {
  url: string
  async get (params: HttpGetParams): Promise<void> {
    this.url = params.url
    return null
  }
}
