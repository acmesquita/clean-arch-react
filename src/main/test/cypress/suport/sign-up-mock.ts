import * as Helper from './http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => Helper.mockEmailInUseError(/signup/)
export const mockUnexpetedError = (): void => Helper.mockUnexpetedError('POST', /signup/)
export const mockInvalidReturn = (): void => Helper.mockOk('POST', /signup/, { invalidParam: faker.random.word() })
export const mockOk = (accessToken = faker.datatype.uuid()): void => Helper.mockOk('POST', /signup/, { accessToken })
