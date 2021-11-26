import * as HttpHelper from './http-mocks'
import faker from 'faker'

export const mockInvalidCredentialsError = (): void => HttpHelper.mockUnauthorizedError(/login/)
export const mockUnexpetedError = (): void => HttpHelper.mockServerError('POST', /login/)
export const mockOk = (accessToken = faker.datatype.uuid(), name = faker.name.findName()): void => HttpHelper.mockOk('POST', /login/, { accessToken, name })
