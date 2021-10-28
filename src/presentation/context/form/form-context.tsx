import { createContext } from 'react'

export type StateProps = {
  isLoading: boolean
  errorMessage: string
}

export const FormLoginContext = createContext({} as StateProps)
