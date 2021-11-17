import { HttpPostClient, HttpPostClientParams, HttpResponse } from '@/data/protocols/http'
import axios from 'axios'

export class AxiosHttpClient implements HttpPostClient {
  async post (params: HttpPostClientParams): Promise<HttpResponse> {
    try {
      const axiosResponse = await axios.post(params.url, params.body)

      return {
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      }
    } catch (error) {
      return {
        statusCode: error.response.status,
        body: error.response.data.error
      }
    }
  }
}
