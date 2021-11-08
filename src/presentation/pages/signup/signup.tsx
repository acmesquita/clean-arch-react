import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { Header, Footer, Input, LoginError } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'

type Props = {
  validation: Validation
  addAccount: AddAccount
  saveAccessToken: SaveAccessToken
}

const SignUp: React.FC<Props> = ({ validation, addAccount, saveAccessToken }: Props) => {
  const history = useHistory()
  const [mainError, setMainError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    nameError: ''
  })

  useEffect(() => {
    setState(rest => ({
      ...rest,
      nameError: validation.validate('name', state.name),
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
      passwordConfirmationError: validation.validate('passwordConfirmation', state.passwordConfirmation)
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (isLoading || state.nameError || state.emailError || state.passwordError || state.passwordConfirmationError) {
      return
    }

    setIsLoading(true)

    try {
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation
      })

      await saveAccessToken.save(account.accessToken)
      history.replace('/')
    } catch (error) {
      setIsLoading(false)
      setMainError(error.message)
    }
  }

  const hasDisabled = !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError

  return (
    <div className={styles.signUpWrapper}>
      <Header />
      <FormLoginContext.Provider value={{ state, setState, mainError, isLoading }}>
        <form className={styles.form} onSubmit={handleSubmit} data-testid="form">
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Confirme sua senha" />
          <button data-testid="submit" disabled={hasDisabled} type="submit">Criar conta</button>
          <Link replace to="login" data-testid="login" className={styles.link}>Voltar para o Login</Link>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
