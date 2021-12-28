import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { LoginHeader, Footer, Input, LoginError, SubmitBtn } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'
import { ApiContext } from '@/presentation/context'

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const navigate = useNavigate()
  const [mainError, setMainError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    isFormInvalid: false
  })

  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({ ...old, isFormInvalid: !!old.emailError || !!old.passwordError }))
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (isLoading || state.isFormInvalid) return

    setIsLoading(true)

    try {
      const account = await authentication.auth({
        email: state.email,
        password: state.password
      })

      setCurrentAccount(account)
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      setMainError(error.message)
    }
  }

  return (
    <div className={styles.loginWrapper}>
      <LoginHeader />
      <FormLoginContext.Provider value={{ state, setState, mainError, isLoading }}>
        <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <SubmitBtn>Entrar</SubmitBtn>
          <Link to="/signup" data-testid="register" className={styles.link}>Criar conta</Link>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default Login
