import { FieldValidationSpy } from '../test/mock-field-validation'
import { ValidationComposite } from './validation-composite'

type SutTypes = {
  sut: ValidationComposite
  fieldValidations: FieldValidationSpy[]
}

const makeSut = (): SutTypes => {
  const fieldValidations = [
    new FieldValidationSpy('any_field'),
    new FieldValidationSpy('any_field')
  ]

  const sut = new ValidationComposite(fieldValidations)

  return {
    sut,
    fieldValidations
  }
}

describe('ValidationComposite', () => {
  test('Should return error any validation fails', () => {
    const { sut, fieldValidations } = makeSut()
    fieldValidations[0].error = new Error('first_error_message')
    fieldValidations[1].error = new Error('second_error_message')

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBe('first_error_message')
  })

  test('Should return falsy if validation returns falsy', () => {
    const { sut } = makeSut()

    const error = sut.validate('any_field', 'any_value')
    expect(error).toBeFalsy()
  })
})
