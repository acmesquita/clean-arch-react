import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Header, Footer, Input, LoginError } from '@/presentation/components'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'

type Props = {}

const SignUp: React.FC<Props> = (props: Props) => {
  const [mainError, setMainError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailError: '',
    passwordError: ''
  })

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
  }

  return (
    <div className={styles.signUpWrapper}>
      <Header />
      <FormLoginContext.Provider value={{ state, setState, mainError, isLoading }}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <Input type="password" name="password_confirmation" id="password_confirmation" placeholder="Confirme sua senha" />
          <button type="submit">Entrar</button>
          <Link to="signup" data-testid="register" className={styles.link}>Voltar para o Login</Link>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
