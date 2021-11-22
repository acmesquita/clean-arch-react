import React from 'react'
import styles from './styles.scss'
import { Footer, Header } from '@/presentation/components'
import { SurveryItem, SurveryItemEmpty } from './components'

const SurveryList: React.FC = () => {
  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>

        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
