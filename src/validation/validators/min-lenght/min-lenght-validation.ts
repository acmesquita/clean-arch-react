import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLenghtValidation implements FieldValidation {
  constructor (readonly field: string, private readonly lenght: number) { }

  validate (value: string): Error {
    return new MinLenghtError()
  }
}
