import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (fieldName: string, valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(fieldName, valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const fieldName = faker.database.column()
    const valueToCompare = faker.random.word()
    const sut = makeSut(fieldName, valueToCompare)
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })
})
