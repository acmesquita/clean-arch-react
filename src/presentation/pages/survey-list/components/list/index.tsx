import React, { useContext } from 'react'
import styles from './styles.scss'
import { Item, ItemEmpty, SurveyContext } from '@/presentation/pages/survey-list/components'

const List: React.FC = () => {
  const { surveys } = useContext(SurveyContext)
  return (
    <ul className={styles.listWrapper} data-testid="survey-list">
      { surveys.length > 0
        ? surveys.map(survey => (<Item key={survey.id} survey={survey} />))
        : <ItemEmpty />
      }
    </ul>
  )
}

export default List
