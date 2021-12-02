import * as HttpHelper from './http-mocks'

export const mockUnexpetedError = (): void => HttpHelper.mockServerError('GET', /surveys/)
