import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { SurveryList } from '@/presentation/pages'
import { makeLogin, makeSignUp } from '@/main/factories/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={SurveryList}/>
        <Route path="/login" exact component={makeLogin}/>
        <Route path="/signup" exact component={makeSignUp}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
