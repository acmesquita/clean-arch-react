import { AccountModel } from '@/domain/models'
import faker from 'faker'
import { GetStorage } from '../protocols/cache'

export class GetStorageSpy implements GetStorage {
  key: string
  value = faker.random.objectElement<AccountModel>()

  get (key: string): any {
    this.key = key
    return this.value
  }
}
