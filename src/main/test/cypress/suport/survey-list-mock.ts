import * as HttpHelper from './http-mocks'

export const mockUnexpetedError = (): void => HttpHelper.mockServerError('GET', /surveys/)
export const mockDeniedError = (): void => HttpHelper.mockForbidenError('GET', /surveys/)
