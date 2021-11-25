import React from 'react'
import styles from './styles.scss'
import { Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  survey: LoadSurveyList.Model
}

const Item: React.FC<Props> = ({ survey }: Props) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown

  return (
    <li className={styles.itemWrapper}>
      <div className={styles.surveyContent}>
        <Icon iconName={iconName} className={styles.iconWrapper}/>
        <time>
          <span data-testid="day" className={styles.day}>
            {String(survey.date.getDate()).padStart(2, '0')}
          </span>
          <span data-testid="month" className={styles.month}>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span data-testid="year" className={styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}

export default Item
