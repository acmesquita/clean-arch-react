import React from 'react'
import { makeSignUpValidation } from './sign-up-validation-factory'
import { makeUpdateCurrentAccount, makeRemoteAddAccount } from '@/main/factories/usecases'
import { SignUp } from '@/presentation/pages'

export const makeSignUp: React.FC = () => {
  return (
    <SignUp
      addAccount={makeRemoteAddAccount()}
      validation={makeSignUpValidation()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
    />
  )
}
