import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveryContext } from '@/presentation/pages/survery-list/components'

const Error: React.FC = () => {
  const { error, setReload, setError, setSurveries } = useContext(SurveryContext)

  function reload (): void {
    setError('')
    setSurveries([])
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
