import React from 'react'
import { makeSignUpValidation } from './sign-up-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases'
import { SignUp } from '@/presentation/pages'

export const MakeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
    />
  )
}
