import faker from 'faker'
import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidations: FieldValidationSpy[]
}

const makeSut = (fieldName: string): SutTypes => {
  const fieldValidations = [
    new FieldValidationSpy(fieldName),
    new FieldValidationSpy(fieldName)
  ]

  const sut = ValidationComposite.build(fieldValidations)

  return {
    sut,
    fieldValidations
  }
}

describe('ValidationComposite', () => {
  test('Should return error any validation fails', () => {
    const fieldName = faker.database.column()
    const { sut, fieldValidations } = makeSut(fieldName)
    const errorMessage = faker.random.words()
    fieldValidations[0].error = new Error(errorMessage)
    fieldValidations[1].error = new Error(faker.random.words())

    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBe(errorMessage)
  })

  test('Should return falsy if validation returns falsy', () => {
    const fieldName = faker.database.column()
    const { sut } = makeSut(fieldName)
    const error = sut.validate(fieldName, faker.random.word())
    expect(error).toBeFalsy()
  })
})
