import React, { memo } from 'react'
import Logo from '../logo'
import styles from './styles.scss'

const LoginHeader: React.FC = () => (
  <header className={styles.header}>
    <Logo />
    <h1>4Dev - Enquetes para Programadores</h1>
  </header>
)

export default memo(LoginHeader)
