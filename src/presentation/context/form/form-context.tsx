import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  errorMessage: string
  emailError: string
  passwordError: string
}

export const FormLoginContext = createContext({} as StateProps)
