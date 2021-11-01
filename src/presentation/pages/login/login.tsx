import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { Authentication, SaveAccessToken } from '@/domain/usecases'
import { Header, Footer, Input, LoginError } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'

type Props = {
  validation: Validation
  authentication: Authentication
  saveAccessToken: SaveAccessToken
}

const Login: React.FC<Props> = ({ validation, authentication, saveAccessToken }: Props) => {
  const history = useHistory()
  const [mainError, setMainError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: ''
  })

  useEffect(() => {
    setState(rest => ({
      ...rest,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password)
    }))
  }, [state.email, state.password])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (isLoading || state.emailError || state.passwordError) return

    setIsLoading(true)

    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setIsLoading(false)
      setMainError(error.message)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <Header />
      <FormLoginContext.Provider value={{ state, setState, mainError, isLoading }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <button data-testid="submit-btn" disabled={isLoading || !!state.emailError || !!state.passwordError} type="submit">Entrar</button>
          <Link to="signup" data-testid="register" className={styles.link}>Criar conta</Link>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
