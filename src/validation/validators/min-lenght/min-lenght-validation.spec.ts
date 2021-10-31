import { MinLenghtError } from '@/validation/errors/min-lenght-error'
import { MinLenghtValidation } from './min-lenght-validation'

describe('MinLenghtValidation', () => {
  test('Should return error if field invalid', () => {
    const sut = new MinLenghtValidation('field', 5)
    const error = sut.validate('1234')
    expect(error).toEqual(new MinLenghtError())
  })

  test('Should return falsy if field valid', () => {
    const sut = new MinLenghtValidation('field', 5)
    const error = sut.validate('12345')
    expect(error).toBeFalsy()
  })
})
