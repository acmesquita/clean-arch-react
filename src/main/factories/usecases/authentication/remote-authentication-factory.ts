import { Authentication } from '@/domain/usecases'
import { RemoteAuthentication } from '@/data/usecases/authentication/remote-authentication'
import { makeAxiosHttpClient, makeApiUrlFactory } from '@/main/factories/http'

export const makeRemoteAuthentication = (): Authentication => (
  new RemoteAuthentication(makeApiUrlFactory('/login'), makeAxiosHttpClient())
)
