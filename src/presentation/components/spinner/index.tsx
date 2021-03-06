import React from 'react'
import styles from './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => (
  <div {...props} className={[styles.ldsDualRing, props.className].join(' ')} data-testid="spinner"></div>
)

export default Spinner
