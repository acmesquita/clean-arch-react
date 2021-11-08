import faker from 'faker'
import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { MinLenghtValidation } from './min-lenght-validation'

const makeSut = (field: string): MinLenghtValidation => new MinLenghtValidation(field, 5)

describe('MinLenghtValidation', () => {
  test('Should return error if field invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(4) })
    expect(error).toEqual(new MinLenghtError())
  })

  test('Should return falsy if field valid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.datatype.string(5) })
    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate({ [faker.database.column()]: faker.datatype.string(5) })
    expect(error).toBeFalsy()
  })
})
