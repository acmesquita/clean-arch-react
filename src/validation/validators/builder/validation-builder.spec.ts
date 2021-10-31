import faker from 'faker'
import { EmailValidation, MinLenghtValidation, RequiredFieldValidation } from '@/validation/validators'
import { ValidationBuilder as sut } from './validation-builder'

describe('ValidationBuilder', () => {
  test('Should return RequiredFiedlValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).required().build()
    expect(validations).toEqual([new RequiredFieldValidation(field)])
  })

  test('Should return EmailValidation', () => {
    const field = faker.database.column()
    const validations = sut.field(field).email().build()
    expect(validations).toEqual([new EmailValidation(field)])
  })

  test('Should return MinLenghtValidation', () => {
    const field = faker.database.column()
    const lenght = faker.datatype.number()
    const validations = sut.field(field).min(lenght).build()
    expect(validations).toEqual([new MinLenghtValidation(field, lenght)])
  })

  test('Should return list of validation', () => {
    const field = faker.database.column()
    const lenght = faker.datatype.number()
    const validations = sut.field(field).required().min(lenght).build()
    expect(validations).toEqual([new RequiredFieldValidation(field), new MinLenghtValidation(field, lenght)])
  })
})
