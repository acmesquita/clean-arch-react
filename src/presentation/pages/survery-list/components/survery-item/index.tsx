import React from 'react'
import styles from './styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon'
import { SurveryModel } from '@/domain/models'

type Props = {
  survery: SurveryModel
}

const SurveryItem: React.FC<Props> = ({ survery }: Props) => {
  return (
    <li className={styles.surveryItemWrapper}>
      <div className={styles.surveryContent}>
        <Icon iconName={IconName.thumbUp} className={styles.iconWrapper}/>
        <time>
          <span data-testid="day" className={styles.day}>
            {survery.date.getDate()}
          </span>
          <span data-testid="month" className={styles.month}>
            {survery.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={styles.year}>
            {survery.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survery.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default SurveryItem
