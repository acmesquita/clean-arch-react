import React, { useContext } from 'react'
import { RouteProps, Route, Redirect } from 'react-router-dom'
import { ApiContext } from '@/presentation/context'

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getCurrentAccount } = useContext(ApiContext)

  if (getCurrentAccount()?.accessToken) {
    return <Route {...props} />
  }

  return <Route {...props} component={() => (<Redirect to="/login" />)} />
}

export default PrivateRoute
