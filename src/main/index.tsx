import React from 'react'
import ReactDOM from 'react-dom'

import Router from '@/presentation/router'
import '@/presentation/styles/global.scss'
import { makeLogin, makeSignUp } from '@/main/factories/pages'

ReactDOM.render(
  <Router
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}
  />,
  document.getElementById('main')
)
