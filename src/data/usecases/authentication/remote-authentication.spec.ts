import { RemoteAuthentication } from './remote-authentication'

import { HttpStatusCode } from '@/data/protocols/http'
import { HttpPostClientSpy } from '@/data/test'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { mockAuthenticationParams, mockAuthenticationModel } from '@/domain/test'

import faker from 'faker'

type SutTypes = {
  sut: RemoteAuthentication
  httpPostClientSpy: HttpPostClientSpy<RemoteAuthentication.Model>
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<RemoteAuthentication.Model>()
  const sut = new RemoteAuthentication(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url()
    const { sut, httpPostClientSpy } = makeSut(url)
    await sut.auth(mockAuthenticationParams())

    expect(httpPostClientSpy.url).toBe(url)
  })

  test('Should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const params = mockAuthenticationParams()
    await sut.auth(params)

    expect(httpPostClientSpy.body).toEqual(params)
  })

  test('Should throws InvalidCredentialError if HttpPostClient returns 401', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  test('Should throws UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throws UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should throws UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }
    const promise = sut.auth(mockAuthenticationParams())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('Should return an RemoteAuthentication.Model if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()
    const httpResult = mockAuthenticationModel()
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }
    const account = await sut.auth(mockAuthenticationParams())

    expect(account).toEqual(httpResult)
  })
})
