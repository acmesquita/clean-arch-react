import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { MinLenghtValidation } from './min-lenght-validation'

describe('MinLenghtValidation', () => {
  test('Should return error if field invalid', () => {
    const sut = new MinLenghtValidation('field', 5)
    const error = sut.validate('123')

    expect(error).toEqual(new MinLenghtError())
  })
})
