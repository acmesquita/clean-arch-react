import React, { memo } from 'react'
import styles from './styles.scss'
import { Logo } from '@/presentation/components'

const Header: React.FC = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span>Catharina</span>
          <a href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
