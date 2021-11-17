import { HttpGetClient } from '@/data/protocols/http'

export class RemoveLoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient
  ) {}

  async loadAll (): Promise<void> {
    await this.httpGetClient.get({ url: this.url })
  }
}
