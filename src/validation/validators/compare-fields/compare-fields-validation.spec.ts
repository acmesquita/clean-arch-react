import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (fieldName: string, fieldToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(fieldName, fieldToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(fieldName, faker.database.column())
    const error = sut.validate({
      [fieldName]: faker.random.words(3),
      [fieldToCompare]: faker.random.words(4)
    })
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })

  test('Should return falsy if compare is valid', () => {
    const value = faker.random.word()
    const fieldName = faker.database.column()
    const fieldToCompare = faker.database.column()
    const sut = makeSut(fieldName, fieldToCompare)
    const error = sut.validate({
      [fieldName]: value,
      [fieldToCompare]: value
    })

    expect(error).toBeFalsy()
  })
})
