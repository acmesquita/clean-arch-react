import React from 'react'
import styles from './styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon'

const SurveryItem: React.FC = () => {
  return (
    <li className={styles.surveryItemWrapper}>
      <div className={styles.surveryContent}>
        <Icon iconName={IconName.thumbUp} className={styles.iconWrapper}/>
        <time>
          <span className={styles.day}>18</span>
          <span className={styles.month}>11</span>
          <span className={styles.year}>2020</span>
        </time>
        <p>Qual é o seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveryItem
