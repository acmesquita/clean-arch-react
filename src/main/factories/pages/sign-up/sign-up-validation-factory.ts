import { Validation } from '@/presentation/protocols/validation'
import { ValidationComposite } from '@/validation/validators'
import { ValidationBuilder as Builder } from '@/validation/validators/builder/validation-builder'

export const makeSignUpValidation = (): Validation => (
  ValidationComposite.build([
    ...Builder.field('name').required().min(3).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().min(5).sameAs('password').build()
  ])
)
