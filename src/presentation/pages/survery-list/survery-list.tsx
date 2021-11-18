import React from 'react'
import styles from './styles.scss'
import { Footer, Logo } from '@/presentation/components'

const SurveryList: React.FC = () => {
  return (
    <div className={styles.surveyWrapper}>
      <header className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <Logo />
          <div className={styles.logoutWrapper}>
            <span>Catharina</span>
            <a href="#">Sair</a>
          </div>
        </div>
      </header>
      <main className={styles.contentWrapper}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={styles.surveryContent}>
              <time>
                <span className={styles.day}>18</span>
                <span className={styles.month}>11</span>
                <span className={styles.year}>2020</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={styles.surveryContent}>
              <time>
                <span className={styles.day}>18</span>
                <span className={styles.month}>11</span>
                <span className={styles.year}>2020</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={styles.surveryContent}>
              <time>
                <span className={styles.day}>18</span>
                <span className={styles.month}>11</span>
                <span className={styles.year}>2020</span>
              </time>
              <p>Qual é o seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default SurveryList
