import faker from 'faker'
import { HttpPostClient, HttpPostClientParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

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
