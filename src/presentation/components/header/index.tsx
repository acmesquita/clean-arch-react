import React, { memo, useContext } from 'react'
import styles from './styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'
import { useHistory } from 'react-router-dom'

const Header: React.FC = () => {
  const { setCurrentAccount, getCurrentAccount } = useContext(ApiContext)
  const history = useHistory()

  function logout (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault()
    setCurrentAccount(undefined)
    history.replace('/login')
  }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={logout} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
