import { LocalStorageAdapter } from '@/infra/cache/local-storage-adapter/local-storage-adapter'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => new LocalStorageAdapter()
