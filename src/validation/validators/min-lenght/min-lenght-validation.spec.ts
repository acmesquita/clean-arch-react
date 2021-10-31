import faker from 'faker'
import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { MinLenghtValidation } from './min-lenght-validation'

const makeSut = (): MinLenghtValidation => new MinLenghtValidation(faker.database.column(), 5)

describe('MinLenghtValidation', () => {
  test('Should return error if field invalid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.datatype.string(4))
    expect(error).toEqual(new MinLenghtError())
  })

  test('Should return falsy if field valid', () => {
    const sut = makeSut()
    const error = sut.validate(faker.datatype.string(5))
    expect(error).toBeFalsy()
  })
})
