import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveyContext } from '@/presentation/pages/survey-list/components'

const Error: React.FC = () => {
  const { error, setReload, setError, setSurveys } = useContext(SurveyContext)

  function reload (): void {
    setError('')
    setSurveys([])
    setReload((state: boolean): boolean => !state)
  }

  return (
    <div className={styles.errorWrapper}>
      <span data-testid="error" className={styles.error}>{error}</span>
      <button data-testid="reload" onClick={reload}>Tente novamente</button>
    </div>
  )
}

export default Error
