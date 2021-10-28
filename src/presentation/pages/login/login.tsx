import React, { useState } from 'react'
import { Header, Footer, Input, LoginError } from '@/presentation/components'
import styles from './styles.scss'

import { FormLoginContext, StateProps } from '@/presentation/context/form/form-context'

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ''
  })
  return (
    <div className={styles.loginWrapper}>
      <Header />
      <FormLoginContext.Provider value={state}>
        <form className={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <button data-testid="submit-btn" disabled type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
