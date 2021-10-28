import React, { useEffect, useState } from 'react'
import { Header, Footer, Input, LoginError } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'

type Props = {
  validation: Validation
}

const Login: React.FC<Props> = ({ validation }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: '',
    password: '',
    errorMessage: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState({
      ...state,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    })
  }, [state.email, state.password])

  function handleSubmit (event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    setState({
      ...state,
      isLoading: true
    })
  }

  return (
    <div className={styles.loginWrapper}>
      <Header />
      <FormLoginContext.Provider value={{ state, setState }}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <button data-testid="submit-btn" disabled={!!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <span className={styles.link}>Criar conta</span>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
