import React, { useContext } from 'react'
import styles from './styles.scss'
import { Item, ItemEmpty, SurveryContext } from '@/presentation/pages/survery-list/components'

const List: React.FC = () => {
  const { surveries } = useContext(SurveryContext)
  return (
    <ul className={styles.listWrapper} data-testid="survery-list">
      { surveries.length > 0
        ? surveries.map(survery => (<Item key={survery.id} survery={survery} />))
        : <ItemEmpty />
      }
    </ul>
  )
}

export default List
