import { Validation } from '@/presentation/protocols/validation'

export class ValidationSpy implements Validation {
  errorMessage: string
  fieldName: string
  fieldValue: string

  validate (fieldName: string, fieldValeu: string): string {
    this.fieldName = fieldName
    this.fieldValue = fieldValeu

    return this.errorMessage
  }
}
