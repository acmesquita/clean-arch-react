import React from 'react'
import styles from './styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon'
import { SurveryModel } from '@/domain/models'

type Props = {
  survery: SurveryModel
}

const Item: React.FC<Props> = ({ survery }: Props) => {
  const iconName = survery.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={styles.itemWrapper}>
      <div className={styles.surveryContent}>
        <Icon iconName={iconName} className={styles.iconWrapper}/>
        <time>
          <span data-testid="day" className={styles.day}>
            {String(survery.date.getDate()).padStart(2, '0')}
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

export default Item
