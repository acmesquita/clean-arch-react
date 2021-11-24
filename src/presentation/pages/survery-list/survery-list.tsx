import React, { useEffect } from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveryItem, SurveryItemEmpty } from '@/presentation/pages/survery-list/components'
import { LoadSurveryList } from '@/domain/usecases'

type Props = {
  loadSurveryList: LoadSurveryList
}

const SurveryList: React.FC<Props> = ({ loadSurveryList }: Props) => {
  useEffect(() => {
    (async () => {
      await loadSurveryList.loadAll()
    })()
  }, [])

  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul data-testid="survery-list">
          <SurveryItemEmpty />
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
