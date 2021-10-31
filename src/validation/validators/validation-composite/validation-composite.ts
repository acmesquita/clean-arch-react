import { Validation } from '@/presentation/protocols/validation'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class ValidationComposite implements Validation {
  private constructor (private readonly validators: FieldValidation[]) { }

  static build (validators: FieldValidation[]): ValidationComposite {
    return new ValidationComposite(validators)
  }

  validate (fieldName: string, fieldValeu: string): string {
    const fieldValidators = this.validators.filter(v => v.field === fieldName)
    for (const fieldValidator of fieldValidators) {
      const error = fieldValidator.validate(fieldValeu)
      if (error) {
        return error.message
      }
    }
  }
}
