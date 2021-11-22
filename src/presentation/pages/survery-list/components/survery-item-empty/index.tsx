import React from 'react'
import styles from './styles.scss'

const SurveryItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.surveryItemEmpty}></li>
      <li className={styles.surveryItemEmpty}></li>
      <li className={styles.surveryItemEmpty}></li>
      <li className={styles.surveryItemEmpty}></li>
    </>
  )
}

export default SurveryItemEmpty
