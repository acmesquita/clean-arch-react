import React from 'react'
import { render } from 'react-dom'

import Router from '@/main/routes'
import '@/presentation/styles/global.scss'

render(
  <Router />,
  document.getElementById('main')
)
