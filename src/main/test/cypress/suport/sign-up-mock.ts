import * as HttpHelper from './http-mocks'
import faker from 'faker'

export const mockEmailInUseError = (): void => HttpHelper.mockForbidenError('POST', /signup/)
export const mockUnexpetedError = (): void => HttpHelper.mockServerError('POST', /signup/)
export const mockOk = (accessToken = faker.datatype.uuid(), name = faker.name.findName()): void => HttpHelper.mockOk('POST', /signup/, { accessToken, name })
