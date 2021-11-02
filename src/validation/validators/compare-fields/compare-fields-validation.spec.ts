import faker from 'faker'
import { InvalidFieldError } from '@/validation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const fieldName = faker.database.column()

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation(fieldName)
describe('CompareFieldsValidation', () => {
  test('Should return error if fields is empty', () => {
    const sut = makeSut()
    const error = sut.validate(faker.random.word())
    expect(error).toEqual(new InvalidFieldError(fieldName))
  })
})
