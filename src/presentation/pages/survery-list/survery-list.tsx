import React from 'react'
import styles from './styles.scss'
import { Footer, Header, Icon } from '@/presentation/components'
import { IconName } from '@/presentation/components/icon'

const SurveryList: React.FC = () => {
  return (
    <div className={styles.surveyWrapper}>
      <Header />
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveryContent}>
              <Icon iconName={IconName.thumbUp} className={styles.iconWrapper}/>
              <time>
                <span className={styles.day}>18</span>
                <span className={styles.month}>11</span>
                <span className={styles.year}>2020</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
