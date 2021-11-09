import React, { useContext, useRef } from 'react'
import { FormLoginContext } from '@/presentation/context/form/form-context'
import styles from './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { state, setState } = useContext(FormLoginContext)

  const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
    setState({ ...state, [event.target.name]: event.target.value })
  }

  const error = state[`${props.name}Error`]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      data-status={error ? 'invalid' : 'valid'}
      className={styles.inputWrapper}
    >
      <input
        {...props}
        title={error}
        placeholder=" "
        readOnly
        onFocus={event => { event.target.readOnly = false }}
        data-testid={props.name}
        onChange={handleChange}
        ref={inputRef}
      />
      <label
        data-testid={`${props.name}-label`}
        title={error}
        onClick={() => inputRef.current.focus()}
      >
        {props.placeholder}
      </label>
    </div>

  )
}

export default Input
