import * as Helper from './http-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => Helper.mockInvalidCredentialsError(/login/)
export const mockUnexpetedError = (): void => Helper.mockUnexpetedError('POST', /login/)
export const mockInvalidReturn = (): void => Helper.mockOk('POST', /login/, { invalidParam: faker.random.word() })
export const mockOk = (accessToken = faker.datatype.uuid()): void => Helper.mockOk('POST', /login/, { accessToken })
