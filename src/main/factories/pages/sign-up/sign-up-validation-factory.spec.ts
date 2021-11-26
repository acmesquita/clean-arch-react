import { CompareFieldsValidation, EmailValidation, MinLenghtValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators'
import { makeSignUpValidation } from '@/main/factories/pages'

describe('SignUpValidationFactory', () => {
  test('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignUpValidation()
    expect(composite).toEqual(ValidationComposite.build([
      new RequiredFieldValidation('name'),
      new MinLenghtValidation('name', 3),
      new RequiredFieldValidation('email'),
      new EmailValidation('email'),
      new RequiredFieldValidation('password'),
      new MinLenghtValidation('password', 5),
      new RequiredFieldValidation('passwordConfirmation'),
      new MinLenghtValidation('passwordConfirmation', 5),
      new CompareFieldsValidation('passwordConfirmation', 'password')
    ]))
  })
})
