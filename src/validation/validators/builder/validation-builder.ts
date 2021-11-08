import { FieldValidation } from '@/validation/protocols/field-validation'
import { EmailValidation, MinLenghtValidation, RequiredFieldValidation, CompareFieldsValidation } from '@/validation/validators'

export class ValidationBuilder {
  private constructor (
    private readonly fieldName: string,
    private readonly validation: FieldValidation[]
  ) { }

  static field (fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required (): ValidationBuilder {
    this.validation.push(new RequiredFieldValidation(this.fieldName))
    return this
  }

  email (): ValidationBuilder {
    this.validation.push(new EmailValidation(this.fieldName))
    return this
  }

  min (lenght: number): ValidationBuilder {
    this.validation.push(new MinLenghtValidation(this.fieldName, lenght))
    return this
  }

  sameAs (fieldToCompare: string): ValidationBuilder {
    this.validation.push(new CompareFieldsValidation(this.fieldName, fieldToCompare))
    return this
  }

  build (): FieldValidation[] {
    return this.validation
  }
}
