import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveryItem, SurveryItemEmpty } from '@/presentation/pages/survery-list/components'
import { LoadSurveryList } from '@/domain/usecases'
import { SurveryModel } from '@/domain/models'

type Props = {
  loadSurveryList: LoadSurveryList
}

const SurveryList: React.FC<Props> = ({ loadSurveryList }: Props) => {
  const [surveries, setSurveries] = useState<SurveryModel[]>([])

  useEffect(() => {
    loadSurveryList.loadAll()
      .then(result => {
        setSurveries(result)
      })
  }, [])

  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul data-testid="survery-list">
          { surveries.length > 0
            ? (
                surveries.map(survery => (<SurveryItem key={survery.id} survery={survery} />))
              )
            : (
            <SurveryItemEmpty />
              )}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
