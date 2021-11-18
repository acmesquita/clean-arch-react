import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'
import { LocalUpdateCurrentAccount } from '@/data/usecases'
import { UpdateCurrentAccount } from '@/domain/usecases'

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return new LocalUpdateCurrentAccount(makeLocalStorageAdapter())
}
