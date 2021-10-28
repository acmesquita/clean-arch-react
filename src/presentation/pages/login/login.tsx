import React from 'react'
import { Spinner } from '@/presentation/components/spinner'
import Header from '@/presentation/components/login-header'
import Footer from '@/presentation/components/footer'
import styles from './styles.scss'

const Login: React.FC = () => {
  return (
    <div className={styles.loginWrapper}>
      <Header />
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
      <Footer />
    </div>
  )
}

export default Login
