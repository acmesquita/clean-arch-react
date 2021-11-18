import faker from 'faker'
import { SetStorageMock } from '@/data/test'
import { UnexpectedError } from '@/domain/errors'
import { mockAccountModel } from '@/domain/test'
import { LocalUpdateCurrentAccount } from './local-update-current-account'

type SutTypes = {
  sut: LocalUpdateCurrentAccount
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock()
  const sut = new LocalUpdateCurrentAccount(setStorageMock)

  return {
    sut,
    setStorageMock
  }
}

describe('LocalUpdateCurrentAccount', () => {
  test('Should call SetStorage with correct valeu', async () => {
    const { sut, setStorageMock } = makeSut()
    const account = mockAccountModel()
    await sut.save(account)
    expect(setStorageMock.key).toBe('account')
    expect(setStorageMock.value).toBe(JSON.stringify(account))
  })

  test('Should throws if SetStorage throws', async () => {
    const { sut, setStorageMock } = makeSut()
    jest.spyOn(setStorageMock, 'set').mockImplementationOnce(() => { throw new Error('any_error') })
    const promise = sut.save(mockAccountModel())
    await expect(promise).rejects.toThrow(new Error('any_error'))
  })

  test('Should throws if account is falsy', async () => {
    const { sut } = makeSut()
    const promise = sut.save(undefined)
    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
