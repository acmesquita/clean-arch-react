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
  const [error, setError] = useState()

  useEffect(() => {
    loadSurveryList.loadAll()
      .then(result => {
        setSurveries(result)
      })
      .catch(error => {
        setError(error.message)
      })
  }, [])

  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        { error
          ? (
          <div>
            <span data-testid="error" className={styles.error}>{error}</span>
            <button>Recarregar</button>
          </div>
            )
          : (
          <ul data-testid="survery-list">
            { surveries.length > 0
              ? (
                  surveries.map(survery => (<SurveryItem key={survery.id} survery={survery} />))
                )
              : (
              <SurveryItemEmpty />
                )}
          </ul>
            )}
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
