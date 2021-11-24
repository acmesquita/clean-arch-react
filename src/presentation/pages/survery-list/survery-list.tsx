import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { List, SurveryContext, SurveryError } from '@/presentation/pages/survery-list/components'
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
        <SurveryContext.Provider value={{ surveries, error }}>
          { error ? <SurveryError /> : <List /> }
        </SurveryContext.Provider>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
