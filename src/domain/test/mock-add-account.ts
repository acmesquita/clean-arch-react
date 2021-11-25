import faker from 'faker'
import { AddAccount } from '@/domain/usecases'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccountParams = (): AddAccount.Params => {
  const password = faker.internet.password()
  return {
    name: faker.name.findName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}

export const mockAddAccountModel = (): AddAccount.Model => mockAccountModel()

export class AddAccountSpy implements AddAccount {
  account = mockAddAccountModel()
  callsCount = 0
  params: AddAccount.Params

  async add (params: AddAccount.Params): Promise<AddAccount.Model> | null {
    this.params = params
    this.callsCount++
    return this.account
  }
}
