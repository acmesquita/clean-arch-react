import React from 'react'
import { Header, Footer, Input, Spinner } from '@/presentation/components'
import styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.loginWrapper}>
      <Header />
      <form className={styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
        <button type="submit">Entrar</button>
        <span className={styles.link}>Criar conta</span>

        <div className={styles.errorWrapper}>
          <Spinner className={styles.spinner}/>
          <span className={styles.error}>Error</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}

export default Login
