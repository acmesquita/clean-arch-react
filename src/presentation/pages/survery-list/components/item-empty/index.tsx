import React from 'react'
import styles from './styles.scss'

const ItemEmpty: React.FC = () => {
  return (
    <>
      <li className={styles.itemEmpty}></li>
      <li className={styles.itemEmpty}></li>
      <li className={styles.itemEmpty}></li>
      <li className={styles.itemEmpty}></li>
    </>
  )
}

export default ItemEmpty
