import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (valueToCompare: string, fieldName = faker.database.column()): CompareFieldsValidation => new CompareFieldsValidation(fieldName, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare, fieldName)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if compare is valid', () => {
    const valueToCompare = faker.random.word()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)

    expect(error).toBeFalsy()
  })
})
