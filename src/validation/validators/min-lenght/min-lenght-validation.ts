import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { FieldValidation } from '@/validation/protocols/field-validation'

export class MinLenghtValidation implements FieldValidation {
  constructor (readonly field: string, private readonly lenght: number) { }

  validate (input: object): Error {
    return input[this.field]?.length < this.lenght ? new MinLenghtError() : null
  }
}
