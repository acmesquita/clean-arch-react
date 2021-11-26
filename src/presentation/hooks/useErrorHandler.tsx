import { useContext } from 'react'
import { useHistory } from 'react-router'
import { AccessDeniedError } from '@/domain/errors'
import { ApiContext } from '@/presentation/context'

type CallbackType = (error: Error) => void
type ResultType = CallbackType

export const useErrorHandler = (callback: CallbackType = (e) => {}): ResultType => {
  const history = useHistory()
  const { setCurrentAccount } = useContext(ApiContext)

  return (error: Error): void => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(undefined)
      history.replace('/login')
    } else {
      callback(error)
    }
  }
}
