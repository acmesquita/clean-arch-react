import React from 'react'
import styles from './styles.scss'
import { Spinner } from '@/presentation/components/spinner'
import { Logo } from '@/presentation/components/logo'

const Login: React.FunctionComponent = () => {
  return (
    <div className={styles.loginWrapper}>
      <header className={styles.header}>
        <Logo />
        <h1>4Dev - Enquetes para Programadores</h1>
      </header>
      <form className={styles.form}>
        <h2>Login</h2>
        <input type="email" name="email" placeholder="Digite seu e-mail" />
        <input type="password" name="password" id="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <div className={styles.errorWrapper}>
          <Spinner className={styles.spinner}/>
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <footer className={styles.footer} />
    </div>
  )
}

export default Login
