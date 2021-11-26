import React, { memo, useContext } from 'react'
import styles from './styles.scss'
import { Logo } from '@/presentation/components'
import { ApiContext } from '@/presentation/context'
import { useLogout } from '@/presentation/hooks'

const Header: React.FC = () => {
  const { getCurrentAccount } = useContext(ApiContext)
  const logout = useLogout()

  function handleLogout (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
    event.preventDefault()
    logout()
  }

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.headerContent}>
        <Logo />
        <div className={styles.logoutWrapper}>
          <span data-testid="username">{getCurrentAccount().name}</span>
          <a data-testid="logout" onClick={handleLogout} href="#">Sair</a>
        </div>
      </div>
    </header>
  )
}

export default memo(Header)
