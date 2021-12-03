import React, { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { AddAccount } from '@/domain/usecases'
import { LoginHeader, Footer, Input, LoginError, SubmitBtn } from '@/presentation/components'
import { Validation } from '@/presentation/protocols/validation'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'
import { ApiContext } from '@/presentation/context'

type Props = {
  validation: Validation
  addAccount: AddAccount
}

const SignUp: React.FC<Props> = ({ validation, addAccount }: Props) => {
  const { setCurrentAccount } = useContext(ApiContext)
  const history = useHistory()
  const [mainError, setMainError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const [state, setState] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
    isFormInvalid: false
  })

  useEffect(() => { validate('name') }, [state.name])
  useEffect(() => { validate('email') }, [state.email])
  useEffect(() => { validate('password') }, [state.password])
  useEffect(() => { validate('passwordConfirmation') }, [state.passwordConfirmation])

  const validate = (field: string): void => {
    const { name, email, password, passwordConfirmation } = state
    const formData = { name, email, password, passwordConfirmation }
    setState(old => ({ ...old, [`${field}Error`]: validation.validate(field, formData) }))
    setState(old => ({
      ...old,
      isFormInvalid: !!old.nameError || !!old.emailError || !!old.passwordError || !!old.passwordConfirmationError
    }))
  }

  async function handleSubmit (event: React.FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    if (isLoading || state.isFormInvalid) {
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

      setCurrentAccount(account)
      history.replace('/')
    } catch (error) {
      setIsLoading(false)
      setMainError(error.message)
    }
  }

  return (
    <div className={styles.signUpWrapper}>
      <LoginHeader />
      <FormLoginContext.Provider value={{ state, setState, mainError, isLoading }}>
        <form className={styles.form} onSubmit={handleSubmit} data-testid="form">
          <h2>Criar Conta</h2>
          <Input type="text" name="name" placeholder="Digite seu nome" />
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" id="password" placeholder="Digite sua senha" />
          <Input type="password" name="passwordConfirmation" id="passwordConfirmation" placeholder="Confirme sua senha" />
          <SubmitBtn>Criar conta</SubmitBtn>
          <Link replace to="login" data-testid="login" className={styles.link}>Voltar para o Login</Link>

          <LoginError />
        </form>
      </FormLoginContext.Provider>
      <Footer />
    </div>
  )
}

export default SignUp
