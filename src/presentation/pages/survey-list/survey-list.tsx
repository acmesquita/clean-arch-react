import React, { useEffect, useState } from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { List, SurveyContext, SurveyError } from '@/presentation/pages/survey-list/components'
import { LoadSurveyList } from '@/domain/usecases'

type Props = {
  loadSurveyList: LoadSurveyList
}

const SurveyList: React.FC<Props> = ({ loadSurveyList }: Props) => {
  const [surveys, setSurveys] = useState<LoadSurveyList.Model[]>([])
  const [error, setError] = useState()
  const [reload, setReload] = useState(false)

  useEffect(() => {
    loadSurveyList.loadAll()
      .then(result => setSurveys(result))
      .catch(error => {
        setError(error.message)
      })
  }, [reload])

  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ surveys, error, setReload, setError, setSurveys }}>
          { error ? <SurveyError /> : <List /> }
        </SurveyContext.Provider>
      </main>
      <Footer />
    </div>
  )
}

export default SurveyList
