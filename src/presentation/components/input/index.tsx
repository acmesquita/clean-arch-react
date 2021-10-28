import { FormLoginContext } from '@/presentation/context/form/form-context'
import React, { useContext } from 'react'
import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormLoginContext)
  const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
    event.target.readOnly = false
  }

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }

  function getTitle (): string {
    return state[`${props.name}Error`]
  }

  return (
    <div className={styles.inputWrapper}>
      <input {...props} readOnly onFocus={enableInput} data-testid={props.name} onChange={handleChange} />
      <span title={getTitle()} data-testid={`${props.name}-status`} className={getTitle() ? styles.error : ''}></span>
    </div>

  )
}

export default Input
