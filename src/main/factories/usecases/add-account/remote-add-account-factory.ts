import { AddAccount } from '@/domain/usecases'
import { RemoteAddAccount } from '@/data/usecases/add-account/remote-add-account'
import { makeAxiosHttpClient, makeApiUrlFactory } from '@/main/factories/http'

export const makeRemoteAddAccount = (): AddAccount => (
  new RemoteAddAccount(makeApiUrlFactory('/signup'), makeAxiosHttpClient())
)
