import { HttpResponse } from '.'
export type HttpPostClientParams = {
  url: string
  body?: any
}

export interface HttpPostClient<ResponseType = any> {
  post: (params: HttpPostClientParams) => Promise<HttpResponse<ResponseType>>
}
