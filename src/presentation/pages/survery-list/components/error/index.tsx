import React, { useContext } from 'react'
import styles from './styles.scss'
import { SurveryContext } from '@/presentation/pages/survery-list/components'

const Error: React.FC = () => {
  const { error } = useContext(SurveryContext)
  return (
    <div className={styles.errorWrapper}>
      <span data-testid="error" className={styles.error}>{error}</span>
      <button>Recarregar</button>
    </div>
  )
}

export default Error
