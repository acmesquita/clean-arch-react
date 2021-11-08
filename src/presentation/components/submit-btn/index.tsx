import { FormLoginContext } from '@/presentation/context/form/form-context'
import React, { useContext } from 'react'

type Props = {
  children: string
}

const SubmitBtn: React.FC<Props> = (props: Props) => {
  const { state } = useContext(FormLoginContext)
  return (
    <button data-testid="submit" disabled={state.isFormInvalid} type="submit">{props.children}</button>
  )
}

export default SubmitBtn
