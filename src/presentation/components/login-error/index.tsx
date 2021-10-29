import { FormLoginContext } from '@/presentation/context/form/form-context'
import React, { useContext } from 'react'
import { Spinner } from '..'
import styles from './styles.scss'

const LoginError: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormLoginContext)

  return (
    <div data-testid="error-wrapper" className={styles.errorWrapper}>
      {isLoading && <Spinner className={styles.spinner}/>}
      {errorMessage && <span data-testid="main-error" className={styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default LoginError
