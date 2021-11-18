import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { makeLogin, makeSignUp } from '@/main/factories/pages'
import { ApiContext } from '@/presentation/context'
import { SurveryList } from '@/presentation/pages'
import { setCurrentAccountAdapter } from '../adapters/current-account-adapter'

const Router: React.FC = () => {
  return (
    <ApiContext.Provider
      value={{
        setCurrentAccount: setCurrentAccountAdapter
      }}
    >
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={SurveryList}/>
          <Route path="/login" exact component={makeLogin}/>
          <Route path="/signup" exact component={makeSignUp}/>
        </Switch>
      </BrowserRouter>
    </ApiContext.Provider>
  )
}

export default Router
